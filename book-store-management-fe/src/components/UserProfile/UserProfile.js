import React, { Component, useEffect, useState } from "react";
import UserServices from "../../services/UserServices";
import "./UserProfile.scss";
import BookServices from "../../services/BookServices";

import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import AuthenServices from "../../services/AuthenServices";
import { Card } from "react-bootstrap";

function UserProfile() {

    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [books, setBooks] = useState([]);
    const [loginUser, setLoginUser] = useState("");

    useEffect(() => {
        AuthenServices.getSessionUser(window.localStorage.getItem("sessionId")).then((res) => {
            setLoginUser(res.data)
        })
        console.log(loginUser);
    }, []);
    function deleteBook(bookId) {
        BookServices.deleteBook(bookId);
    }

    useEffect(() => {

        if (userId) {
            UserServices.getUserByUserName(userId).then((res) => {
                setUser(res.data);
                setLoginUser(res.data.roles[0].rolerName);
            });
            BookServices.getPublicBookByUser(userId).then((res) => {
                setBooks(res.data);
            });
        } else {
            UserServices.getUserByUserName(loginUser).then((res) => { 
                setUser(res.data);
            });
            BookServices.getBookByUser(loginUser).then((res) => {
                setBooks(res.data);
            });
        }
    }, [userId, loginUser]);



    return (
        <div className="profile-container">
            <div className="user-info">
                <div className="avatar-card">
                    <img src={`http://localhost:6789/api/users/avatar/${user.username}.jpg`} alt={user.username} />
                    {console.log(`http://localhost:6789/api/users/avatar/${user.username}.jpg`)}
                    <p className="displayName">{user.displayName}</p>
                    {console.log(user)}
                    <p>{loginUser}</p>
                </div>
                <div className="userInfo">
                    <div className="userInfoTittle">
                        <h5 style={{ color: "#1a1668", fontWeight: "bold", borderBottom: "2px solid", borderColor: "#eaa451", textAlign: "left", marginLeft: "15px", width: "96%" }}>USER INFORMATION</h5>
                    </div>
                    <div className="login-form user-info-form">
                        {/* <div className="user-info-form"> */}
                        <div className="user-info-form-1">
                            <div className="user-info-form-item">
                                <label for="email">Email: </label>
                                <input type="text" value={user.email} disabled />
                            </div>
                            <div className="user-info-form-item">
                                <label for="dob">Date Of Birth: </label>
                                <input type="text" value={user.dob} disabled />
                            </div>


                        </div>
                        <div className="user-info-form-1">
                            <div className="user-info-form-item">
                                <label for="email">Day Joined: </label>
                                <input type="text" value={user.createDate} disabled />
                            </div>
                            <div className="user-info-form-item">
                                <label for="dob">Last Active:</label>
                                <input type="text" value={user.lastActive} disabled />
                            </div>
                        </div>

                        {/* </div> */}
                    </div>
                </div>

            </div>
            <div className="userBook">
                <div className="user-books-title">
                    <h5 style={{ color: "#1a1668", fontWeight: "bold", fontSize: "28px", marginTop: "10px", borderBottom: "5px solid", borderColor: "#eaa451", textAlign: "left", marginLeft: "15px", width: "96%" }}>USER BOOKS</h5>
                </div>
                <div className="userBooks row" style={{marginLeft:"50px"}}>
                    {books.map(book =>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <Card className="card" style={{marginLeft:"20px", width: "25rem", height: "23rem", border:"2px solid",borderColor:"#1a1668"}}>
                                <div className="cover">
                                    <Card.Img
                                        variant="top"
                                        src={"http://localhost:6789/api/books/cover/" + book.bookId}
                                        style={{ height: "9rem", width: "auto" }}
                                    />
                                </div>
                                <Card.Body style={{ height: "16rem" }}>
                                    <Card.Title
                                        style={{ height: "3rem", width: "auto", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a1668", fontWeight: "800" }}
                                    >{book.title}</Card.Title>
                                    <Card.Text
                                        style={{ height: "2rem", width: "auto", color: "#eaa451" }}
                                    >{book.authorName}</Card.Text>
                                    {/* <Card.Text
  style={{ height: "1rem" ,width: "auto"}}>{book.price}</Card.Text> */}
                                    <Link to={"/book/view/" + book.bookId} className="btn btn-info" style={{ backgroundColor: "#1a1668", color: "white" }}>
                                        Đọc Ngay{" "}
                                    </Link>
                                </Card.Body>
                            </Card>

                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
