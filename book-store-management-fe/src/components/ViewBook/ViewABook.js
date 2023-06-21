import React, { useEffect, useState } from "react";
import "./ViewABook.scss";
import { Link, useParams } from "react-router-dom";
import BookServices from "../../services/BookServices";
import CategoryServices from "../../services/CategoryServices";
import axios from "axios";

function ViewABook() {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [categories, setCategories] = useState([]);
  const [coverImageUrl, setCoverImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookResponse = await BookServices.getBookByBookId(bookId);
        setBook(bookResponse.data);

        const categoriesResponse = await CategoryServices.getCategoryByBook(
          bookId
        );
        setCategories(categoriesResponse.data);

        await handleViewCoverBook();
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchData();
  }, [bookId]);

  const handleViewCoverBook = async () => {
    const urlApi = `http://localhost:6789/api/books/cover/${bookId}`;
    try {
      const response = await axios.post(
        `http://localhost:6789/api/books/executeApi`,
        {
          api: urlApi,
        },
        { responseType: "arraybuffer" }
      );
      const imageBlob = new Blob([response.data], { type: "image/jpeg" });
      setCoverImageUrl(URL.createObjectURL(imageBlob));
    } catch (error) {
      console.error("Error fetching cover image:", error);
    }
  };

  if (book.approved !== undefined && book.approved) {
    return (
      <div className="container-singlebook">
        <div className="meta-info">
          <div className="image left">
            {coverImageUrl ? (
              <img src={coverImageUrl} width={750} alt={book.title} />
            ) : (
              <div>Loading book cover...</div>
            )}
          </div>
          <div className="content right" style={{ marginRight: "30px" }}>
            <div className="header">
              <h3>{book.title}</h3>
              <h6>{book.authorName}</h6>
              {categories.map((category) => (
                <button className="category-btn" key={category.categoryId}>
                  <Link to={`http://localhost:3000/${category.categoryId}`}>
                    {category.categoryName}
                  </Link>
                </button>
              ))}
            </div>
            <div className="body">
              <p className="desc">{book.description}</p>
              <button>
                <Link
                  to={`http://localhost:6789/api/books/pdf/${book.bookId}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
            src={`http://localhost:6789/api/books/pdf/${book.bookId}`}
          ></iframe>
        </div>
      </div>
    );
  } else {
    return <p>Book not found.</p>;
  }
}

export default ViewABook;
