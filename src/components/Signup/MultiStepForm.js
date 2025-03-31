import React, { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "./ProgressBar";
import Confetti from "react-confetti"; // 🎉 Import Confetti
import useWindowSize from "react-use/lib/useWindowSize"; // For dynamic confetti size

const MultiStepForm = ({ setShowLogin, setShowSignup }) => {
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false); // 🎊 Confetti state
  const { width, height } = useWindowSize(); // Get screen size for Confetti
  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    dob: "",
    mobileNumber: "",
    email: "",
    address: "",
    bio: "",
    photo: null,
    password: "",
  });

  const [errors, setErrors] = useState({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (
        file &&
        ["image/jpeg", "image/jpg", "image/png"].includes(file.type) &&
        file.size <= 1024 * 1024
      ) {
        setFormData({ ...formData, photo: file });
        setErrors({ ...errors, photo: "" });
      } else {
        setErrors({
          ...errors,
          photo: "Invalid file. Must be JPG, JPEG, PNG & ≤1MB.",
        });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.dob) newErrors.dob = "Date of Birth is required";
    }

    if (step === 2) {
      if (!/^[6-9]\d{9}$/.test(formData.mobileNumber))
        newErrors.mobileNumber = "Invalid mobile number";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
    }

    if (step === 3) {
      if (!formData.photo) newErrors.photo = "Profile photo is required";
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (!passwordRegex.test(formData.password))
        newErrors.password =
          "Password must be alphanumeric and at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      console.log("Submitting form with data:", formData);

      const response = await register(formData); // Use AuthContext's register function

      if (response.success) {
        toast.success("Registration Successful! 🎉");

        setShowSignup(false); // Close Signup Modal
        setShowLogin(false); // Ensure Login Modal is closed too

        //Show Confetti
        setShowConfetti(true);

        // Delay to show confetti & greet message before closing modal
        setTimeout(() => {
          setShowConfetti(false); // Stop Confetti after closing modal
        }, 3000); // Show confetti & message for 3s before closing
      } else {
        toast.error(response.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong during registration.");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />

      {/* 🎊 Show Confetti on Registration Success */}
      {showConfetti && <Confetti width={width} height={height} />}

      <div className="card p-4 shadow-lg">
        <ProgressBar step={step} totalSteps={3} />

        {step === 1 && (
          <Step1
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            setErrors={setErrors}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <Step2
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            setErrors={setErrors}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
          <Step3
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            setErrors={setErrors}
            nextStep={nextStep}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        )}

        <p className="login-link">
          Already have an account?{" "}
          <span
            className="text-primary fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default MultiStepForm;
