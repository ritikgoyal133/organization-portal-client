import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import {
  Person,
  Email,
  Phone,
  LocationOn,
  CameraAlt,
} from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import DescriptionIcon from "@mui/icons-material/Description";
import "./AddUserModal.css";

const AddUserModal = ({ show, handleClose, handleAddUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    address: "",
    gender: "",
    dob: "",
    description: "",
    role: "enduser",
    password: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Validation Rules
  const validateForm = () => {
    let errors = {};

    if (formData.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters long.";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.mobileNumber)) {
      errors.mobileNumber = "Mobile number must be exactly 10 digits.";
    }

    if (formData.address.trim().length < 5) {
      errors.address = "Address must be at least 5 characters long.";
    }

    if (!formData.gender) {
      errors.gender = "Gender is required.";
    }

    if (!formData.dob) {
      errors.dob = "Date of birth is required.";
    }

    if (formData.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters.";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be at least 6 characters, with 1 uppercase, 1 lowercase, and 1 number.";
    }

    if (!formData.photo) {
      errors.photo = "Profile picture is required.";
    }

    if (!formData.role) {
      errors.role = "Role is required.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleAddUser(formData);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          {/* Image Upload */}
          <div className="text-center mb-3">
            <label htmlFor="file-upload" className="custom-file-upload">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="preview-img" />
              ) : (
                <CameraAlt fontSize="large" />
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {errors.photo && (
              <Alert variant="danger" className="mt-2">
                {errors.photo}
              </Alert>
            )}
          </div>

          {/* Name */}
          <Form.Group className="mb-3">
            <Form.Label>
              <Person /> Name
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Mobile Number */}
          <Form.Group className="mb-3">
            <Form.Label>
              <Phone /> Mobile Number
            </Form.Label>
            <Form.Control
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              isInvalid={!!errors.mobileNumber}
            />
            <Form.Control.Feedback type="invalid">
              {errors.mobileNumber}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>
              <Email /> Email
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>
              <LockIcon />
              Password
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Gender & DOB */}
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  isInvalid={!!errors.gender}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.gender}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  isInvalid={!!errors.dob}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dob}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Role */}
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              isInvalid={!!errors.role}
            >
              <option value="enduser">End User</option>
              <option value="admin">Admin</option>
              <option value="admin-member">Admin Member</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.role}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Address */}
          <Form.Group className="mb-3">
            <Form.Label>
              <LocationOn /> Address
            </Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>
              <DescriptionIcon />
              Description
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit" className="w-100">
            Add User
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserModal;
