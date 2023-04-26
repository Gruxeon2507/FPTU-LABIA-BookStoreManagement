import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookServices from "../../services/BookServices";
import "./ListBook.scss";
import CategoryServices from "../../services/CategoryServices";
import { Pagination } from "antd";
import { Card } from "react-bootstrap";
import { Button, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faList } from "@fortawesome/free-solid-svg-icons";

function ListBook() {
  const [pageBooks, setPageBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [condition, setCondition] = useState("");

  const getAllPublicBooks = () => {
    return BookServices.getAllPublicBooks()
      .then((response) => {
        console.log(response);
        return response.data.length;
      })
      .catch((error) => {
        console.log(error);
        return 0;
      });
  };

  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    getAllPublicBooks().then((count) => setTotalItems(count));
  }, []);

  const [categories, setCategories] = useState([]);
  const sizePerPage = 12;

  const getAllCategories = () => {
    CategoryServices.getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPageBooks = (pageNumber, pageSize) => {
    BookServices.getPageBooks(pageNumber, pageSize)
      .then((response) => {
        setPageBooks(response.data);
      })
      .catch((error) => {
        console.log("loi lay ra page book");
        console.log(error);
      });
  };

  const findCondition = () => {
    setCondition(condition);
    console.log(
      "da click" + encodeURIComponent(condition).replace(/%20/g, "%20")
    );
    filterBook(
      0,
      sizePerPage,
      encodeURIComponent(condition).replace(/%20/g, "%20")
    );
  };
  const handleReset = () => {
    setCondition("");
    getPageBooks(0, sizePerPage);
    getAllPublicBooks().then((count) => setTotalItems(count));
  };
  const filterBook = (pageNumber, pageSize, searchText) =>
    BookServices.filterBook(pageNumber, pageSize, searchText).then(
      (response) => {
        setPageBooks(response.data.content);
        setTotalItems(response.data.totalElements);
      }
    );
  useEffect(() => {
    filterBook(
      0,
      sizePerPage,
      encodeURIComponent(condition).replace(/%20/g, "%20")
    );
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);
  useEffect(() => {
    getPageBooks(0, sizePerPage);
  }, []);

  const handlePageChange = (current) => {
    if (checked.length > 0) {
      setCurrentPage(current);
      console.log("current" + current);
      getPageBooksByCategories(checked.join(","), current - 1, sizePerPage);
    } else {
      setCurrentPage(current);
      getPageBooks(current - 1, sizePerPage);
    }
  };

  const [checked, setChecked] = useState([]);
  console.log(checked);
  const handleCheck = (categoryId) => {
    setChecked((prev) => {
      const isChecked = checked.includes(categoryId);
      if (isChecked) {
        //Uncheck
        return checked.filter((item) => item !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const getPageBooksByCategories = (categoryIds, pageNumber, pageSize) => {
    BookServices.getPageBooksByCategories(categoryIds, pageNumber, pageSize)
      .then((response) => {
        setPageBooks(response.data);
        console.log("response" + response.data);
      })
      .catch((error) => {
        console.log("loi lay ra page book");
        console.log(error);
      });
  };

  const getBooksByCategories = (categoryIds) => {
    BookServices.getBooksByCategories(categoryIds)
      .then((response) => {
        setTotalPages(response.data.length);
      })
      .catch((error) => {
        console.log("loi lay ra number page book");
        console.log(error);
      });
  };
  console.log("total page: " + totalItems);

  const handleSubmit = () => {
    setCurrentPage(1);
    console.log({ ids: checked });
    const categoryIds = checked.join(",");
    console.log(categoryIds);
    getPageBooksByCategories(categoryIds, 0, sizePerPage);
    getBooksByCategories(categoryIds);
  };

  return (
    <>
      <div className="find d-flex justify-content-center">
        <div className="itemSearch">
          <Button
            size="sm"
            variant="outline-info"
            type="button"
            onClick={handleReset}
          >
            <FontAwesomeIcon icon={faList} />
          </Button>
        </div>
        {/* <div className="itemSearch"> */}
          <FormControl
            placeholder="Search"
            name="search"
            className={"info-border bg-dark text-white w-50 "}
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          />
        {/* </div> */}
        <div className="itemSearch">
          <Button
            size="sm"
            variant="outline-info"
            type="button"
            onClick={findCondition}
          >
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </div>
        <div className="itemSearch">
          <Button
            size="sm"
            variant="outline-danger"
            type="button"
            onClick={() => handleReset()}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
      </div>

      <div className="categories row">
        {categories.map((category) => (
          <div className="select col-6 col-md-3 col-sm-4 d-flex ">
            <label key={category.categoryId}>
              <input
                type="checkbox"
                className="form-check-input w-20 h-20 ms-1 me-1"
                checked={checked.includes(category.categoryId)}
                onChange={() => handleCheck(category.categoryId)}
              />
              {category.categoryName}
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="btn btn-success">
        Submit
      </button>

      <div className="list-books row">
        {pageBooks.map((book) => (
          <div
            key={book.bookId}
            className={
              book.bookId + " col-lg-3 col-md-4 col-sm-6 col-xs-12 book"
            }
          >
            <Card className="card" style={{ width: "18rem" }}>
              <div className="cover">
                <Card.Img
                  variant="top"
                  src={"http://localhost:6789/api/books/cover/" + book.bookId}
                />
              </div>
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.authorName}</Card.Text>
                <Card.Text>{book.price}</Card.Text>
                <Link to={"/book/view/" + book.bookId} className="btn btn-info">
                  View{" "}
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Pagination
        total={totalItems}
        defaultPageSize={sizePerPage}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        current={currentPage}
        onChange={(current) => {
          handlePageChange(current);
        }}
      />
    </>
  );
}

export default ListBook;
