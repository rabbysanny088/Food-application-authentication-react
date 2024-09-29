import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../../firebase";
import "../ForgetPassword/forgot.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    console.log("Email being sent for reset: ", email); // Check if the email is defined

    if (!email) {
      console.error("Email is undefined. Please enter a valid email.");
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      console.error("Error sending password reset email", error);
      toast.error("Error sending reset email. Please try again.");
    }
  };

  return (
    <div className="main">
      <div className="forgot-password-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        <Link to="/login">
          <p className="back">Go back</p>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
