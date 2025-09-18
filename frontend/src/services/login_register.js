import api from "../services/api.js";
import { useAuth } from "../composables/useAuth.js";
import { useRouter } from "vue-router";

export function login_register() {
  const router = useRouter();
  const { setAuth } = useAuth();

  const loginUser = async (username, password, redirectPath) => {
    try {
      // Send login request to backend
      const response = await api.post("/customers/login", {
        phoneNumber: username,
        password: password,
      });

      if (response.data.isSuccess && response.data) {
        setAuth(response.data); // Save JWT to composable/localStorage
        router.push(redirectPath);
      } else {
        errorMessage.value =
          response.data.message ||
          "Login failed. Please check your credentials.";
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.status === 401) {
        return "Invalid phone number or password";
      } else if (error.response?.status === 404) {
        return "User not found";
      } else if (error.response?.status === 403) {
        return;
        error.response?.data?.errorMessage?.message ||
          "Access denied. Please try again.";
      } else if (error.response?.data?.message) {
        return error.response.data.message;
      } else {
        return "An error occurred during login. Please try again." + error;
      }
    }
    //  finally {
    //   // alert("Finally block executed",error);
    // //   isLoading.value = false;
    // }
  };
  const registerUser = async (
    firstName,
    lastName,
    phoneNumber,
    password,
    redirectPath,
    nextHidden
  ) => {
    try {
      console.log(firstName, lastName, phoneNumber, password, redirectPath);
      const response = await api.post("/customers/send-otp", {
        phoneNumber: phoneNumber,
        firstName: firstName,
        lastName: lastName,
        password: password,
      });
      if (response.data.isSuccess) {
        localStorage.setItem(
          "signup_data",
          JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            password: password,
          })
        );
        router.push("/otp");
      } else {
        return response.data.message || "Account creation failed.";
      }
    } catch (error) {
      return (
        error.response?.data?.message || "Server error. Please try again later."
      );
    }
  };

  const otpSend = async (phone, password) => {};
  const verifyOtp = async (phone, password) => {};

  return { loginUser, registerUser, otpSend, verifyOtp };
}
