import React, { Component } from "react";
import BookServices from "../services/BookServices";

class ListBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            books: [],
            pdf: []
        }
    }

    componentDidMount(){
        BookServices.getBook().then((res) => {
            this.setState({books:res.data})
        })
    }
    render(){
        return(
            <div>
                <h2 className="title">Book List</h2>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>bookId</th>
                                <th >title</th>
                                <th>pdfPath</th>
                                <th>coverPath</th>
                                <th>price</th>
                                <th>noSale</th>
                                <th>noView</th>
                                <th>categories</th>
                                <th>approved</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.books.map(
                                    book =>
                                    <tr>
                                        <td>{book.bookId}</td>
                                        <td>{book.title}</td>
                                        <td>

                                            <a href={"http://localhost:6789/api/books/pdf/"+book.bookId}>{book.pdfPath}</a>
                                        </td>
                                        <td><img src={"http://localhost:6789/api/books/cover/"+book.bookId} width={100}></img></td>
                                        <td>{book.price}</td>
                                        <td>{book.noSale}</td>
                                        <td>{book.noView}</td>
                                        <td>{book.categories.map(
                                            category => <p>{category.categoryName}</p>
                                        )}</td>
                                        <td>{book.approved ? 'yes':'no'}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListBook