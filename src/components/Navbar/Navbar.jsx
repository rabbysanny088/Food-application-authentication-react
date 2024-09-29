import { useContext, useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AuthContext } from "../../context/AuthProvider";
import "../Navbar/navbar.scss";

const slides = [
  {
    id: 1,
    imgSlider:
      "https://vflat.vigortheme.com/wp-content/uploads/2022/04/slide1.png",
    button: "Order Now",
    title: "Fresh healthy",
    titleTwo: "Organic Veggies",
    subTitle: "Limited time offer!",
  },
  {
    id: 2,
    imgSlider:
      "https://vflat.vigortheme.com/wp-content/uploads/2022/04/slide2.png",
    button: "Order Now",
    title: "Natural Foods",
    titleTwo: "Healthy & Fresh",
    subTitle: "Limited time offer!",
  },
  {
    id: 3,
    imgSlider:
      "https://vflat.vigortheme.com/wp-content/uploads/2022/04/slide3.png",
    button: "Order Now",
    title: "Fresh Safety",
    titleTwo: "Fresh Vegetable",
    subTitle: "Limited time offer!",
  },
];
const Navbar = () => {
  const navigate = useNavigate();
  const { signOutUser, displayName, user } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector(".user-profile");
      if (sidebar && !sidebar.contains(event.target)) {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return null;

  return (
    <>
      <nav className="navbar">
        {/* Left side: Logo */}
        <div className="navbar-logo">
          <img src="../../../public/Obrien-Logo_125x.png" alt="" />
        </div>

        <div>
          {user && (
            <div className="user-profile">
              <div className="w-10 h-10 rounded-full" onClick={toggleProfile}>
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="Profile Picture"
                    className="cursor-pointer"
                  />
                )}
              </div>

              <div
                className={`profile-details ${showProfile ? "show" : ""}`}
                style={{
                  opacity: showProfile ? 1 : 0,
                  transform: showProfile
                    ? "translateY(0)"
                    : "translateY(-10px)",
                }}
              >
                {user.displayName && (
                  <>
                    <p>
                      <span className="name">Name</span>: {user.displayName}
                    </p>
                    <p>
                      <span className="name">Email</span>: {user.email}
                    </p>
                  </>
                )}
                <div onClick={handleSignOut} className="logout-button">
                  LogOut
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="slider-container">
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Pagination, Navigation]}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="swiper-slide">
                <img src={slide.imgSlider} alt={slide.title} />
                <div className="overlay">
                  <h2>{slide.title}</h2>
                  <p className="slide-two">{slide.titleTwo}</p>
                  <p>{slide.subTitle}</p>
                  <a href="#">{slide.button}</a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-prev">
          <BsArrowLeft />
        </div>
        <div className="custom-next">
          <BsArrowRight />
        </div>
      </div>
    </>
  );
};

export default Navbar;
