import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { TypeAnimation } from "react-type-animation";
import "../successPage/success.scss";

const Success = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="success-container">
      {loading ? (
        <PropagateLoader color="#36d7b7" className="loader" />
      ) : (
        <>
          <div>
            <TypeAnimation
              sequence={["Congrats!", 3000, "Your order has been placed"]}
              wrapper="span"
              speed={50}
              className="animation-text"
              repeat={Infinity}
            />
          </div>
          <div className="button-container">
            <button onClick={() => navigate("/")}>Go to Home</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Success;
