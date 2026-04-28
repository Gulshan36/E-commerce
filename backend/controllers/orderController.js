import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import razorpay from "razorpay";
import { sendOrderEmail, sendInvoiceEmail } from "../config/emailservice.js";
import { generateInvoice } from "../config/invoiceGenerator.js";





// global variables
const deliveryCharge = 10;
const currency = "inr";
const normalizeEnvValue = (value) => {
  if (typeof value !== "string") return value;
  return value.trim().replace(/^("|')|("|')$/g, "");
};
// Geteway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorepayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})
const cashfreeBaseUrl = process.env.CASHFREE_MODE === "production"
  ? "https://api.cashfree.com/pg"
  : "https://sandbox.cashfree.com/pg";
const cashfreeHeaders = {
  "x-client-id": normalizeEnvValue(process.env.CASHFREE_CLIENT_ID),
  "x-client-secret": normalizeEnvValue(process.env.CASHFREE_CLIENT_SECRET),
  "x-api-version": normalizeEnvValue(process.env.CASHFREE_API_VERSION) || "2023-08-01",
  "Content-Type": "application/json",
};


// Placing Order using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData)
    await newOrder.save();

    // Send Email
    const user = await userModel.findById(userId);
    if (user?.email) {
      await sendOrderEmail(user.email, items, amount);
    }

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed Successfully", });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}

// Placing Order using Stripe Method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();



    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe uses paisa/cent
      },
      quantity: item.quantity
    }));

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });


  }
};

// Verify Order using Stripe Method

const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

       // Get user email and order data
       const user = await userModel.findById(userId);
       const order = await orderModel.findById(orderId);
 
       if (user?.email) {
         await sendOrderEmail(user.email, order.items, order.amount);
       }

      res.json({ success: true, message: "Payment Successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });

  }
}

// Placing Order using Razorpay method

const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData)
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    }

    await razorepayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error })

      }
      res.json({ success: true, order })

    })

  } catch (error) {

    console.log(error);
    res.json({ success: false, message: error.message });

  }
}

// Placing Order using Cashfree method
const placeOrderCashfree = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    if (!cashfreeHeaders["x-client-id"] || !cashfreeHeaders["x-client-secret"]) {
      return res.json({ success: false, message: "Cashfree credentials are not configured" });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Cashfree",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const customerName = [address?.firstName, address?.lastName].filter(Boolean).join(" ").trim() || "Customer";
    const returnUrlBase = origin || process.env.FRONTEND_URL;
    const cashfreePayload = {
      order_id: newOrder._id.toString(),
      order_amount: amount,
      order_currency: currency.toUpperCase(),
      customer_details: {
        customer_id: userId.toString(),
        customer_name: customerName,
        customer_email: address?.email || "",
        customer_phone: address?.phone || "",
      },
      order_meta: {
        return_url: `${returnUrlBase}/verify?provider=cashfree&orderId={order_id}`,
      },
    };

    const response = await fetch(`${cashfreeBaseUrl}/orders`, {
      method: "POST",
      headers: cashfreeHeaders,
      body: JSON.stringify(cashfreePayload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      await orderModel.findByIdAndDelete(newOrder._id);
      return res.json({
        success: false,
        message: responseData?.message || responseData?.error || "Cashfree order creation failed",
      });
    }

    res.json({
      success: true,
      payment_session_id: responseData.payment_session_id,
      orderId: newOrder._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify Order using Cashfree method
const verifyCashfree = async (req, res) => {
  try {
    const { orderId, userId } = req.body;

    if (!cashfreeHeaders["x-client-id"] || !cashfreeHeaders["x-client-secret"]) {
      return res.json({ success: false, message: "Cashfree credentials are not configured" });
    }

    if (!orderId) {
      return res.json({ success: false, message: "Order ID is required" });
    }

    const response = await fetch(`${cashfreeBaseUrl}/orders/${orderId}`, {
      method: "GET",
      headers: cashfreeHeaders,
    });

    const orderInfo = await response.json();

    if (!response.ok) {
      return res.json({ success: false, message: orderInfo?.message || "Unable to verify Cashfree payment" });
    }

    if (orderInfo.order_status === "PAID") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      const user = await userModel.findById(userId);
      const order = await orderModel.findById(orderId);

      if (user?.email && order) {
        await sendOrderEmail(user.email, order.items, order.amount);
      }

      return res.json({ success: true, message: "Payment Successful" });
    }

    if (["FAILED", "CANCELLED", "EXPIRED"].includes(orderInfo.order_status)) {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment Failed" });
    }

    res.json({ success: false, message: "Payment Pending" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// Verify Order using Razorpay method

const verifyRazorpay = async (req, res) => {
  try {

    const { userId, razorpay_order_id } = req.body

    const orderInfo = await razorepayInstance.orders.fetch(razorpay_order_id)
    if (orderInfo.status === 'paid') {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
      await userModel.findByIdAndUpdate(userId, { cartData: {} })


      // Get user email and order data
      const user = await userModel.findById(userId);
      const order = await orderModel.findById(orderInfo.receipt);

      if (user?.email) {
        await sendOrderEmail(user.email, order.items, order.amount);
      }


      res.json({ success: true, message: "Payment Successful" })
    } else {
      res.json({ success: false, message: "Payment Failed" })

    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// All order data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// User Order Data for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



// User Order Data for Frontend
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Step 1: Update the order status
    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

    // Step 2: Check if status is "Delivered"
    if (status === "Delivered") {
      // Populate user for email
      const user = await userModel.findById(updatedOrder.userId);
      if (!user?.email) {
        return res.json({ success: false, message: "User email not found" });
      }

      // Add user details to order (for invoice)
      updatedOrder.user = { email: user.email };

      // Step 3: Generate invoice PDF
      const invoiceBuffer = await generateInvoice(updatedOrder);

      // Step 4: Send Invoice Email
      await sendInvoiceEmail(user.email, invoiceBuffer);
    }

    res.json({ success: true, message: "Status Updated" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



export { verifyRazorpay, verifyStripe, verifyCashfree, placeOrder, placeOrderStripe, placeOrderRazorpay, placeOrderCashfree, allOrders, userOrders, updateStatus }