import api from "./api";

// Instead of writing API calls separately in every component, we define them once in authService.js easy to change api as well.

//User APIs
// Register User API
export const registerUser = async (formData) => {
  try {
    const formDataObj = new FormData();

    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    console.log("FormData Sent:", [...formDataObj.entries()]);

    const response = await api.post("/auth/register", formDataObj, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Response Received:", response.data);
    return response;
  } catch (error) {
    console.error("Error in registerUser:", error);
    throw error;
  }
};

// Login User API
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials, {
      headers: { "Content-Type": "application/json" }, // Specify content type
    });
    return response.data; // Return the response data for easier access
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw new Error(
      error.response?.data?.message || "Login failed. Please try again."
    );
  }
};

//Verify Token API
export const verifyToken = async () => {
  const response = await api.get("/auth/verify-token", {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

// Update User API
export const updateUser = async (userId, formData) => {
  try {
    const formDataObj = new FormData();

    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    console.log("FormData Sent:", [...formDataObj.entries()]);

    const response = await api.patch(`/users/${userId}`, formDataObj, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Response Received:", response.data);
    return response;
  } catch (error) {
    console.error("Error in updateUser:", error);
    throw error;
  }
};

export const logoutUser = async () => {};

// Get Current User API
export const getCurrentUser = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

//Banner APIs
//Get Active Banner API
export const getBanners = async () => {
  try {
    const response = await api.get("/banners", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("response:", response.data.banners);
    return response.data.banners;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

//Upload Banner
export const uploadBanners = async (formData) => {
  try {
    const response = await api.post("/banners", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

//Delete Banner
export const deleteBanner = async (id) => {
  try {
    const response = await api.delete(`/banners/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

//Get Banner By Id
export const getBannerById = async (id) => {
  try {
    const response = await api.get(`/banners/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

//Update Banner
export const updateBanner = async (id, formData) => {
  try {
    console.log("FormData Sent:", [...formData.entries()]);

    const response = await api.patch(`/banners/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Response Received:", response.data);
    return response;
  } catch (error) {
    console.error("Error updating banner:", error);
    throw error;
  }
};
