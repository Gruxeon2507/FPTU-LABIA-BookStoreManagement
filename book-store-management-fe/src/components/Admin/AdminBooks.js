import React, { useState, useEffect } from "react";
import UserServices from "../../services/UserServices";
import BookServices from "../../services/BookServices";
import { Link } from "react-router-dom";
import { Button, Pagination } from "antd";

const AdminBooks = () => {
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [pagePendingBooks, setPagePendingBooks] = useState([]);
  const [pagePublicBooks, setPagePublicBooks] = useState([]);
  const [noPendingBooks, setNoPendingBooks] = useState([]);
  const [noPublicBooks, setNoPublicBooks] = useState([]);

  // pending books of current page
  const getPagePendingBooks = (pageNumber, pageSize) => {
    BookServices.getPagePendingBooks(pageNumber, pageSize).then((res) => {
      setPagePendingBooks(res.data);
    });
  };

  // public books of current page
  const getPagePublicBooks = (pageNumber, pageSize) => {
    BookServices.getPagePublicBooks(pageNumber, pageSize).then((res) => {
      setPagePublicBooks(res.data);
    });
  };

  // total number of pending books
  const getNoPendingBooks = () => {
    return BookServices.getPendingBooks().then((res) => {
      return res.data.length;
    });
  };

  // total number of public books
  const getNoPublicBooks = () => {
    return BookServices.getPublicBooks().then((res) => {
      return res.data.length;
    });
  };

  const handleChangePublic = (current) => {
    getPagePublicBooks(current - 1, pageSize);
    setCurrentPage(current);
  };
  const handleChangePending = (current) => {
    getPagePendingBooks(current - 1, pageSize);
    setCurrentPage(current);
  };

  useEffect(() => {
    getNoPendingBooks().then((res) => {
      setNoPendingBooks(res);
    });
    getNoPublicBooks().then((res) => {
      setNoPublicBooks(res);
    });

    getPagePendingBooks(0, pageSize);
    getPagePublicBooks(0, pageSize);
  }, []);

  pagePendingBooks.map((book) => {
    UserServices.getUserByBookId(book.bookId).then((res) => {
      book.addedBy = res.data.displayName;
    });
  });

  const approveBook = (bookId) => {
    BookServices.approveBook(bookId);
    window.location.href = "";
  };
  // console.log(book.addedBy);
  const deleteBook = (bookId) => {
    BookServices.deleteBook(bookId);
    window.location.href = "";
  };

  return (
    <>
      <div className="pending-book">
        <h1>Pending Books</h1>
        <table className="table table-bordered table-striped">
          <thead>
            <th>Name</th>
            <th>Author</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Added by</th>
            <th>Action</th>
          </thead>
          <tbody>
            {pagePendingBooks.map((book) => (
              <tr key={book.bookId}>
                <td className="align-middle">{book.title}</td>
                <td className="align-middle">{book.authorName}</td>
                <td className="align-middle">
                  <img
                    src={"http://localhost:6789/api/books/cover/" + book.bookId}
                    height={300}
                    width={"auto"}
                    alt={book.title}
                  ></img>
                  <br />
                  <button className="btn btn-warning">
                    <Link
                      to={"http://localhost:6789/api/books/pdf/" + book.bookId}
                      target="_blank"
                    >
                      View PDF
                    </Link>
                  </button>
                </td>
                <td className="align-middle">{book.title}</td>
                <td className="align-middle text-start">{book.description}</td>
                <td className="align-middle text-start">
                  <Button>
                    <Link to={"http://localhost:3000/user/" + book.coverPath}>
                      {book.pdfPath}
                    </Link>
                  </Button>
                </td>
                <td className="align-middle">
                  <button
                    className="btn btn-success"
                    onClick={() => approveBook(book.bookId)}
                  >
                    Approve
                  </button>
                  <br />
                  <br />
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteBook(book.bookId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        total={noPendingBooks}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        defaultPageSize={pageSize}
        current={currentPage}
        onChange={(current) => {
          handleChangePending(current);
        }}
      />

      <div className="public-book">
        <h1>Public Books</h1>
        <table className="table table-bordered table-striped">
          <thead>
            <th>Name</th>
            <th>Author</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Added by</th>
            <th>Action</th>
          </thead>
          <tbody>
            {/* {console.log(pagePublicBooks)} */}
            {pagePublicBooks.map((book) => (
              <tr key={book.bookId}>
                {console.log(book.addedBy)}
                <td className="align-middle">{book.title}</td>
                <td className="align-middle">{book.authorName}</td>
                <td className="align-middle">
                  <img
                    src={"http://localhost:6789/api/books/cover/" + book.bookId}
                    height={300}
                    width={"auto"}
                    alt={book.title}
                  ></img>
                  <br />
                  <button className="btn btn-warning">
                    <Link
                      to={"http://localhost:6789/api/books/pdf/" + book.bookId}
                      target="_blank"
                    >
                      View PDF
                    </Link>
                  </button>
                </td>
                <td className="align-middle">{book.title}</td>
                <td className="align-middle text-start">{book.description}</td>
                <td className="align-middle text-start">
                  <Button>
                    <Link to={"http://localhost:3000/user/" + book.coverPath}>
                      {book.pdfPath}
                    </Link>
                  </Button>
                </td>
                <td className="align-middle">
                  <br />
                  <br />
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteBook(book.bookId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        total={noPublicBooks}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        defaultPageSize={pageSize}
        current={currentPage}
        onChange={(current) => {
          handleChangePublic(current);
        }}
      />
    </>
  );
};

export default AdminBooks;
