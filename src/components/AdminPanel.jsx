import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../fetchWithAuth';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetchWithAuth('http://localhost:8080/admin/Users', { method: 'GET' });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Error fetching users');
    }
  };

  const updateRole = async (id, role) => {
    try {
      const response = await fetchWithAuth(
        `http://localhost:8080/admin/update/role/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(role),
        }
      );
      if (response.ok) {
        toast.success('Role updated', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });
        getUsers();
      } else {
        toast.error('Failed to update role');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Error updating role');
    }
  };

  const handleDelet = (id) => {
  const toastId =   toast.info(
      <div>
        <p>Are you sure?</p>
        <button className='btn btn-success' onClick={()=>handleYes(id , toastId)} style={{ marginRight: '8px' }}>Yes</button>
        <button className='btn btn-danger' onClick={()=>handleNo(toastId)}>No</button>
      </div>,
      {
        autoClose: false,
        closeOnClick: false
      }
    );
  }


  const handleYes = async (id , Toastid) => {
    try {
      const response = await fetchWithAuth(`http://localhost:8080/admin/delete/${id}`, { method: 'DELETE' })
      if (response.ok) {
        toast.success('User Deleted', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        })
        toast.dismiss(Toastid)
        getUsers()
      }

      else {
        toast.error('Failed to update role');
      }
    } catch (error) {
      console.error('Error Deleting  user:', error);
      toast.error('Error Deleting  user:');
    }
  }

  const handleNo =(id) =>{
    toast.dismiss(id)
  }


  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container my-4">
      <h2>Admin Panel - Users</h2>
      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Update Role</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name || user.username || '—'}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => updateRole(user.id, e.target.value)}
                    className="form-select"
                  >
                    <option value="CLIENT">CLIENT</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="GESTIONNAIRE_ACHAT">GESTIONNAIRE_ACHAT</option>
                  </select>
                </td>
                <td><button className='btn btn-danger w-100' onClick={() => handleDelet(user.id)}>X</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
