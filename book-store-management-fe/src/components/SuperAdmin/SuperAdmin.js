
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookServices from "../../services/BookServices";

const SuperAdmin = () => {
  const [unpublicBooks, setUnpublicBooks] = useState([]);
  const [userOfBooks, setUserOfBooks] = useState({});

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

  useEffect(() => {
    getSomeUnpublicBooks();
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
      <h2>Recent new book</h2>
      <table className="table table-bordered ">
        <thead>
          <th>Title</th>
          <th>Cover</th>
          <th>Author</th>
          <th>Description</th>
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
              <td>{book.description}</td>
              <td>{userOfBooks[book.bookId]}</td>
              <td>{book.approved?"":"Not yet"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SuperAdmin;
