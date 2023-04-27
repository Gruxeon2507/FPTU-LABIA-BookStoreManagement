import React, { Component, useEffect, useState } from "react";
import UserServices from "../../services/UserServices";
import "./UserProfile.scss";
import BookServices from "../../services/BookServices";

import { Link, useParams } from "react-router-dom";
import AuthenService from "../../services/AuthenServices";
import AuthenServices from "../../services/AuthenServices";

function UserProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [books, setBooks] = useState([]);
    const [loginUser,setLoginUser] = useState("");
    useEffect(() => {
        AuthenServices.getSessionUser(window.localStorage.getItem("sessionId")).then((res)=>{
            setLoginUser(res.data)

        })
        console.log(loginUser);
    }, []);
    
    useEffect(() => {
        console.log(window.localStorage.getItem("user"))
        console.log(window.localStorage.getItem("role"))
        if(userId ){
            UserServices.getUserByUserName(userId).then((res) => {
                setUser(res.data);
            });
            BookServices.getBookByUser(userId).then((res) => {
                setBooks(res.data);
            });
        }else{
            UserServices.getUserByUserName(loginUser).then((res) => {
                setUser(res.data);
            });
            BookServices.getBookByUser(loginUser).then((res) => {
                setBooks(res.data);
            });
        }
    }, [userId, loginUser]);
    

    return (
        <div className="container">
            <div className="avatar">
                <img src={`http://localhost:6789/api/users/avatar/${user.username}`} alt={user.username} />
                {console.log(`http://localhost:6789/api/users/avatar/${user.username}`)}
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
                    books.map(
                        book =>
                            <div className="singleBook">
                                <div className="bookCover">
                                    <img src={"http://localhost:6789/api/books/cover/" + book.bookId} width={200} ></img>
                                </div>
                                <div className="bookContent">
                                    <div className="bookTitle"><p >{book.title}</p></div>
                                    <p>Tác giả: {book.authorName}</p>
                                    <p>Lượt xem: {book.noView}</p>
                                    <button><Link to={"../book/view/"+book.bookId}>Đọc ngay</Link></button>
                                </div>
                            </div>
<<<<<<< Updated upstream
                    )
                }
=======
                            <p>Tác giả: {book.authorName}</p>
                            <p>Lượt xem: {book.noView}</p>
                            <div className="row">
                                {user.username===window.localStorage.getItem("user")?(
                                <div>
                                        
                               
                                <Link to={"/book/update/" + book.bookId}>
                                    <button className="btn btn-success">Update</button>
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        BookServices.deleteBook(book.bookId);
                                        window.location.href = ""
                                    }}
                                >
                                    Delete
                                </button>
                                </div>):(<></>)

                                }
                                
                            </div>

                        </div>
                    </div>

                )}
>>>>>>> Stashed changes
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
