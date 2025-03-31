import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import { updateBanner } from "../../../services/authService";
import { compressImage } from "../../../utils/imageUtils";

const EditBannerModal = ({ open, handleClose, banner, refreshBanners }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("active");
  const [priority, setPriority] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (banner) {
      setTitle(banner.title || "");
      setStatus(banner.status);
      setPriority(banner.priority);
    }
  }, [banner]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const compressedFile = await compressImage(file);
        setImageFile(compressedFile);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      return toast.error("Title is required.");
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("status", status);
      formData.append("priority", String(priority)); // Ensure it's a string
      if (imageFile) formData.append("image", imageFile);

      const response = await updateBanner(banner._id, formData);

      console.log("Update Response:", response);

      if (response?.status === 200) {
        toast.success("Banner updated successfully!");
        refreshBanners();
        handleClose();
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update banner.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Banner</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="dense"
        />
        <TextField
          select
          fullWidth
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          margin="dense"
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="blocked">Blocked</MenuItem>
        </TextField>
        <TextField
          type="number"
          fullWidth
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          margin="dense"
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          color="primary"
          variant="contained"
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBannerModal;
