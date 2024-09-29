import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { SlClose } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../itemCart/Item.scss";

const ItemCart = ({
  cart,
  handleDecrement,
  handleIncrement,
  handleDeleteCart,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (prevValue, currentValue) =>
      prevValue + currentValue.price * currentValue.quantity,
    0
  );
  const totalItem = cart.reduce(
    (prevValue, currentValue) => prevValue + currentValue.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate("/success");
    } else {
      toast.error("Sorry! You have no cart!");
      navigate("/");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector(".sidebar");
      const toastElement = document.querySelector(".Toastify");

      if (
        open &&
        sidebar &&
        !sidebar.contains(event.target) &&
        !toastElement.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <div className="cg-shop" onClick={() => setOpen(true)}>
        <div className="badge-container">
          <span className="badge">{totalItem}</span>
        </div>

        <FiShoppingCart size={30} />
      </div>

      <div className={`overlay ${open ? "open" : ""}`} />

      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="cart-item-position">
          <div className="bottom-item">
            <p className="item">Item: {totalItem} </p>
            <p className="total">Total: $ {totalPrice}</p>
            <button type="button" onClick={handleCheckout}>
              Check Out
            </button>
          </div>

          <div className="slClose">
            <h4>Cart Item</h4>
            <SlClose
              size={20}
              className="close"
              onClick={() => setOpen(false)}
            />
          </div>

          {cart.length === 0 ? (
            <p className="no-item">No items in the cart</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.id} className="Cart-item">
                  <div className="Cart">
                    <img src={item.img} alt={item.name} />
                    <div>
                      <p className="name">{item.name}</p>
                      <p className="price">${item.price}</p>
                    </div>
                  </div>
                  <div className="quantity-control">
                    <button
                      className="control-button decrement"
                      onClick={() => handleDecrement(item.id)}
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="control-button increment"
                      onClick={() => handleIncrement(item.id)}
                    >
                      <AiOutlinePlus />
                    </button>
                    <MdDelete
                      size={25}
                      className="delete-icon"
                      onClick={() => handleDeleteCart(item.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemCart;
