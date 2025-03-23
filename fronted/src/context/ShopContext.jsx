import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {

  const currency = "₹";
  const delivery_fee = 40;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  // Add product to cart
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Select a size for the product");
      return;
    }

    setCartItems((prevCart) => {
      let updatedCart = { ...prevCart };

      if (updatedCart[itemId]) {
        updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;
      } else {
        updatedCart[itemId] = { [size]: 1 };
      }

      return updatedCart;
    });
  };

  // Get total number of items in the cart
  const getCartItems = () => {
    return Object.values(cartItems).reduce(
      (total, sizes) =>
        total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
      0
    );
  };

  // Get total cart price
  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
      let product = products.find((p) => p._id === itemId);
      if (!product) return total;

      return (
        total +
        Object.values(sizes).reduce((sum, qty) => sum + qty * product.price, 0)
      );
    }, 0);
  };

  // Update quantity
  const updateQuantity = (itemId, size, quantity) => {
    setCartItems((prevCart) => {
      let updatedCart = { ...prevCart };

      if (quantity === 0) {
        delete updatedCart[itemId][size];
        if (Object.keys(updatedCart[itemId]).length === 0) {
          delete updatedCart[itemId];
        }
      } else {
        updatedCart[itemId][size] = quantity;
      }

      return updatedCart;
    });
  };

  return (
    <ShopContext.Provider
      value={{
        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,
        getCartItems,getCartAmount,
        updateQuantity, navigate
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
