import React, { useState, useEffect, useContext } from "react";
import { getCurrentUser, updateUser } from "../../services/authService";
import AuthContext from "../../context/AuthContext"; // Auth context
import "./Profile.css"; // CSS file
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext); // Context for user data
  const [formData, setFormData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = user?.userId; // Get user ID from context

  // Fetch latest user data when visiting the profile page
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getCurrentUser(userId);
        console.log("User Data:", response);
        setFormData({
          name: response.name || "",
          email: response.email || "",
          mobileNumber: response.mobileNumber || "",
          address: response.address || "",
          gender: response.gender || "",
          description: response.description || "",
          dob: response.dob ? response.dob.split("T")[0] : "", // Format date
          tripCount: response.tripCount, // Non-editable
        });
        setPreviewImage(response.photoURL || "/hello.png");
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]); // Fetch when user ID changes

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        setError("Only PNG, JPEG, and JPG formats are allowed");
        return;
      }
      setError("");
      setFormData({ ...formData, photo: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();
      for (const key in formData) {
        if (formData[key]) {
          updatedData.append(key, formData[key]);
        }
      }

      const response = await updateUser(userId, updatedData);

      alert("Profile updated successfully!");
      setUser(response.data); // Update user context with new data
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <Container className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      {error && <p className="error-text">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        formData && (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4} className="text-center">
                <Image
                  src={previewImage}
                  roundedCircle
                  className="profile-image"
                />
                <Form.Group>
                  <Form.Label>Upload Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData?.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobileNumber"
                    value={formData?.mobileNumber}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData?.address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={formData?.gender}
                    onChange={handleChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData?.dob}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Trip Count</Form.Label>
                  <Form.Control
                    type="number"
                    name="tripCount"
                    value={formData?.tripCount}
                    readOnly
                  />{" "}
                  {/* Non-editable */}
                </Form.Group>

                <Button variant="primary" type="submit">
                  Update Profile
                </Button>
              </Col>
            </Row>
          </Form>
        )
      )}
    </Container>
  );
};

export default Profile;
