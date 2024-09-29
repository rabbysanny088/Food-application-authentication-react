import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./components/ForgetPassword/ForgotPassword";
import GetCategory from "./components/GetAllCategory/GetCategory";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Success from "./components/successPage/Success";

const App = () => {
  const [cart, setCart] = useState([]);

  const notifySuccess = (message) => toast.success(message);

  const handleAddToCart = (food) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === food.id);

      if (existingItem) {
        const updatedCart = prevCart.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );

        toast.update(existingItem.toastId, {
          render: `${food.name} - Quantity: ${existingItem.quantity + 1}`,
          type: "success",
          autoClose: 2000, // Optional: Update auto-close time
        });

        return updatedCart;
      } else {
        const toastId = toast.success(
          `${food.name} added to cart! Quantity: 1`,
          { autoClose: 2000 }
        );

        return [...prevCart, { ...food, quantity: 1, toastId }];
      }
    });
  };

  const handleIncrement = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const handleDeleteCart = (id) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find((item) => item.id === id);
      const updatedCart = prevCart.filter((item) => item.id !== id);
      if (itemToRemove) {
        notifySuccess(`${itemToRemove.name} removed from cart!`); // Error toast
      }
      return updatedCart;
    });
  };

  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <GetCategory
                handleAddToCart={handleAddToCart}
                cart={cart}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
                handleDeleteCart={handleDeleteCart}
              />
            }
          />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
