import React, { useEffect, useState } from "react";
import axios from "axios";
import EditUserModal from "./EditUserModal";
import AddUserModal from "./AddUserModal";
import {
  Table,
  Button,
  Image,
  Spinner,
  Alert,
  Pagination,
  Modal,
} from "react-bootstrap";
import { Edit, Delete, Add } from "@mui/icons-material";
import "./UsersTable.css";
import { toast } from "react-toastify";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/users?page=${page}&limit=${limit}`
        );
        setUsers(data.users);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit]);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  // const handleAddUser = (updatedUser) => {
  //   if (!updatedUser._id) {
  //     // Adding new user
  //     setUsers([...users, { ...updatedUser, _id: users.length + 1 }]);
  //   } else {
  //     // Updating existing user
  //     setUsers(
  //       users.map((user) => (user._id === updatedUser._id ? updatedUser : user))
  //     );
  //   }
  // };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
        newUser
      );

      setUsers((prevUsers) => [...prevUsers, data]);
      setShowAddModal(false);
      toast.success("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user!");
    }
  };

  return (
    <>
      <div className="users-table">
        <div className="table-header">
          <h2 className="table-title">Manage Users</h2>
          <Button
            variant="primary"
            size="sm"
            className="add-user-btn"
            onClick={() => setShowAddModal(true)} // ✅ Correctly setting showAddModal to true
          >
            <Add /> Add User
          </Button>
        </div>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : users.length === 0 ? (
          <Alert variant="info">No users found.</Alert>
        ) : (
          <>
            <Table striped bordered hover responsive className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>Trips</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>
                      <Image
                        src={user.photo || "https://via.placeholder.com/50"}
                        alt="User"
                        roundedCircle
                        width={40}
                        height={40}
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobileNumber}</td>
                    <td>{user.address || "N/A"}</td>
                    <td>{user.gender.toUpperCase()}</td>
                    <td>
                      {user.dob
                        ? new Date(user.dob).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>{user.tripCount || 0}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${user.status}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="action-btn"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit /> Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="action-btn"
                        onClick={() => handleDelete(user._id)}
                      >
                        <Delete /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination className="pagination">
              <Pagination.Prev
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              />
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === page}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              />
            </Pagination>
          </>
        )}

        {/* Add User Modal */}
        <AddUserModal
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
          handleAddUser={handleAddUser}
        />
      </div>
    </>
  );
};

export default UsersTable;
