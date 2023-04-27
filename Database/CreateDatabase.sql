DROP DATABASE FU_LABIA_BookStoreManagement;
 CREATE DATABASE FU_LABIA_BookStoreManagement ;
  
USE FU_LABIA_BookStoreManagement;

CREATE TABLE `User`(
	username varchar(50),
    `password` varchar(100),
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
select * from book b join user u on  b.createdBy = u.userName where b.createdBy  = 'maiphuonghoang'
/*
SELECT * FROM `User`;
SELECT * FROM `Role`;
SELECT * FROM Book;
SELECT * FROM Category;
SELECT * FROM Book_Category;
SELECT * FROM User_Role ;
SELECT * FROM Role_Feature;
*/
/*
 select
        * 
    from
        `User` u 
    where
        u.username not in (
            select
                us.username 
            from
                `User` us 
            join
                User_Role ur 
                    on us.username = ur.username 
            where
                ur.roleId = 1)
select * from `User` u where u.username not in (select us.username from `User` us join User_Role ur on us.username = ur.username where ur.roleId = 2 and us.username = 'maiphuonghoang' or ur.roleId = 1)
INSERT INTO `User`(username,`password`,displayName)
VALUES ('test','123','Em Yêu Khoa Học');
*/

/*
select * from `User` u join User_Role ru  on u.username = ru.username  where ru.roleId = 2 and u.username not in (select us.username from `User` us 
join User_Role ur on us.username = ur.username 
where ur.roleId = 2 and us.username = 'khoahoc' or ur.roleId = 1)

select * from `User` us WHERE us.username in (
select u.username from `User` u join User_Role ur  on u.username = ur.username GROUP BY u.username
HAVING  COUNT(roleId) = 1) 
*/


INSERT INTO Book(title,authorName,`description`,pdfPath,coverPath,price,createdBy,isApproved,noSale,noView)
VALUES ('Sách chưa public','Haruki Murakami','Sách chưa public là một tác phẩm kinh điển, tạo nên tiếng vang lớn trong nền văn học Nhật Bản 
nói riêng và trên toàn thế giới nói chung. Tác phẩm này được xuất bản lần đầu tiên vào năm 1987. Câu chuyện là dòng hồi tưởng về
 quá khứ của Watanabe Toru, một chàng thanh niên 37 tuổi, về những mối tình đầu của anh thời niên thiếu là Naoko và Midori. Bối 
 cảnh câu chuyện là nước Nhật vào những năm 1960 đầy biến động. Những biến động, rối ren của xã hội đã phần nào gây tác động đến
 tâm lý của những thanh thiếu niên thời bấy giờ, mỗi người đều phải trải qua những dày vò, những niềm đau về cả thể xác lẫn tâm hồn.
 Cuốn sách này như là một lời cảnh tỉnh dành cho những người trẻ, và cũng là sự nuối tiếc của những người đã đi qua thời thanh xuân.',
 'pdf/1.pdf','cover/1.jpg',150000,'maiphuonghoang',0,0,0);
 
 
INSERT INTO Book(title,authorName,`description`,pdfPath,coverPath,price,createdBy,isApproved,noSale,noView)
VALUES ('Sách chưa public2','Haruki Murakami','Sách chưa public là một tác phẩm kinh điển, tạo nên tiếng vang lớn trong nền văn học Nhật Bản 
nói riêng và trên toàn thế giới nói chung. Tác phẩm này được xuất bản lần đầu tiên vào năm 1987. Câu chuyện là dòng hồi tưởng về
 quá khứ của Watanabe Toru, một chàng thanh niên 37 tuổi, về những mối tình đầu của anh thời niên thiếu là Naoko và Midori. Bối 
 cảnh câu chuyện là nước Nhật vào những năm 1960 đầy biến động. Những biến động, rối ren của xã hội đã phần nào gây tác động đến
 tâm lý của những thanh thiếu niên thời bấy giờ, mỗi người đều phải trải qua những dày vò, những niềm đau về cả thể xác lẫn tâm hồn.
 Cuốn sách này như là một lời cảnh tỉnh dành cho những người trẻ, và cũng là sự nuối tiếc của những người đã đi qua thời thanh xuân.',
 'pdf/1.pdf','cover/1.jpg',150000,'maiphuonghoang',0,0,0);
 



