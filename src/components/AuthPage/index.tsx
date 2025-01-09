import React, { FormEvent, useState, useEffect } from "react";
import RoboDoodle from "../../assets/RoboBlue.png";
import HandHeartDoodle from "../../assets/HandHeartBlue.png";
import ChatDoodle from "../../assets/ChartBlue.png";
import ChatsDoodle from "../../assets/ChatsBlue.png";
import EnvelopDoodle from "../../assets/EnvelopeSimpleOpenBlue.png";
import MacyAI from "../../assets/macyAI.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { GoogleAuth, googleProp } from "./GoogleAuth";

export const AuthPage: React.FC = () => {
  const { login, signup, isLoading, error, clearError } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setValidationErrors({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
    clearError();
  }, [isLogin, clearError]);

  const validateForm = () => {
    const errors = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    // Email validation (only for signup)
    if (!isLogin) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(formData.email)) {
        errors.email = "Please enter a valid email address";
        isValid = false;
      }
    }

    // Username validation
    if (!formData.username) {
      errors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters long";
      isValid = false;
    } else if (formData.username.length > 20) {
      errors.username = "Username must be less than 20 characters";
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username =
        "Username can only contain letters, numbers, and underscores";
      isValid = false;
    }

    // Password validation
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      isValid = false;
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      errors.password = "Password must contain at least one uppercase letter";
      isValid = false;
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      errors.password = "Password must contain at least one number";
      isValid = false;
    }

    // Confirm password validation (only for signup)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      console.log("Form validation");
      return;
    }

    try {
      if (isLogin) {
        const access = await login(formData.username, formData.password);
        if (access) {
          const from = (location.state as any)?.from?.pathname || "/Chat";
          navigate(from, { replace: true });
          toast.success("welcome Back");
        } else {
          toast.error("Invalid Credentials");
        }
      } else {
        const registered = await signup(
          formData.email,
          formData.username,
          formData.password
        );
        if (registered) {
          toast.success("Successfully signed up");
          window.location.reload();
        } else {
          toast.error("Oops an error occurred");
        }
      }
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setValidationErrors((prev) => ({
          ...prev,
          email: "This email is already registered",
        }));
      } else if (err.code === "auth/username-taken") {
        setValidationErrors((prev) => ({
          ...prev,
          username: "This username is already taken",
        }));
      }
      console.error("Auth error:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    setValidationErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
    clearError();
  };

  const handleSocialSignIn = async (provider: "google" | "apple") => {
    try {
      // Here you would implement the social sign-in logic
      console.log(`${provider} sign-in clicked`);
    } catch (err) {
      console.error(`${provider} sign-in error:`, err);
    }
  };

  const renderInput = (
    name: "email" | "username" | "password" | "confirmPassword",
    label: string,
    type: string,
    placeholder: string,
    icon: string,
    showPasswordToggle = false
  ) => (
    <div>
      <label
        htmlFor={name}
        className="text-theme-blue block mb-1 text-xs font-bold text-start"
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          icon={icon}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5"
        />
        <input
          id={name}
          type={
            showPasswordToggle
              ? name === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : showConfirmPassword
                ? "text"
                : "password"
              : type
          }
          name={name}
          required
          className={`rounded-full w-full pl-10 pr-${
            showPasswordToggle ? "10" : "3"
          } py-2 border ${
            validationErrors[name] ? "border-red-500" : "border-theme-blue"
          } bg-theme-dark-blue text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleInputChange}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() =>
              name === "password"
                ? setShowPassword(!showPassword)
                : setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <Icon
              icon={
                name === "password"
                  ? showPassword
                    ? "nimbus:eye-off"
                    : "iconamoon:eye-thin"
                  : showConfirmPassword
                  ? "nimbus:eye-off"
                  : "iconamoon:eye-thin"
              }
              className="h-5 w-5"
            />
          </button>
        )}
        {validationErrors[name] && (
          <p className="text-red-500 text-xs mt-1">{validationErrors[name]}</p>
        )}
      </div>
    </div>
  );

  const google: googleProp = { isLoading: isLoading, isLogin: isLogin };

  return (
    <div className="flex min-h-screen">
      {/* Left Section remains unchanged */}
      <div className="w-full lg:w-1/2 hidden md:flex md:flex-col justify-between p-4 lg:p-8 lg:pt-52 ">
        <div className="text-center lg:text-left">
          <h1
            className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-theme-dark-blue
           flex flex-col items-center lg:items-start lg:ml-32 gap-2 lg:gap-6"
          >
            <div>Talk freely,</div>
          </h1>
          <h1
            className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-theme-dark-blue
           flex flex-col items-center lg:pl-16 gap-2 lg:gap-6 mt-2"
          >
            <div className="flex items-center">
              Heal deeply.
              <span className="text-base lg:text-xl font-extrabold ml-1">
                TM
              </span>
            </div>
          </h1>
          <div className="flex justify-center gap-1 mt-8 lg:mt-11">
            {[
              RoboDoodle,
              ChatDoodle,
              HandHeartDoodle,
              ChatsDoodle,
              EnvelopDoodle,
            ].map((doodle, index) => (
              <img
                key={index}
                src={doodle}
                alt="doodle"
                className="w-8 md:w-12 lg:w-20 motion-safe:animate-pulse"
              />
            ))}
          </div>
        </div>
        <div className="mt-8 lg:mt-0">
          <img src={MacyAI} alt="in2macy" className="mx-auto max-w-full" />
        </div>
      </div>
      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-theme-dark-blue min-h-screen">
        <div className="bg-[#ffffff1A] text-left px-6 lg:px-9 py-3">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
        </div>

        <div className="flex items-center justify-center p-4 lg:p-0">
          <div className="w-full max-w-md space-y-4 p-4">
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="space-y-2">
                {renderInput(
                  "username",
                  "UserName",
                  "text",
                  "Enter your username",
                  "mdi:user-outline"
                )}

                {!isLogin &&
                  renderInput(
                    "email",
                    "Email address",
                    "email",
                    "Email address",
                    "material-symbols:mail-outline-sharp"
                  )}

                {renderInput(
                  "password",
                  "Password",
                  "password",
                  "Password",
                  "mingcute:lock-line",
                  true
                )}

                {!isLogin &&
                  renderInput(
                    "confirmPassword",
                    "Confirm Password",
                    "password",
                    "Confirm Password",
                    "mingcute:lock-line",
                    true
                  )}

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <div className="text-sm flex items-center gap-2 text-gray-500">
                  {isLogin ? (
                    <div className="flex gap-2">
                      <div className="text-sm">Not registered yet?</div>
                      <button
                        type="button"
                        onClick={toggleAuthMode}
                        className="font-bold text-blue-600 hover:text-blue-500"
                      >
                        Sign Up!
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm">
                      I have read the{" "}
                      <span className="text-theme-blue font-bold">
                        Privacy Policy
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-theme-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Please wait..." : isLogin ? "LOG IN" : "SIGN UP"}
              </button>
            </form>

            {/* Social auth buttons section remains unchanged */}
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-theme-dark-blue text-white">Or</span>
              </div>
            </div>

            <div className="space-y-4">
              <GoogleAuth {...google} />

              <button
                onClick={() => handleSocialSignIn("apple")}
                disabled={isLoading}
                className="w-full inline-flex items-center justify-between py-2 px-8 border border-gray-300 rounded-full shadow-sm bg-white text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-8 w-8 text-gray-900 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.57 3.51 7.6 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                  />
                </svg>
                Sign {isLogin ? "in" : "up"} with Apple
                <div className=""></div>
              </button>
            </div>
            {!isLogin ? (
              <div className="flex gap-2 items-center justify-center">
                <div className="text-sm text-gray-500">
                  Already have an account?
                </div>
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="font-bold text-blue-600 hover:text-blue-500"
                >
                  Log In!
                </button>
              </div>
            ) : null}

            <p className="text-center text-sm text-gray-600">
              By {isLogin ? "logging in" : "signing up"}, you agree to our{" "}
              <br />
              <a
                href="#"
                className="font-bold text-blue-600 hover:text-blue-500"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-bold text-blue-600 hover:text-blue-500"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
