import "./AddBook.scss";
import { Link, Navigate } from "react-router-dom";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import React, { Component } from "react";
import BookServices from "../../services/BookServices";
import Alert from 'react-bootstrap/Alert';

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
      error: "",
      showError : false
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
    this.setState({
      title: event.target.value,
    });
  };

  changeAuthorNameHandler = (event) => {
    this.setState({
      authorName: event.target.value,
    });
  };

  changeDescriptionHandler = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  changePdfPathHandler = (event) => {
    this.setState({
      pdfPath: event.target.files[0],
    });
  };

  changeCoverPathHandler = (event) => {
    const cover = event.target.files[0];

    if (!cover) {
      alert("Please choose a file");
      this.setState({
        showError : true,
        error: "Wrong input",
        coverPath: null,
      });
      return;
    }

    if (cover.size > 1024 * 1024 * 5) {
      alert("Please choose a file less than 5MB");
      this.setState({
        showError : true,
        error: "Wrong input",
        coverPath: null,
      });
      return;
    }

    if (!cover.type.includes("image/")) {
      alert("Please select an image file.");
      this.setState({
        showError : true,
        error: "Wrong input",
        coverPath: null,
      });
      return;
    }
    if (!cover.endswith(".jpg")) {
      alert("Please choose a file .jpg");
      this.setState({
        showError : true,
        error: "Wrong input",
        coverPath: null,
      });
      return;
    }
    this.setState({
      showError : true,
      error: "Wrong input",
      coverPath: cover,
    });
  };

  handleSubmit = (event) => {
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

    const bookId = null;

    fetch("http://localhost:6789/api/books/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        this.setState({
          bookId: data.title,
        });
      });
    const formData = new FormData();
    formData.append("coverPath", this.state.coverPath);
    formData.append("pdfPath", this.state.pdfPath);
    formData.append("bookId", this.state.bookId);
    BookServices.updateBookCover(formData);
    BookServices.updateBookpdf(formData);
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
      showError
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
            <br></br>
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
            <div className="error">{this.state.error}</div>
            <br></br>
            <label>Cover of book</label>
            <input
              type="file"
              name="pdfPath"
              onChange={this.changeCoverPathHandler}
              className="form-control"
              required
            ></input>
            <div style={{height : "50px"}}></div>
            {showError ? <Alert key={'danger'} variant={'danger'}>
              This is a {this.state.error} alert—check it out!
            </Alert> : null}
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
