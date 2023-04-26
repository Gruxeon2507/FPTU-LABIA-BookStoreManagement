import React, { Component, useEffect, useState } from "react";
import UserServices from "../../services/UserServices";
import "./UserProfile.scss";
import BookServices from "../../services/BookServices";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [books, setBooks] = useState([]);

  useEffect(() => {
    UserServices.getUserByUserName(userId).then((res) => {
      setUser(res.data);
    });
    BookServices.getBookByUser(userId).then((res) => {
      setBooks(res.data);
    });
  }, [userId]);

  function deleteBook(bookId) {
    BookServices.deleteBook(bookId);
  }

  return (
    <div className="container">
      <div className="avatar">
        <img
          src={`http://localhost:6789/api/users/avatar/${user.username}`}
          alt={user.username}
        />
        <p className="displayName">{user.displayName}</p>
      </div>
      <div className="userInfo">
        <p>Gmail: {user.email}</p>
        <p>Dob: {user.dob}</p>
        <p>Day Joined: {user.createDate}</p>
        <p>Last Active: {user.lastActive}</p>
      </div>
      <div className="userBooks">
        {books.map((book) => (
          <div className="singleBook">
            <div className="bookCover">
              <img
                src={"http://localhost:6789/api/books/cover/" + book.bookId}
                width={200}
              ></img>
            </div>
            <div className="bookContent">
              <div className="bookTitle">
                <p>{book.title}</p>
              </div>
              <p>Tác giả: {book.authorName}</p>
              <p>Lượt xem: {book.noView}</p>
              <div className="row">
                <Link to={"/book/update/" + book.bookId}>
                  <button className="btn btn-success">Update</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => {BookServices.deleteBook(book.bookId);
                  window.location.href = ""}}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
