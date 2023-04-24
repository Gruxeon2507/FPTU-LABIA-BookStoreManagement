import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookServices from "../../services/BookServices";
import "./ListBook.scss";
import Card from "react-bootstrap/Card";
import CategoryServices from "../../services/CategoryServices";
import { Pagination } from "antd";

function ListBook() {
  const [pageBooks, setPageBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getAllPublicBooks().then((count) => setTotalPages(count));
  }, []);

  const [categories, setCategories] = useState([]);
  const sizePerPage = 4;

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


  useEffect(() => {
    getAllCategories();
  }, []);
  useEffect(() => {
    getPageBooks(0, sizePerPage);
  }, []);

  const handlePageChange = (current) => {
    if(checked.length>0){
      setCurrentPage(current);     
      console.log("current" + current);
      getPageBooksByCategories(checked.join(','),current - 1, sizePerPage);
    }else{
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

  const getPageBooksByCategories = (categoryIds, pageNumber, pageSize ) => {
    BookServices.getPageBooksByCategories(categoryIds, pageNumber, pageSize)
      .then((response) => {
          setPageBooks(response.data);
          console.log("response"+response.data);

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
  console.log("total page: " + totalPages);

  const handleSubmit = () => {
    setCurrentPage(1);     
    console.log({ ids: checked });
    const categoryIds = checked.join(",");
    console.log(categoryIds);
    getPageBooksByCategories(categoryIds,0,sizePerPage);
    getBooksByCategories(categoryIds)
  };

  return (
    <>
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
      <button onClick={handleSubmit}>Submit</button>

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
                <Link to={"/book/view/" + book.bookId} className="btn btn-info">
                  View{" "}
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Pagination
        total={totalPages}
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
