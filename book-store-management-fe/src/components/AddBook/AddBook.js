import "./AddBook.scss";
import { Link, Navigate } from "react-router-dom";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import React, { Component, useState } from "react";
import BookServices from "../../services/BookServices";
import Alert from "react-bootstrap/Alert";
import UserServices from "../../services/UserServices";
import api from "../../services/BaseAuthenticationServices";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: null,
      categories: [],
      title: "",
      description: "",
      pdfPath: null,
      coverPath: null,
      price: null,
      noSale: null,
      noView: null,
      authorName: "",
      selectedCategories: [],
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
      username : ""
    };

    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeAuthorNameHandler = this.changeAuthorNameHandler.bind(this);
    this.changePdfPathHandler = this.changePdfPathHandler.bind(this);
    this.changeCoverPathHandler = this.changeCoverPathHandler.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:6789/api/categories")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          categories: data,
        });
      });
  }

  handleCategoryChange = (event) => {
    this.setState({
      selectedCategories: Array.form(
        event.target.selectedCategories,
        (category) => category.value
      ),
      //    event.target.value,
    });
  };

  changeTitleHandler = (event) => {
    const inputTitle = event.target.value;
    const regex = /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹế\s_]+$/;
    
    if (!regex.test(inputTitle)) {
      this.setState({
        showErrorTitle: true,
        errorTitle: "Please just input characters and numbers",
      });
      return;
    }
    this.setState({
      showErrorTitle: false,
      errorTitle: "",
      title: event.target.value,
    });
  };

  changeAuthorNameHandler = (event) => {
    const inputAuthorName = event.target.value;
    const regex = /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹế\s_]+$/;
    if (!regex.test(inputAuthorName)) {
      this.setState({
        showErrorAuthorName: true,
        errorAuthorName: "Please just input characters and numbers",
      });
      return;
    }
    this.setState({
      showErrorAuthorName: false,
      errorAuthorName: "",
      authorName: inputAuthorName,
    });
  };

  changeDescriptionHandler = (event) => {
    const inputDescription = event.target.value;
    const regex = /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹế\s_]+$/;
    if (!regex.test(inputDescription)) {
      this.setState({
        showErrorDescription: true,
        errorDescription: "Please just input characters and numbers",
      });
      return;
    }
    this.setState({
      showErrorDescription: false,
      errorDescription: "",
      description: inputDescription,
    });
  };

  changePdfPathHandler = (event) => {
    const pdf = event.target.files[0];
    if (!pdf) {
      // alert("Please choose a file");
      this.setState({
        showErrorPdf: true,
        errorPdf: "Wrong file type (Please input PDF File) and less than 5MB",
        pdfPath: null,
      });
      return;
    }

    if (pdf.size > 1024 * 1024 * 5) {
      // alert("Please choose a file less than 5MB");
      this.setState({
        showErrorPdf: true,
        errorPdf: "Wrong file type (Please input PDF File) and less than 5MB",
        pdfPath: null,
      });
      return;
    }

    if (!pdf.type.includes("pdf")) {
      // alert("Please pdf file.");
      this.setState({
        showErrorPdf: true,
        errorPdf: "Wrong file type (Please input PDF File) and less than 5MB",
        pdfPath: null,
      });
      return;
    }

    if (!pdf.type === "application/pdf") {
      this.setState({
        showErrorPdf: true,
        errorPdf: "Wrong file type (Please input PDF File) and less than 5MB",
        pdfPath: null,
      });
      // alert("Please select a PDF file.");
      return;
    }

    this.setState({
      showErrorPdf: false,
      errorPdf: "",
      pdfPath: event.target.files[0],
    });
  };

  changeCoverPathHandler = (event) => {
    const cover = event.target.files[0];
    if (!cover) {
      // alert("Please choose a file");
      this.setState({
        showErrorCover: true,
        errorCover:
          "Wrong file type (Please input JPEG File) and less than 5MB",
        coverPath: null,
      });
      return;
    }

    if (cover.size > 1024 * 1024 * 5) {
      // alert("Please choose a file less than 5MB");
      this.setState({
        showErrorCover: true,
        errorCover:
          "Wrong file type (Please input JPEG File) and less than 5MB",
        coverPath: null,
      });
      return;
    }

    if (!cover.type.includes("image/jpeg")) {
      // alert("Please select an image file.");
      this.setState({
        showErrorCover: true,
        errorCover:
          "Wrong file type (Please input JPEG File) and less than 5MB",
        coverPath: null,
      });
      return;
    }

    this.setState({
      showErrorCover: false,
      errorCover: "",
      coverPath: cover,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      title,
      pdfPath,
      coverPath,
      price,
      noSale,
      noView,
      authorName,
      description,
      categories,
      selectedCategories,
      showErrorCover,
      showErrorPdf,
      showErrorTitle,
      showErrorAuthorName,
      showErrorDescription,
    } = this.state;


    const book = {
      title: title,
      authorName: authorName,
      //   pdfPath : pdfPath,
      //   coverPath : coverPath,
      price: price,
      noSale: noSale,
      noView: noView,
      description: description,
      categories: selectedCategories.map((category) => {
        return { categoryId: category.value, categoryName: category.label };
      }),
      //   selectedCategories: selectedCategories,
    };

    const createdBy = "123";

    const bookData = {
      book : book,
      createdBy : createdBy,
    }

    console.log(book.categories.length === 0);

    if(book.categories.length === 0){
      alert('Please choose category!!');
      return;
    }
    
    if (
      showErrorCover ||
      showErrorPdf ||
      showErrorTitle ||
      showErrorAuthorName ||
      showErrorDescription ||
      showErrorPdf ||
      showErrorCover
    ) {
      alert("Wrong input can not load data!!!");
      return;
    }

    let bookId = "";

    // fetch("http://localhost:6789/api/books/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(bookData),
    // })
    //   .then((response) => {
    //     response.json();
    //   })
    //   .then((data) => {
    //     this.setState({
    //       bookId: data.title,
    //     });
    //   });
  await api.post("api/books/add",bookData)
    .then((res) => {
      console.log(res.data.bookId);
      bookId = res.data.bookId;
      alert("Call API add successfully!");
      const formData1 = new FormData();
      formData1.append("coverPath", this.state.coverPath);
      formData1.append("bookId", res.data.bookId);
      BookServices.updateBookCover(formData1);
      const formData2 = new FormData();
      formData2.append("pdfPath", this.state.pdfPath);
      formData2.append("bookId", res.data.bookId);
      BookServices.updateBookpdf(formData2);
    }).catch((error) => {
      console.log(error);
      alert("Call API failed !")
    })
   
    // window.location.href = "http://localhost:3000/mybook";
  };

  render() {
    // const { categories, selectedCategories } = this.state;
    const {
      title,
      pdfPath,
      coverPath,
      price,
      noSale,
      noView,
      authorName,
      description,
      categories,
      selectedCategories,
      showErrorCover,
      showErrorPdf,
      showErrorTitle,
      showErrorAuthorName,
      showErrorDescription,
    } = this.state;
    return (
      <div>
        <div className="container">
          <form>
            <label>Title of Book:</label>
            <input
              type="text"
              value={this.state.title}
              name="title"
              onChange={this.changeTitleHandler}
              placeholder="Enter title"
              className="form-control"
              required
            />
            {showErrorTitle ? (
              <>
                <div style={{ height: "10px" }}></div>
                <Alert key={"danger"} variant={"danger"}>
                  {this.state.errorTitle}
                </Alert>
              </>
            ) : null}
            <br></br>
            <label>Author name of Book:</label>
            <input
              type="text"
              value={this.state.authorName}
              name="title"
              onChange={this.changeAuthorNameHandler}
              placeholder="Enter authorName"
              className="form-control"
              required
            />
            {showErrorAuthorName ? (
              <>
                <div style={{ height: "10px" }}></div>
                <Alert key={"danger"} variant={"danger"}>
                  {this.state.errorAuthorName}
                </Alert>
              </>
            ) : null}
            <br></br>

            <label>Description of Book:</label>
            <textarea
              value={this.state.description}
              name="title"
              onChange={this.changeDescriptionHandler}
              placeholder="Enter description"
              className="form-control"
              required
            />
            {showErrorDescription ? (
              <>
                <div style={{ height: "10px" }}></div>
                <Alert key={"danger"} variant={"danger"}>
                  {this.state.errorDescription}
                </Alert>
              </>
            ) : null}
            <br></br>
            <label>Category: </label>
            <Select
              isMulti
              options={categories.map((category) => ({
                value: category.categoryId,
                label: category.categoryName,
              }))}
              value={selectedCategories}
              onChange={(values) =>
                this.setState({
                  selectedCategories: values,
                })
              }
            />
            <br></br>
            <label>PDF of book</label>
            <input
              type="file"
              name="pdfPath"
              onChange={this.changePdfPathHandler}
              className="form-control"
              required
            ></input>
            {showErrorPdf ? (
              <>
                <div style={{ height: "10px" }}></div>
                <Alert key={"danger"} variant={"danger"}>
                  {this.state.errorPdf}
                </Alert>
              </>
            ) : null}
            <br></br>
            <label>Cover of book</label>
            <input
              type="file"
              name="pdfPath"
              onChange={this.changeCoverPathHandler}
              className="form-control"
              required
            ></input>
            <div style={{ height: "10px" }}></div>
            {showErrorCover ? (
              <>
                <div style={{ height: "10px" }}></div>
                <Alert key={"danger"} variant={"danger"}>
                  {this.state.errorCover}
                </Alert>
              </>
            ) : null}
            <br></br>
            <button className="btn btn-success" onClick={this.handleSubmit}>
              Add book
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddBook;
