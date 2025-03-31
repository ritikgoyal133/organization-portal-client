import React from "react";

const Step2 = ({
  formData,
  handleChange,
  errors,
  setErrors,
  nextStep,
  prevStep,
}) => {
  const validateStep = () => {
    let newErrors = {};

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
    }

    // Mobile Number Validation: Must start with 6-9 and have exactly 10 digits
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!mobileRegex.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber =
        "Invalid mobile number (must start with 6-9 and be 10 digits long)";
    }

    // Address Validation: At least 5 characters
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters long.";
    }

    setErrors(newErrors);
    console.log("Validation Errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <h2 className="mb-4">Step 2: Contact Details</h2>

      {/* Email Input */}
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      {/* Mobile Number Input */}
      <div className="mb-3">
        <label className="form-label">Mobile Number</label>
        <input
          type="text"
          className={`form-control ${errors.mobileNumber ? "is-invalid" : ""}`}
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          placeholder="Enter your mobile number"
        />
        {errors.mobileNumber && (
          <div className="invalid-feedback">{errors.mobileNumber}</div>
        )}
      </div>

      {/* Address Input */}
      <div className="mb-3">
        <label className="form-label">Address</label>
        <input
          type="text"
          className={`form-control ${errors.address ? "is-invalid" : ""}`}
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
        />
        {errors.address && (
          <div className="invalid-feedback">{errors.address}</div>
        )}
      </div>

      <button className="btn btn-secondary me-2" onClick={prevStep}>
        Back
      </button>
      <button
        className="btn btn-primary"
        onClick={() => validateStep() && nextStep()}
      >
        Next
      </button>
    </div>
  );
};

export default Step2;
