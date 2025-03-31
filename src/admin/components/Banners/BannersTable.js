import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
import { getBanners } from "../../../services/authService";
import EditBannerModal from "./EditBannerModal";
import AddBannerModal from "./AddBannerModal";

const BannerTable = () => {
  const [banners, setBanners] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await getBanners();
      console.log("response banner", response);
      setBanners(response);
    } catch (error) {
      toast.error("Failed to load banners");
    }
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setOpenEdit(true);
  };

  const handleDelete = async (id) => {
    try {
      //   await api.delete(`/banners/${id}`);
      toast.success("Banner deleted successfully");
      fetchBanners();
    } catch (error) {
      toast.error("Failed to delete banner");
    }
  };

  return (
    <div>
      <button onClick={() => setOpenAdd(true)}>Add Banner</button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {banners?.length > 0 ? (
            banners.map((banner) => (
              <TableRow key={banner._id}>
                <TableCell
                  onClick={() => {
                    setSelectedBanner(banner);
                    setOpenImageModal(true);
                  }}
                >
                  <img
                    src={banner.imageUrl}
                    alt="banner"
                    width="50"
                    height="50"
                    style={{ cursor: "pointer" }}
                  />
                </TableCell>
                <TableCell>{banner.title}</TableCell>
                <TableCell>{banner.status}</TableCell>
                <TableCell>{banner.priority}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(banner)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(banner._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No banners found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AddBannerModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        refresh={fetchBanners}
      />
      <EditBannerModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        banner={selectedBanner}
        refresh={fetchBanners}
      />

      <Modal open={openImageModal} onClose={() => setOpenImageModal(false)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {selectedBanner && (
            <img
              src={selectedBanner.imageUrl}
              alt="banner"
              style={{ maxWidth: "90%", maxHeight: "90%" }}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default BannerTable;
