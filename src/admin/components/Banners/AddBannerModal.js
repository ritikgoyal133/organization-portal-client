import { useState } from "react";
import { toast } from "react-toastify";
import { uploadBanners } from "../../../services/authService";
import { compressImage } from "../../../utils/imageUtils";
import { Modal, TextField, Button, MenuItem, Box } from "@mui/material";

const AddBannerModal = ({ open, onClose, onBannerAdded }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("active");
  const [priority, setPriority] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedFile = await compressImage(file);
        setImage(compressedFile);
        setPreview(URL.createObjectURL(compressedFile));
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title is required");
    if (!image) return toast.error("Please upload an image");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);
      formData.append("status", status);
      formData.append("priority", priority);

      const response = await uploadBanners(formData);
      toast.success("Banner added successfully");
      onBannerAdded(response.data.banner);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-container">
        <h2>Add Banner</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img src={preview} alt="Preview" className="preview-img" />
          )}
          <TextField
            select
            label="Status"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="blocked">Blocked</MenuItem>
          </TextField>
          <TextField
            label="Priority"
            type="number"
            fullWidth
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Banner"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddBannerModal;
