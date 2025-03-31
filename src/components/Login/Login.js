import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css"; // Import external CSS

const Login = ({ setShowLogin, setShowSignup }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email or mobile is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" })); // ✅ Correctly resets only the current field error
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true); // Start loading spinner
    const result = await login(formData);
    setLoading(false); // Stop loading spinner

    if (result.success) {
      toast.success(result.message); // Use the success message from the result
      setShowLogin(false); // Close the login modal
      navigate("/"); // Navigate to the home page or desired route
    } else {
      // Display error message
      setErrors({ apiError: result.message || "Invalid credentials" });
      toast.error(result.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2 className="login-header">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label">
              <Email className="icon" /> Email or Mobile
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email or mobile number"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              required
            />
            {errors.email && (
              <div className="invalid-feedback d-block">{errors.email}</div> // ✅ Ensures error is properly displayed
            )}
          </div>

          {/* Password Field with Eye Toggle */}
          <div className="mb-3">
            <label className="form-label">
              <Lock className="icon" /> Password
            </label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
            {errors.password && (
              <div className="invalid-feedback d-block">{errors.password}</div> // ✅ Ensures error is properly displayed
            )}
          </div>

          {/* Show API Error */}
          {errors.apiError && (
            <div className="alert alert-danger text-center mt-3">
              {errors.apiError}
            </div> // ✅ Added margin to prevent overlapping
          )}

          {/* Login Button with Spinner */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="signup-link">
          Don't have an account?{" "}
          <span
            className="text-primary fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
