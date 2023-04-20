import React, { Component, useEffect, useState } from "react";
import UserServices from "../../services/UserServices";
import "./UserProfile.scss";
import BookServices from "../../services/BookServices";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [books, setBooks] = useState([]);

  useEffect(() => {
    UserServices.getUserByUserName(userId).then((res) => {
      setUser(res.data);
    });
    BookServices.getBookByUser(userId).then((res) => {
      setBooks(res.data);
    });
  }, [userId]);

  return <div className="container"></div>;
}

export default UserProfile;
