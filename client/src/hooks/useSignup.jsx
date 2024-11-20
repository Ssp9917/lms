import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import axios from "../config/axiosConfig"
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const signup = async ({
    name,
    email,
    password,
    confirmPassword,
  }) => {
    console.log({ name, email, password, confirmPassword });

    // Input validation
    const success = handleInputErrors({
      name,
      email,
      password,
      confirmPassword,
    });
    if (!success) return;

    setLoading(true);
    try {
      // Send signup request to API
      const res = await axios.post("/user/signup", {
        name,
        email,
        password,
        confirmPassword,
       
      });

      console.log(res); // Log response for debugging
      const data = res.data; // No need to await here, as it's already the result

      //   if (data.error) {
      //     throw new Error(data.error); // Handle error if it comes from the API
      //   }

      // Save user data in localStorage and set it to context
      localStorage.setItem("lms-user", JSON.stringify(data));
      setAuthUser(data);

      Swal.fire({
        title: "Success!",
        text: "Signup successful!",
        icon: "success",
      });

      navigate("/");
    } catch (error) {
      // Handle errors gracefully
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false); // Stop loading indicator after request completes
    }
  };

  return { loading, signup };
};

export default useSignup;

// Helper function to validate inputs
function handleInputErrors({
  name,
  email,
  password,
  confirmPassword,
}) {
  if (!name || !email || !password || !confirmPassword) {
    Swal.fire({
      title: "Error!",
      text: "Please fill all fields.",
      icon: "error",
      confirmButtonText: "Try Again",
    });
    return false;
  }

  if (password !== confirmPassword) {
    Swal.fire({
      title: "Error!",
      text: "Passwords do not match.",
      icon: "error",
      confirmButtonText: "Try Again",
    });
    return false;
  }

  if (password.length < 6) {
    Swal.fire({
      title: "Error!",
      text: "Password must be at least 6 characters.",
      icon: "error",
      confirmButtonText: "Try Again",
    });
    return false;
  }

  return true;
}