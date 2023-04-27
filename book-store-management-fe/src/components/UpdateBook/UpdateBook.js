import React, { Component, useEffect, useState } from "react";
import Select from "react-select";
import BookServices from "../../services/BookServices";
import { useParams } from "react-router-dom";
import CategoryServices from "../../services/CategoryServices";

function UpdateBook(props) {
  const { bookId } = useParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [book, setBook] = useState({
    title: "",
    authorName: "",
    description: "",
    categories: [],
    coverPath: null,
    pdfPath: null,
  });
  const bookCategoryIds = book.categories.map(
    (category) => category.categoryId
  );
  console.log(bookId);
  useEffect(() => {
    BookServices.getABookById(bookId).then((res) => {
      setBook(res.data);
    });
    CategoryServices.getAllCategories().then((res) => {
      setAllCategories(res.data);
    });
  }, [bookId]);
  const options = allCategories.map((category) => ({
    value: category.categoryId,
    label: category.categoryName,
  }));

  const changeTitleHandler = (event) => {
    setBook({
      ...book,
      title: event.target.value,
    });
  };

  const changeAuthorNameHandler = (event) => {
    setBook({
      ...book,
      authorName: event.target.value,
    });
  };

  const changeDescriptionHandler = (event) => {
    setBook({
      ...book,
      description: event.target.value,
    });
  };
  const changeCoverHandler = (event) => {
    const cover = event.target.files[0];


    if (!cover) {
      alert('Please choose a file');
      return;
    }

    if (cover.size > 1024 * 1024 * 5) {
      alert('Please choose a file less than 5MB');
      return;
    }

    if (!cover.type.includes("image/")) {
      alert('Please select an image file.');
      return;
    }

    setBook({
      ...book,
      coverPath: cover,
    });
  };
  const changePdfHandler = (event) => {
    const pdf = event.target.files[0];
    setBook({
      ...book,
      pdfPath: pdf,
    });
  };

  const handleCategoryChange = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
    setBook({
      ...book,
      categories: selectedCategories.map((category) => ({
        categoryId: category.value,
        categoryName: category.label,
      })),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const formData = new FormData();
    // formData.append("title", book.title);
    // formData.append("authorName", book.authorName);
    // formData.append("description", book.description);
    const categoryIds = selectedCategories.map((category) => {
      return { categoryId: category.value, categoryName: category.label };
    });
    book.categories = categoryIds;
    // formData.append("categories",categoryIds);

    BookServices.updateBook(bookId, book)
      .then((res) => {
        // handle success
        console.log(res.data);
      })
      .catch((err) => {
        // handle error
        console.error(err);
      });

    const formData = new FormData();
    formData.append("pdfPath", book.pdfPath);
    formData.append("coverPath", book.coverPath);
    formData.append("bookId", bookId);
    BookServices.updateNewBookCover(formData, bookId);
    BookServices.updateNewBookPdf(formData, bookId);

  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>Title of Book:</label>
          <input
            type="text"
            value={book.title}
            name="title"
            onChange={changeTitleHandler}
            placeholder="Enter title"
            className="form-control"
            required
          />
          <br></br>
          <label>Author name of Book:</label>
          <input
            type="text"
            value={book.authorName}
            name="title"
            onChange={changeAuthorNameHandler}
            placeholder="Enter authorName"
            className="form-control"
            required
          />
          <br></br>

          <label>Description of Book:</label>
          <textarea
            value={book.description}
            name="title"
            onChange={changeDescriptionHandler}
            placeholder="Enter description"
            className="form-control"
            required
          />
          <br></br>
          <Select
            isMulti
            options={options}
            value={options.filter((option) =>
              bookCategoryIds.includes(option.value)
            )}
            onChange={handleCategoryChange}
          />
          <br></br>
          <label>PDF of book</label>
          <input
            type="file"
            name="pdfPath"
            onChange={changePdfHandler}
            className="form-control"
          ></input>
          <br></br>
          <label>Cover of book</label>
          <input
            type="file"
            name="pdfPath"
            onChange={changeCoverHandler}
            className="form-control"
          ></input>
          <br></br>
          <button className="btn btn--form">Update Book</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBook;
