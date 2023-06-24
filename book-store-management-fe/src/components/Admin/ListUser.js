import React, { useEffect, useState } from "react";
import UserServices from "../../services/UserServices";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0); // total number of users
  const sizePerPage = 5;
<<<<<<< HEAD
  const [currentPageUser, setCurrentPageUser] = useState(1); //indicates which page is currently on
=======
  const [currentPageUser, setCurrentPageUser] = useState(1);
>>>>>>> refs/remotes/origin/main

  const countUser = UserServices.countUser().then((response) => {
    setTotalUsers(response.data);
  });

  const getOnlyUser = (current, sizePerPage) => {
    // console.log("getOnlyUser function called");

    UserServices.getOnlyUser(current, sizePerPage)
      .then((response) => {
        if (response.data.length != 0) {
          setUsers(response.data);
        }
      })
      .catch((error) => {
        console.log("error getting user of page: " + error);
      });
  };

  useEffect(() => {
    getOnlyUser(0, sizePerPage);
  }, []);

  const deleteUser = (username) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    console.log(username);
    if (confirmed) {
      UserServices.deleteUser(username).then((response) => {
        getOnlyUser(0, sizePerPage);
      });
    }
  };

  const handlePageChangeUser = (current) => {
    setCurrentPageUser(current);
    getOnlyUser(current - 1, sizePerPage);
  };

  return (
    <>
      <nav className="admin-nav">
        <Link to={"/admin"}>Dashboard </Link>
        <Link to={"/admin/user"}>User</Link>
        <Link to={"/admin/book"}>Book </Link>
      </nav>
      <button
        className="btn btn-info"
        onClick={() => UserServices.exportUserToExcel()}
      >
        Export to excel
      </button>

      <h1>List User</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <th>Name</th>
          <th>Avatar</th>
          <th>Created Date</th>
          <th>Email</th>
          <th>Action</th>
        </thead>
        {users.length > 0 ? (
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.username}>
                  <td>
                    <Link to={"/user/" + user.username}>
                      {user.displayName}
                    </Link>
                  </td>
                  <td>
                    <img
                      src={
                        "http://localhost:6789/api/users/avatar/" +
                        user.username
                      }
                      style={{ width: 40 }}
                      alt=""
                    />
                  </td>
                  <td>{user.createDate}</td>
                  <td>{user.email}</td>

                  <td>
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
        ) : (
          ""
        )}
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
