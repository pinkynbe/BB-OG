import React, { useState, useEffect } from "react";

function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch users from API
    // This is a placeholder, replace with actual API call
    const fetchUsers = async () => {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    // Open modal logic here
  };

  const handleSaveUser = (updatedUser) => {
    // Implement save user logic here
    console.log("Save user", updatedUser);
    // Close modal logic here
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Management</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add modal for editing user here */}
    </div>
  );
}

export default AdminUserManagement;
