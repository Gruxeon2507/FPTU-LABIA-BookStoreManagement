import React, { Component, useEffect, useState } from "react";
import Select from "react-select";
import BookServices from "../../services/BookServices";
import { useParams } from "react-router-dom";
import CategoryServices from "../../services/CategoryServices";
import Alert from "react-bootstrap/Alert";

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
    errorTitle: "",
    showErrorTitle: false,
    errorAuthorName: "",
    showErrorAuthorName: false,
    errorDescription: "",
    showErrorDescription: false,
    errorCategory: "",
    showErrorCategory: false,
    errorCover: "",
    showErrorCover: false,
    errorPdf: "",
    showErrorPdf: false,
  });
  const bookCategoryIds = book.categories.map(
    (category) => category.categoryId
  );
  console.log(bookId);
  useEffect(() => {
    BookServices.getABookById(bookId).then((res) => {
      setBook(res.data);
      setSelectedCategories(res.data.categories);
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
    const inputTitle = event.target.value;
    const regex =
      /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹế\s_]+$/;
    if (!regex.test(inputTitle)) {
      setBook({
        ...book,
        showErrorTitle: true,
        errorTitle: "Please just input characters and numbers",
        title: inputTitle,
      });
      return;
    }
    setBook({
      ...book,
      showErrorTitle: false,
      errorTitle: "",
      title: inputTitle,
    });
  };

  const changeAuthorNameHandler = (event) => {
    const inputAuthorName = event.target.value;
    const regex =
      /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹế\s_]+$/;
    if (!regex.test(inputAuthorName)) {
      setBook({
        ...book,
        showErrorAuthorName: true,
        errorAuthorName: "Please just input characters and numbers",
        authorName: inputAuthorName,
      });
      return;
    }
    setBook({
      ...book,
      showErrorAuthorName: false,
      errorAuthorName: "",
      authorName: inputAuthorName,
    });
  };

  const changeDescriptionHandler = (event) => {
    const inputDescription = event.target.value;
    const regex =
      /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹế\s_]+$/;
    if (!regex.test(inputDescription)) {
      setBook({
        ...book,
        showErrorDescription: true,
        errorDescription: "Please just input characters and numbers",
        description: inputDescription,
      });
      return;
    }
    setBook({
      ...book,
      showErrorDescription: false,
      errorDescription: "",
      description: inputDescription,
    });
  };
  const changeCoverHandler = (event) => {
    const cover = event.target.files[0];

    if (!cover) {
      alert("Please choose a file");
      setBook({
        ...book,
        showErrorCover: true,
        errorCover:
          "Wrong file type (Please input JPEG File) and less than 5MB",
        coverPath: null,
      });
      return;
    }

    if (cover.size > 1024 * 1024 * 5) {
      // alert("Please choose a file less than 5MB");
      setBook({
        ...book,
        showErrorCover: true,
        errorCover:
          "Wrong file type (Please input JPEG File) and less than 5MB",
        coverPath: null,
      });
      return;
    }

    if (!cover.type.includes("image/jpeg")) {
      // alert("Please select an image file.");
      setBook({
        ...book,
        showErrorCover: true,
        errorCover:
          "Wrong file type (Please input JPEG File) and less than 5MB",
        coverPath: null,
      });
      return;
    }

    setBook({
      ...book,
      showErrorCover: false,
      errorCover: "",
      coverPath: cover,
    });
  };
  const changePdfHandler = (event) => {
    const pdf = event.target.files[0];

    if (!pdf) {
      // alert("Please choose a file");
      setBook({
        ...book,
        showErrorPdf: true,
        errorPdf: "Wrong file type (Please input PDF File) and less than 5MB",
        pdfPath: null,
      });
      return;
    }

    if (pdf.size > 1024 * 1024 * 5) {
      // alert("Please choose a file less than 5MB");
      setBook({
        ...book,
        showErrorPdf: true,
        errorPdf: "Wrong file type (Please input PDF File) and less than 5MB",
        pdfPath: null,
      });
      return;
    }

    if (!pdf.type.includes("pdf")) {
      // alert("Please pdf file.");
      setBook({
        ...book,
        showErrorPdf: true,
        errorPdf: "Wrong file type (Please input PDF File) and less than 5MB",
        pdfPath: null,
      });
      return;
    }

    if (!pdf.type === "application/pdf") {
      setBook({
        ...book,
        showErrorPdf: true,
        errorPdf: "Wrong file type (Please input PDF File) and less than 5MB",
        pdfPath: null,
      });
      // alert("Please select a PDF file.");
      return;
    }
    setBook({
      ...book,
      showErrorPdf: false,
      errorPdf: "",
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
    if (selectedCategories.length != 0) {
      book.categories = categoryIds;
    }

    const checkcatego = options.filter((option) =>
      bookCategoryIds.includes(option.value)
    );
    console.log(checkcatego.length == 0);

    if ((checkcatego.length == 0) == true) {
      alert("Please choose category !!");
      return;
    }
    if (
      book.showErrorTitle ||
      book.showErrorAuthorName ||
      book.showErrorDescription ||
      book.showErrorCover ||
      book.showErrorPdf
    ) {
      alert("can not load data");
      return;
    }
    console.log(checkcatego.length == 0);
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
    window.location.href = "http://103.173.229.92:3000/mybook";
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
          {book.showErrorTitle ? (
            <>
              <div style={{ height: "10px" }}></div>
              <Alert key={"danger"} variant={"danger"}>
                {book.errorTitle}
              </Alert>
            </>
          ) : null}
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
          {book.showErrorAuthorName ? (
            <>
              <div style={{ height: "10px" }}></div>
              <Alert key={"danger"} variant={"danger"}>
                {book.errorAuthorName}
              </Alert>
            </>
          ) : null}
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
          {book.showErrorDescription ? (
            <>
              <div style={{ height: "10px" }}></div>
              <Alert key={"danger"} variant={"danger"}>
                {book.errorDescription}
              </Alert>
            </>
          ) : null}
          <br></br>
          <label>Category</label>
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
          {book.showErrorPdf ? (
            <>
              <div style={{ height: "10px" }}></div>
              <Alert key={"danger"} variant={"danger"}>
                {book.errorPdf}
              </Alert>
            </>
          ) : null}
          <br></br>
          <label>Cover of book</label>
          <input
            type="file"
            name="pdfPath"
            onChange={changeCoverHandler}
            className="form-control"
          ></input>
          {book.showErrorCover ? (
            <>
              <div style={{ height: "10px" }}></div>
              <Alert key={"danger"} variant={"danger"}>
                {book.errorCover}
              </Alert>
            </>
          ) : null}
          <br></br>
          <button className="btn btn--form">Update Book</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBook;
