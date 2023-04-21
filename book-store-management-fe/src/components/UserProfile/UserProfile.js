import React, { Component } from "react";
import UserServices from "../../services/UserServices";
import "./UserProfile.scss"
import BookServices from "../../services/BookServices";
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            books: [],

        };
    }

    componentDidMount() {
        UserServices.getUserByUserName("duckm").then((res) => {
            this.setState({ user: res.data });
        });
        BookServices.getBookByUser("duckm").then((res) => {
            this.setState({ books: res.data });
        });
    }

    render() {
        const { user } = this.state;
        return (
            <div className="container">
                <div className="avatar">
                    <img src={`http://localhost:6789/api/users/avatar/${user.username}`} alt={user.username} />
                    <p className="displayName">{user.displayName}</p>
                </div>
                <div className="userInfo">
                    <p>Gmail: {user.email}</p>
                    <p>Dob: {user.dob}</p>
                    <p>Day Joined: {user.createdDate}</p>
                    <p>Last Active: {user.lastActive}</p>
                </div>
                <div className="userBooks">
                    {
                        this.state.books.map(
                            book =>
                                <div className="singleBook"> 
                                    <div className="bookCover">
                                        <img src={"http://localhost:6789/api/books/cover/" + book.bookId} width={200} ></img>
                                    </div>
                                    <div className="bookContent">
                                        <div className="bookTitle"><p >{book.title}</p></div>
                                        <p>Tác giả: {book.authorName}</p>
                                        <p>Lượt xem: {book.noView}</p>
                                    </div>
                                </div>
                        )
                    }
                </div>
            </div>

        );
    }
}

export default UserProfile;
