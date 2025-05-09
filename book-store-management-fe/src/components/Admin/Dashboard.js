import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookServices from "../../services/BookServices";
import UserServices from "../../services/UserServices";

const Dashboard = () => {
  const [unpublicBooks, setUnpublicBooks] = useState([]);
  const [userOfBooks, setUserOfBooks] = useState({});
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const user = window.localStorage.getItem("user");
  const getSomeUnpublicBooks = () => {
    BookServices.getSomeUnpublicBooks().then((response) => {
      setUnpublicBooks(response.data);
    });
  };

  const getUserOfBook = (bookId) => {
    BookServices.getUserOfBook(bookId).then((response) => {
      setUserOfBooks((prevUserOfBooks) => ({
        ...prevUserOfBooks,
        [bookId]: response.data.displayName,
      }));
    });
  };

  const getSomeRecentCreatedUsers = () => {
    UserServices.getOnlyUser(0, 5).then((response) => {
      if (response.data.length != 0) {
        setUsers(response.data);
      } else {
        console.log("Cant get users");
      }
    });
  };
  const getSomeRecentCreatedAdmins = () => {
    UserServices.getOnlyAdmin(0, 5).then((response) => {
      if (response.data.length != 0) {
        setAdmins(response.data);
      } else {
        console.log("Cant get admins");
      }
    });
  };
  useEffect(() => {
    getSomeUnpublicBooks();
  }, []);
  useEffect(() => {
    getSomeRecentCreatedUsers();
  }, []);
  useEffect(() => {
    getSomeRecentCreatedAdmins();
  }, []);

  useEffect(() => {
    unpublicBooks.forEach((book) => {
      getUserOfBook(book.bookId);
    });
  }, [unpublicBooks]);

  return (
    <>
      <nav className="admin-nav">
        <Link to={"/admin"}>Dashboard </Link>
        <Link to={"/admin/user"}>User</Link>
        <Link to={"/admin/book"}>Book </Link>
      </nav>
      {window.localStorage.getItem("role") === "Super Admin" ? (
        <div className="listAdmin">
          <h2>Recent new admin</h2>
          <table className="table table-bordered table-striped">
            <thead>
              <th>Name</th>
              <th>Avatar</th>
              <th>Created Date</th>
              <th>Email</th>
              {/* <th>Action</th> */}
            </thead>
            <tbody>
              {admins.map((user) => {
                return (
                  <tr key={user.username}>
                    <td>{user.displayName}</td>
                    <td>
                      <img
                        src={
                          "http://103.173.229.92:6789/api/users/avatar/" +
                          user.username
                        }
                        style={{ width: 40 }}
                        alt=""
                      />
                    </td>
                    <td>{user.createDate}</td>
                    <td>{user.email}</td>
                    {/* <td></td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
      

      <h2>Recent new user</h2>
      <table className="table table-bordered table-striped ">
        <thead>
          <th>Name</th>
          <th>Avatar</th>
          <th>Created Date</th>
          <th>Email</th>
          {/* <th>Action</th> */}
        </thead>
        {users.length > 0?         <tbody>
          {users.map((user) => {
            return <tr key={user.username}>
              <td>{user.displayName}</td>
              <td>
                <img
                  src={
                    "http://103.173.229.92:6789/api/users/avatar/" + user.username
                  }
                  style={{ width: 40 }}
                  alt=""
                />
              </td>
              <td>{user.createDate}</td>
              <td>{user.email}</td>
            </tr>
          })}
        </tbody>:""}

      </table>
      <h2>Recent new book</h2>
      <table className="table table-bordered ">
        <thead>
          <th>Title</th>
          <th>Cover</th>
          <th>Author</th>
          <th>CreatedBy</th>
          <th>isApproved</th>
        </thead>
        <tbody>
          {unpublicBooks.map((book) => (
            <tr key={book.bookId}>
              <td>{book.title}</td>
              <td>
                <img
                  src={"http://103.173.229.92:6789/api/books/cover/" + book.bookId}
                  style={{ width: 40 }}
                  alt=""
                />
              </td>
              <td>{book.authorName}</td>
              <td>{userOfBooks[book.bookId]}</td>
              <td>{book.approved ? "" : "Not yet"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Dashboard;
