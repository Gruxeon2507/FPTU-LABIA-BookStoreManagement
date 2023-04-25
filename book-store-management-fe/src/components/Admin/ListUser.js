import React, { useEffect, useState } from "react";
import UserServices from "../../services/UserServices";
import { Link } from "react-router-dom";
const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);

  const getSomeRecentCreatedUsers = () => {
    UserServices.getOnlyUser(0,5).then((response) => {
      setUsers(response.data);
    });
  };
  const getSomeRecentCreatedAdmins = () => {
    UserServices.getOnlyAdmin().then((response) => {
      setAdmins(response.data);
    });
  };

  useEffect(() => {
    getSomeRecentCreatedUsers(0,5);
  }, []);
  useEffect(() => {
    getSomeRecentCreatedAdmins();
  }, []);


const deleteUser = (username) => {
  const confirmed = showDialog("Are you sure you want to delete?");
  console.log(username);
  if (confirmed) {
    UserServices.deleteUser(username)
      .then((response) => {
        getSomeRecentCreatedUsers(0,5);
        getSomeRecentCreatedAdmins();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const showDialog = (message) => {
  return window.confirm(message);
};
  
  const demoteUser = (username) => {
    UserServices.demoteUser(username)
      .then((response) => {
        getSomeRecentCreatedAdmins();
        getSomeRecentCreatedUsers(0,5);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const promoteAdmin = (username) => {
    console.log(username);
    UserServices.promoteAdmin(username)
      .then((response) => {
        getSomeRecentCreatedAdmins();
        getSomeRecentCreatedUsers(0,5);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div>
        <Link to={"/superadmin"}>Dashboard </Link>
        <Link to={"/admin/user"}>User</Link>
        <Link to={"/admin/book"}>Book </Link>
      </div>
      <h1>List Admin</h1>
      <table className="table table-bordered table-striped">
        <thead>
        <th>Name</th>
          <th>Avatar</th>
          <th>Created Date</th>
          <th>Email</th>
          <th>Dob</th>
          <th>Role</th>
          <th>Action</th>
        </thead>
        <tbody>
          {admins.map((user) => {
            return <tr key={user.username}>
              <td>{user.displayName}</td>
              <td>
                <img
                  src={
                    "http://localhost:6789/api/users/avatar/" + user.username
                  }
                  style={{ width: 40 }}
                  alt=""
                />
              </td>
              <td>{user.createDate}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>Admin</td>

              <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => demoteUser(user.username)}
                    >
                      Demote User
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser (user.username)}
                    >
                      Delete
                    </button>
                  </td>
            </tr>
          })}
        </tbody>
      </table>
      <h1>List User</h1>
      <table className="table table-bordered table-striped">
        <thead>
        <th>Name</th>
          <th>Avatar</th>
          <th>Created Date</th>
          <th>Email</th>
          <th>Dob</th>
          <th>Role</th>
          <th>Action</th>
        </thead>
        <tbody>
        {users.map((user) => {
            return <tr key={user.username}>
              <td>{user.displayName}</td>
              <td>
                <img
                  src={
                    "http://localhost:6789/api/users/avatar/" + user.username
                  }
                  style={{ width: 40 }}
                  alt=""
                />
              </td>
              <td>{user.createDate}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>User</td>

              <td>
                    <button
                      className="btn btn-warning"
                      onClick={() =>  promoteAdmin(user.username)}
                    >
                      Promote Admin
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser(user.username)}
                    >
                      Delete
                    </button>
                  </td>
            </tr>
          })}
        </tbody>
      </table>
    </>
  );
};

export default ListUser;
