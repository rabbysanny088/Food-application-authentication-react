import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import FoodData from "../../data/FoodData";
import "../GetAllCategory/category.scss";
import ItemCart from "../itemCart/ItemCart";
import Navbar from "../Navbar/Navbar";

const GetCategory = ({
  handleAddToCart,
  cart,
  handleDecrement,
  handleIncrement,
  handleDeleteCart,
}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true); // Start as true for initial loading
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const searchItem = e.target.value.toLowerCase();
    setSearch(searchItem);

    const filtered = FoodData.FoodItems.filter((item) =>
      item.name.toLowerCase().includes(searchItem)
    );

    setFilteredProducts(filtered);
    setNotFound(filtered.length === 0 && searchItem !== "");
  };

  useEffect(() => {
    const UniqueCategory = [
      "All",
      ...new Set(FoodData.FoodItems.map((food) => food.category)),
    ];
    setCategories(UniqueCategory);
    setFilteredProducts(FoodData.FoodItems);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearch("");
    setLoading(true);
    setTimeout(() => {
      if (category === "All") {
        setFilteredProducts(FoodData.FoodItems);
        setNotFound(false);
      } else {
        const filtered = FoodData.FoodItems.filter(
          (food) => food.category === category
        );
        setFilteredProducts(filtered);
        setNotFound(filtered.length === 0);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h4>Fresh Foods</h4>
        <h3>Our Products</h3>
        <div className="category">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={category === selectedCategory ? "bg-color" : ""}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="main-input">
          <div className="input-container">
            <input
              placeholder="Search item..."
              type="text"
              value={search}
              onChange={handleChange}
            />
          </div>
        </div>
        {notFound && <p className="not-found-message">No products found!</p>}{" "}
        <div className="products">
          {loading ? (
            <div className="loader-container">
              <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : (
            <>
              {filteredProducts.map((product, index) => (
                <div key={index} className="product-item">
                  <img src={product.img} alt="logo-img" />
                  <div className="product-text">
                    <div className="product-title">
                      <h5>{product.name}</h5>
                      <span>${product.price}</span>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <ItemCart
          cart={cart}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          handleDeleteCart={handleDeleteCart}
        />
      </div>
    </div>
  );
};

export default GetCategory;
