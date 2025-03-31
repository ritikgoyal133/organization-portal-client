import React, { useState } from "react";
import { compressImage } from "../../utils/imageUtils"; // Import the utility
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import Material UI icons
import IconButton from "@mui/material/IconButton"; // For the eye toggle button

const Step3 = ({
  formData,
  handleChange,
  errors,
  setErrors,
  prevStep,
  handleSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const validateStep = () => {
    let newErrors = {};

    // Profile Photo Validation: Required
    if (!formData.photo) {
      newErrors.photo = "Profile photo is required";
    }

    // Password Validation: Alphanumeric & at least 6 characters
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password.trim())) {
      newErrors.password =
        "Password must be at least 6 characters long and contain both letters and numbers.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Profile Photo Upload with Compression
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const compressedFile = await compressImage(file);
      handleChange({
        target: { name: "photo", value: compressedFile },
      });

      setErrors((prev) => ({ ...prev, photo: "" })); // Clear errors
    } catch (error) {
      setErrors((prev) => ({ ...prev, photo: error.message }));
    }
  };

  return (
    <div>
      <h2 className="mb-4">Step 3: Profile Setup</h2>

      {/* Profile Photo Upload */}
      <div className="mb-3">
        <label className="form-label">Profile Photo</label>
        <input
          type="file"
          className="form-control"
          name="photo"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
        {errors.photo && <small className="text-danger">{errors.photo}</small>}
      </div>

      {/* Password Input with Eye Toggle */}
      <div className="mb-3">
        <label className="form-label">Password</label>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <IconButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </div>
        {errors.password && (
          <small className="text-danger">{errors.password}</small>
        )}
      </div>

      {/* Bio Input (No Validation) */}
      <div className="mb-3">
        <label className="form-label">Bio</label>
        <textarea
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell us about yourself"
        />
      </div>

      <button className="btn btn-secondary me-2" onClick={prevStep}>
        Back
      </button>
      <button
        className="btn btn-success"
        onClick={() => validateStep() && handleSubmit()}
      >
        Submit
      </button>
    </div>
  );
};

export default Step3;
