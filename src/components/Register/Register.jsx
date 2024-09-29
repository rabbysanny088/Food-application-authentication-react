import { useContext, useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthProvider";
import "../Register/register.scss";

const Register = () => {
  const {
    signUpWithEmail,
    signInWithGoogle,
    isLoggedIn,
    displayName,
    setDisplayName,
    setFile,
  } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signUpWithEmail(email, password);
    } catch (error) {
      console.error("Error registering with email and password", error);
      console.log("Error registering. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
      toast.success("Successfully registered!");
    } catch (error) {
      console.log("Error signing in with Google", error);
      console.log("Error signing in with Google. Please try again.");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  return (
    <>
      <div className="containerTwo">
        <div className="container">
          <div className="heading">Sign Up</div>
          <form className="form" onSubmit={handleRegister}>
            <input
              type="text"
              className="input"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              placeholder="E-mail"
              type="email"
              className="input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="eye-content">
              <input
                placeholder="Password"
                type={isShowPassword ? "password" : "text"}
                className="input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isShowPassword ? (
                <IoEye className="io-eye" onClick={handleShowPassword} />
              ) : (
                <IoEyeOff className="io-eye" onClick={handleShowPassword} />
              )}
            </div>

            <div>
              <input
                id="avatar"
                type="file"
                name="avatar"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
              <span className="file-custom"></span>
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <div className="loading">Registering...</div>
              ) : (
                "Register"
              )}
            </button>
          </form>
          <div className="social-account-container">
            <Link to="/login" className="title">
              Already have an account? <span className="login">Login</span>
            </Link>
            <span className="or-text">Or</span>
            <div className="social-accounts">
              <div className="btn google" onClick={handleGoogleSignIn}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.1"
                  x="0px"
                  y="0px"
                  className="google-icon"
                  viewBox="0 0 48 48"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                <span>Register in with Google</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
