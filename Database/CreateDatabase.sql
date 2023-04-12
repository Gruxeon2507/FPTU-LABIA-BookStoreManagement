-- CREATE DATABASE FU_LABIA_BookStoreManagement ;
-- DROP DATABASE FU_LABIA_BookStoreManagement;
USE FU_LABIA_BookStoreManagement;

CREATE TABLE `User`(
	username varchar(50),
    `password` varchar(50),
    displayName nvarchar (150),
    dob date,
    email varchar(150),
    createDate date,
    lastActive datetime,
    avatarPath varchar(255),
    CONSTRAINT PK_User PRIMARY KEY (username)
);

CREATE TABLE `Role`(
	roleId int NOT NULL AUTO_INCREMENT,
	roleName varchar(50),
	CONSTRAINT PK_Role PRIMARY KEY (roleId)
);

CREATE TABLE User_Role(
	username varchar(50) NOT NULL,
	roleId int NOT NULL,
	CONSTRAINT PK_UserRole PRIMARY KEY (username, roleId)
);

ALTER TABLE User_Role ADD CONSTRAINT FK_UserRole_User FOREIGN KEY(username)
REFERENCES `User` (username);
ALTER TABLE User_Role ADD CONSTRAINT FK_UserRole_Role FOREIGN KEY(roleId)
REFERENCES `Role` (roleId);


CREATE TABLE Feature(
	featureId int NOT NULL AUTO_INCREMENT, 
	featureName varchar(150),
	url varchar(150),
	CONSTRAINT PK_Feature PRIMARY KEY (featureId)
);

CREATE TABLE Role_Feature 
(
	roleId int NOT NULL,
	featureId int NOT NULL,
	CONSTRAINT PK_RoleFeature PRIMARY KEY (roleId, featureId)
);
ALTER TABLE Role_Feature ADD CONSTRAINT FK_RoleFeature_Role FOREIGN KEY(roleId)
REFERENCES `Role`(roleId);
ALTER TABLE Role_Feature ADD CONSTRAINT FK_RoleFeature_Feature FOREIGN KEY(featureId)
REFERENCES Feature(featureId);


CREATE TABLE Book (
	bookId int NOT NULL AUTO_INCREMENT,
    title nvarchar(150),
    authorName nvarchar(150),
    `description` longtext,
    pdfPath varchar(255),
    coverPath varchar(255),
    price float,
    createdBy varchar(50),
    isApproved bit DEFAULT false,
    noSale int DEFAULT 0,
    noView int DEFAULT 0,
    CONSTRAINT PK_Book PRIMARY KEY (bookId)
);
ALTER TABLE Book ADD CONSTRAINT FK_Book_User FOREIGN KEY(createdBy)
REFERENCES `User` (username);

CREATE TABLE Category (
	categoryId int NOT NULL AUTO_INCREMENT,
    categoryName varchar(50),
    CONSTRAINT PK_Category PRIMARY KEY (categoryId)
);

CREATE TABLE Book_Category(
	bookId int NOT NULL , 
    categoryId int NOT NULL,
    CONSTRAINT PK_Book_Category PRIMARY KEY (bookId, categoryId)
);

ALTER TABLE Book_Category ADD CONSTRAINT FK_BookCategory_Book FOREIGN KEY(bookId)
REFERENCES Book (bookId);
ALTER TABLE Book_Category ADD CONSTRAINT FK_BookCategory_Category FOREIGN KEY(categoryId)
REFERENCES Category (categoryId);

/*
SELECT * FROM `User`;
SELECT * FROM `Role`;
SELECT * FROM Book;
SELECT * FROM Category;
SELECT * FROM Book_Category;
SELECT * FROM User_Role ;
SELECT * FROM Role_Feature;
*/





