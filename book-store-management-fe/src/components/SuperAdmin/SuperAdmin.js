import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookServices from "../../services/BookServices";
import UserServices from "../../services/UserServices";

const SuperAdmin = () => {
  const [unpublicBooks, setUnpublicBooks] = useState([]);
  const [userOfBooks, setUserOfBooks] = useState({});
  const [recentCreatedUsers, setRecentCreatedUsers] = useState([]);

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
    UserServices.getSomeRecentCreatedUser().then((response) => {
      setRecentCreatedUsers(response.data);
    });
  };
  useEffect(() => {
    getSomeUnpublicBooks();
  }, []);
  useEffect(() => {
    getSomeRecentCreatedUsers();
  }, []);

  useEffect(() => {
    unpublicBooks.forEach((book) => {
      getUserOfBook(book.bookId);
    });
  }, [unpublicBooks]);

  return (
    <>
      <div>
        <Link to={"/superadmin"}>Darboard </Link>
        <Link to={"/admin/user"}>User</Link>
        <Link to={"/admin/book"}>Book </Link>
      </div>
      <h2>Recent new admin</h2>
      <table className="table table-bordered ">
        <thead>
          <th>Name</th>
          <th>Avatar</th>
          <th>Created Date</th>
          <th>Email</th>
          <th>Dob</th>
          <th>Action</th>
        </thead>
        <tbody>
          {recentCreatedUsers.map((user) =>
            user.roles.map((role) =>
            role.roleId === 2 ?  (
                    <tr key={user.username}>
                      <td>{user.displayName}</td>
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
                      <td>{user.dob}</td>
                      <td></td>
                    </tr>
                  ) : (
                    ""
                  )
            )
            
          )}
        </tbody>
      </table>
      <h2>Recent new user</h2>
      <table className="table table-bordered ">
        <thead>
          <th>Name</th>
          <th>Avatar</th>
          <th>Created Date</th>
          <th>Email</th>
          <th>Dob</th>
          <th>Action</th>
        </thead>
        <tbody>
          {recentCreatedUsers.map((user) =>
            user.roles.length === 1
              ? user.roles.map((role) =>
                  role.roleId === 3 ? (
                    <tr key={user.username}>
                      <td>{user.displayName}</td>
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
                      <td>{user.dob}</td>
                      <td></td>
                    </tr>
                  ) : (
                    ""
                  )
                )
              : ""

            // <tr key={user.username}>
            //   <td>{user.displayName}</td>
            //   <td>
            //     <img
            //       src={"http://localhost:6789/api/users/avatar/" + user.username}
            //       style={{ width: 40 }}
            //       alt=""
            //     />
            //   </td>
            //   <td>{user.createDate}</td>
            //   <td>{user.email}</td>
            //   <td>{user.dob}</td>
            //   <td></td>
            // </tr>
          )}
        </tbody>
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
                  src={"http://localhost:6789/api/books/cover/" + book.bookId}
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

export default SuperAdmin;
