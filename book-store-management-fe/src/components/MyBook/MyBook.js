import React, { useState, useEffect } from "react";
import UserServices from "../../services/UserServices";
import BookServices from "../../services/BookServices";
import { Link } from "react-router-dom";
import { Button, Pagination } from "antd";

const MyBook = () => {
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [pagePendingBooks, setPagePendingBooks] = useState([]);
  const [pagePublicBooks, setPagePublicBooks] = useState([]);
  const [noPagePublicBooks, setNoPagePublicBooks] = useState([]);
  const [noPagePendingBooks, setNoPagePendingBooks] = useState([]);

  const username = window.localStorage.getItem('user');

  // pending books of current page
  const getPagePendingBooks = (pageNumber, pageSize) => {
    
    BookServices.getUnPublicBookByUsernamePage(username, pageNumber, pageSize).then((res) => {
      setPagePendingBooks(res.data.content);
      setNoPagePendingBooks(res.data.totalElements)
    });
  };

  // public books of current page
  const getPagePublicBooks = (pageNumber, pageSize) => {
    BookServices.getPublicBookByUsernamePage(username,pageNumber, pageSize).then((res) => {
      setPagePublicBooks(res.data.content);
      setNoPagePublicBooks(res.data.totalElements)
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
    getPagePendingBooks(0, pageSize);

    getPagePublicBooks(0, pageSize);
  }, []);



  const deleteBook = (bookId) => {
    BookServices.deleteBook(bookId);
    window.location.href = "";
  };

  return (
    <>
    <div>
    <Button className='sign-in btn--form' style={{marginTop:"30px"}}><Link to="/book/add">Add A New Book</Link></Button>
    </div>
      <div className="pending-book">
        <h1>Pending Books</h1>
        <table className="table table-bordered table-striped">
          <thead>
            <th>Title</th>
            <th>Author</th>
            <th>Image</th>
            <th>Description</th>
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
                <td className="align-middle text-start">{book.description}</td>               
                <td className="align-middle">
                  <button className="btn btn-success"                   
                  >
                    <Link
                      to={"http://localhost:3000/book/update/" + book.bookId}
                      target="_blank"
                    >
                      Update
                    </Link>
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
        total={noPagePendingBooks}
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
            <th>Title</th>
            <th>Author</th>
            <th>Image</th>
            <th>Description</th>
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
                <td className="align-middle text-start">{book.description}</td>
            
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        total={noPagePublicBooks}
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

export default MyBook;