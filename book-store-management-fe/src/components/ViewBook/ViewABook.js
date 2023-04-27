import React, { Component, useEffect, useState } from "react";
import "./ViewABook.scss";
import { Link, useParams } from "react-router-dom";
import BookServices from "../../services/BookServices";
import CategoryServices from "../../services/CategoryServices";

function ViewABook() {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    BookServices.getBookByBookId(bookId).then((res) => {
      setBook(res.data);
    });
    CategoryServices.getCategoryByBook(bookId).then((res) => {
      setCategories(res.data);
    });
  }, [bookId]);


  if (book.approved != undefined && book.approved) {
    return (
      <div className="container">
        <div className="meta-info">
          <div className="image left">
            <img
              src={"http://localhost:6789/api/books/cover/" + book.bookId}
              width={750}
              alt={book.title}
            ></img>
          </div>
          <div className="content right">
            <div className="header">
              <h3>{book.title}</h3>
              <h6>{book.authorName}</h6>
              {categories.map((category) => (
                <button className="category-btn" key={category.categoryId}>
                  <Link to={"http://localhost:3000/" + category.categoryId}>
                    {category.categoryName}
                  </Link>
                </button>
              ))}
            </div>
            <div className="body">
              <p className="desc">{book.description}</p>
              <button>
                <Link
                  to={"http://localhost:6789/api/books/pdf/" + book.bookId}
                  target="_blank"
                  x
                >
                  Read book
                </Link>
              </button>
              <button>View: {book.noView}</button>
            </div>
          </div>
        </div>
        <div className="pdf">
          <iframe
            src={"http://localhost:6789/api/books/pdf/" + book.bookId}
          ></iframe>
        </div>
      </div>
    );
  } else {
    return <p>Book not found.</p>;
  }
}

export default ViewABook;
