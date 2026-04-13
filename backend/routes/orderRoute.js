import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, placeOrderCashfree, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay, verifyCashfree} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin feratures
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/status',adminAuth, updateStatus);

// Payment features
orderRouter.post('/place',authUser, placeOrder);
orderRouter.post('/stripe',authUser, placeOrderStripe);
orderRouter.post('/razorpay',authUser, placeOrderRazorpay);
orderRouter.post('/cashfree',authUser, placeOrderCashfree);

// User features
orderRouter.post('/userorders',authUser, userOrders);

// Verify payment
orderRouter.post('/verifyStripe',authUser, verifyStripe);
orderRouter.post('/verifyRazorpay',authUser, verifyRazorpay);
orderRouter.post('/verifyCashfree',authUser, verifyCashfree);

export default orderRouter;