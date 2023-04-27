import React, { useEffect, useState } from "react";
import UserServices from "../../services/UserServices";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const sizePerPage = 5;
  const [currentPageUser, setCurrentPageUser] = useState(1);
  const [currentPageAdmin, setCurrentPageAdmin] = useState(1);
  const user = window.localStorage.getItem('user');

  const countUser = UserServices.countUser().then((response) => {
    setTotalUsers(response.data);
  });
  const countAdmin = UserServices.countAdmin().then((response) => {
    setTotalAdmins(response.data);
  });
  const getOnlyUser = (current, sizePerPage) => {
    UserServices.getOnlyUser(current, sizePerPage).then((response) => {
      setUsers(response.data);
    });
  };
  const getOnlyAdmin = (current, sizePerPage) => {
    UserServices.getOnlyAdmin(current, sizePerPage).then((response) => {
      setAdmins(response.data);
    });
  };

  useEffect(() => {
    getOnlyUser(0, sizePerPage);
  }, []);
  useEffect(() => {
    getOnlyAdmin(0, sizePerPage);
  }, []);

  const deleteUser = (username) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    console.log(username);
    if (confirmed) {
      UserServices.deleteUser(username).then((response) => {
        getOnlyUser(0, sizePerPage);
        getOnlyAdmin(0, sizePerPage);
      });
    }
  };

  const demoteUser = (username) => {
    UserServices.demoteUser(username).then((response) => {
      getOnlyAdmin(0, sizePerPage);
      getOnlyUser(0, sizePerPage);
    });
  };
  const promoteAdmin = (username) => {
    console.log(username);
    UserServices.promoteAdmin(username).then((response) => {
      getOnlyAdmin(0, sizePerPage);
      getOnlyUser(0, sizePerPage);
    });
  };
  const handlePageChangeUser = (current) => {
    setCurrentPageUser(current);
    getOnlyUser(current - 1, sizePerPage);
  };
  const handlePageChangeAdmin = (current) => {
    setCurrentPageAdmin(current);
    getOnlyAdmin(current - 1, sizePerPage);
  };

  return (
    <>
      <nav className="admin-nav">
        <Link to={"/admin"}>Dashboard </Link>
        <Link to={"/admin/user"}>User</Link>
        <Link to={"/admin/book"}>Book </Link>
      </nav>
      {user === 'khoahoc'? <div className="listAdmin">
      <h1>List Admin</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <th>Name</th>
          <th>Avatar</th>
          <th>Created Date</th>
          <th>Email</th>
          <th>Action</th>
        </thead>
        <tbody>
          {admins.map((user) => {
            return (
              <tr key={user.username}>
                <td> <Link to={"/user/" + user.username} >{user.displayName}</Link></td>
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

                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => demoteUser(user.username)}
                  >
                    Demote User
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.username)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    
      <Pagination
        total={totalAdmins}
        defaultPageSize={sizePerPage}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} admins`
        }
        current={currentPageAdmin}
        onChange={(current) => {
          handlePageChangeAdmin(current);
        }}
      />
  </div>:""}
      <h1>List User</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <th>Name</th>
          <th>Avatar</th>
          <th>Created Date</th>
          <th>Email</th>
          <th>Action</th>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.username}>
                <td><Link to={"/user/" + user.username} >{user.displayName}</Link></td>
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

                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => promoteAdmin(user.username)}
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
            );
          })}
        </tbody>
      </table>
      <Pagination
        total={totalUsers}
        defaultPageSize={sizePerPage}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} users`
        }
        current={currentPageUser}
        onChange={(current) => {
          handlePageChangeUser(current);
        }}
      />

    </>
  );
};

export default ListUser;
