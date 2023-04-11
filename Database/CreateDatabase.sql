-- CREATE DATABASE FU_LABIA_BookStoreManagement ;
-- DROP DATABASE FU_LABIA_BookStoreManagement
USE FU_LABIA_BookStoreManagement;

CREATE TABLE `User`(
	userName varchar(50),
    `password` varchar(50),
    dob date,
    email varchar(150),
    createDate date,
    lastestActive datetime,
    avatar blob,
    CONSTRAINT PK_User PRIMARY KEY (userName)
);

CREATE TABLE `Role`(
	roleId int NOT NULL,
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
	featureId int NOT NULL, 
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
	bookId int NOT NULL,
    title nvarchar(150),
    pdf longblob,
    cover longblob,
    createdBy varchar(50),
    isApproved bit,
    price float,
    noSale int DEFAULT 0,
    noView int DEFAULT 0,
    CONSTRAINT PK_Book PRIMARY KEY (bookId)
);
ALTER TABLE Book ADD CONSTRAINT FK_Book_User FOREIGN KEY(createdBy)
REFERENCES `User` (username);

CREATE TABLE Category (
	categoryId int NOT NULL,
    categoryName varchar(50),
    CONSTRAINT PK_Category PRIMARY KEY (categoryId)
);

CREATE TABLE Book_Category(
	bookId int NOT NULL, 
    categoryId int NOT NULL,
    CONSTRAINT PK_Book_Category PRIMARY KEY (bookId, categoryId)
);

ALTER TABLE Book_Category ADD CONSTRAINT FK_BookCategory_Book FOREIGN KEY(bookId)
REFERENCES Book (bookId);
ALTER TABLE Book_Category ADD CONSTRAINT FK_BookCategory_Category FOREIGN KEY(categoryId)
REFERENCES Category (categoryId);






