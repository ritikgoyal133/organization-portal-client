import React from "react";

const Step1 = ({ formData, handleChange, errors, setErrors, nextStep }) => {
  const validateStep = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === "name" && !value.trim()) {
      newErrors.name = "Name is required";
    }
    if (name === "dob" && !value) {
      newErrors.dob = "Date of Birth is required";
    }

    setErrors(newErrors);
  };

  return (
    <div>
      <h2 className="mb-4">Step 1: Personal Details</h2>

      {/* Name Field */}
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your full name"
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      {/* Gender Selection */}
      <div className="mb-3">
        <label className="form-label d-block">Gender</label>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={handleChange}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
          />
          <label className="form-check-label">Female</label>
        </div>
        {errors.gender && <div className="text-danger">{errors.gender}</div>}
      </div>

      {/* Date of Birth Field */}
      <div className="mb-3">
        <label className="form-label">Date of Birth</label>
        <input
          type="date"
          className={`form-control ${errors.dob ? "is-invalid" : ""}`}
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
      </div>

      <button
        className="btn btn-primary"
        onClick={() => validateStep() && nextStep()}
      >
        Next
      </button>
    </div>
  );
};

export default Step1;
