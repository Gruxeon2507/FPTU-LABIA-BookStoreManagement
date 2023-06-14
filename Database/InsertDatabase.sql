USE FU_LABIA_BookStoreManagement;
-- Book Category
INSERT INTO Category (categoryId, categoryName)
VALUES (1, 'Tình cảm');
INSERT INTO Category (categoryId, categoryName)
VALUES (2, 'Khoa học viễn tưởng');
INSERT INTO Category (categoryId, categoryName)
VALUES (3, 'Kinh dị');
INSERT INTO Category (categoryId, categoryName)
VALUES (4, 'Truyền cảm hứng');
INSERT INTO Category (categoryId, categoryName)
VALUES (5, 'Tiểu sử');
INSERT INTO Category (categoryId, categoryName)
VALUES (6, 'Tự truyện');
INSERT INTO Category (categoryId, categoryName)
VALUES (7, 'Hồi ký');
INSERT INTO Category (categoryId, categoryName)
VALUES (8, 'Truyện ngắn');
INSERT INTO Category (categoryId, categoryName)
VALUES (9, 'Dạy nấu ăn');
INSERT INTO Category (categoryId, categoryName)
VALUES (10, 'Lịch sử ');
INSERT INTO Category (categoryId, categoryName)
VALUES (11, 'Thiếu nhi');
INSERT INTO Category (categoryId, categoryName)
VALUES (12, 'Thơ');
INSERT INTO Category (categoryId, categoryName)
VALUES (13, 'Giáo dục');
INSERT INTO Category (categoryId, categoryName)
VALUES (14, 'Tôn giáo ');
INSERT INTO Category (categoryId, categoryName)
VALUES (15, 'Kinh tế');
INSERT INTO Category (categoryId, categoryName)
VALUES (16, 'Sức khỏe');
INSERT INTO Category (categoryId, categoryName)
VALUES (17, 'Tâm lý');

-- User
INSERT INTO `User`(username,`password`,displayName,dob,email,createDate,lastActive,avatarPath)
VALUES ('huyenntk','123','Nguyễn Thị Khánh Huyền','2003-08-06','huyenntk@gmail.com','2023-04-11','2023-04-11 15:00:00','avatar/huyenntk.jpg');
INSERT INTO `User`(username,`password`,displayName,dob,email,createDate,lastActive,avatarPath)
VALUES ('maiphuonghoang','123','Hoàng Mai Phương','2003-01-29','maiphuonghoang@gmail.com','2023-04-11','2023-04-11 15:00:00','avatar/maiphuonghoang.jpg');
INSERT INTO `User`(username,`password`,displayName,dob,email,createDate,lastActive,avatarPath)
VALUES ('duckm','123','Khiếu Minh Đức','2003-07-25','duckm@gmail.com','2023-04-11','2023-04-11 15:00:00','avatar/duckm.jpg');
INSERT INTO `User`(username,`password`,displayName,dob,email,createDate,lastActive,avatarPath)
VALUES ('giangpt','123','Phạm Trường Giang','2003-06-18','giangpt@gmail.com','2023-04-11','2023-04-11 15:00:00','avatar/giangpt.jpg');
INSERT INTO `User`(username,`password`,displayName,dob,email,createDate,lastActive,avatarPath)
VALUES ('duongpt','123','Phạm Tuấn Dương','2002-01-01','duongpt@gmail.com','2023-04-11','2023-04-11 15:00:00','avatar/duongpt.jpg');
INSERT INTO `User`(username,`password`,displayName,dob,email,createDate,lastActive,avatarPath)
VALUES ('anbv','123','Bùi Văn An','2001-01-01','anbv@gmail.com','2023-04-11','2023-04-11 15:00:00','avatar/anbv.jpg');
INSERT INTO `User`(username,`password`,displayName,dob,email,createDate,lastActive,avatarPath)
VALUES ('nhatvn','123','Vũ Ngọc Nhất','2003-01-01','nhatvn@gmail.com','2023-04-11','2023-04-11 15:00:00','avatar/nhatvn.jpg');
INSERT INTO `User`(username,`password`,displayName,dob,email,createDate,lastActive,avatarPath)
VALUES ('phucvd','123','Vũ Duy Phúc','2003-01-01','phucvd@gmail.com','2023-04-11','2023-04-11 15:00:00','avatar/phucvd.jpg');
INSERT INTO `User`(username,`password`,displayName,dob,email,createDate,lastActive,avatarPath)
VALUES ('hoavt','123','Vũ Tiến Hòa','1999-01-01','hoavt@gmail.com','2023-04-11','2023-04-11 15:00:00','avatar/hoavt.jpg');
INSERT INTO `User`(username,`password`,displayName,dob,email,createDate,lastActive,avatarPath)
VALUES ('khoahoc','123','Em Yêu Khoa Học','2022-01-01','khoahoc@gmail.com','2023-04-11','2023-04-11 15:00:00','avatar/khoahoc.jpg');

-- Role
INSERT INTO `Role`(roleName)
VALUES ('Super Admin');
INSERT INTO `Role`(roleName)
VALUES ('Admin');
INSERT INTO `Role`(roleName)
VALUES ('User');

-- User_Role
INSERT INTO User_Role(username,roleId)
VALUES ('khoahoc',1);
INSERT INTO User_Role(username,roleId)
VALUES ('khoahoc',2);
INSERT INTO User_Role(username,roleId)
VALUES ('khoahoc',3);
INSERT INTO User_Role(username,roleId)
VALUES ('duckm',2);
INSERT INTO User_Role(username,roleId)
VALUES ('duckm',3);
INSERT INTO User_Role(username,roleId)
VALUES ('huyenntk',2);
INSERT INTO User_Role(username,roleId)
VALUES ('huyenntk',3);
INSERT INTO User_Role(username,roleId)
VALUES ('maiphuonghoang',2);
INSERT INTO User_Role(username,roleId)
VALUES ('maiphuonghoang',3);
INSERT INTO User_Role(username,roleId)
VALUES ('giangpt',2);
INSERT INTO User_Role(username,roleId)
VALUES ('giangpt',3);
INSERT INTO User_Role(username,roleId)
VALUES ('duongpt',3);
INSERT INTO User_Role(username,roleId)
VALUES ('anbv',3);
INSERT INTO User_Role(username,roleId)
VALUES ('nhatvn',3);
INSERT INTO User_Role(username,roleId)
VALUES ('phucvd',3);
INSERT INTO User_Role(username,roleId)
VALUES ('hoavt',3);

-- Feature
INSERT INTO Feature(featureName,url)
VALUES ('Home page','/homepage');
INSERT INTO Feature(featureName,url)
VALUES ('Account Information','/user');
INSERT INTO Feature(featureName,url)
VALUES ('Account Setting','/user/setting');
INSERT INTO Feature(featureName,url)
VALUES ('View Book','/book/view');
INSERT INTO Feature(featureName,url)
VALUES ('Add Booke','/book/add');
INSERT INTO Feature(featureName,url)
VALUES ('Admin Page','/admin');
INSERT INTO Feature(featureName,url)
VALUES ('Admin Book Management','/admin/book');
INSERT INTO Feature(featureName,url)
VALUES ('Admin User Management','/admin/user');
INSERT INTO Feature(featureName,url)
VALUES ('Super Admin page','/superadmin');

-- Role_Feature
INSERT INTO Role_Feature(roleId,featureId)
VALUES (3,1);
INSERT INTO Role_Feature(roleId,featureId)
VALUES (3,2);
INSERT INTO Role_Feature(roleId,featureId)
VALUES (3,3);
INSERT INTO Role_Feature(roleId,featureId)
VALUES (3,4);
INSERT INTO Role_Feature(roleId,featureId)
VALUES (3,5);
INSERT INTO Role_Feature(roleId,featureId)
VALUES (2,6);
INSERT INTO Role_Feature(roleId,featureId)
VALUES (2,7);
INSERT INTO Role_Feature(roleId,featureId)
VALUES (2,8);
INSERT INTO Role_Feature(roleId,featureId)
VALUES (1,9);

-- Book
INSERT INTO Book(title,authorName,`description`,pdfPath,coverPath,price,createdBy,isApproved,noSale,noView)
VALUES ('Rừng Na Uy','Haruki Murakami','Rừng Na Uy là một tác phẩm kinh điển, tạo nên tiếng vang lớn trong nền văn học Nhật Bản 
nói riêng và trên toàn thế giới nói chung. Tác phẩm này được xuất bản lần đầu tiên vào năm 1987. Câu chuyện là dòng hồi tưởng về
 quá khứ của Watanabe Toru, một chàng thanh niên 37 tuổi, về những mối tình đầu của anh thời niên thiếu là Naoko và Midori. Bối 
 cảnh câu chuyện là nước Nhật vào những năm 1960 đầy biến động. Những biến động, rối ren của xã hội đã phần nào gây tác động đến
 tâm lý của những thanh thiếu niên thời bấy giờ, mỗi người đều phải trải qua những dày vò, những niềm đau về cả thể xác lẫn tâm hồn.
 Cuốn sách này như là một lời cảnh tỉnh dành cho những người trẻ, và cũng là sự nuối tiếc của những người đã đi qua thời thanh xuân.',
 'pdf/1.pdf','cover/1.jpg',150000,'huyenntk',1,0,0);
 INSERT INTO Book(title,authorName,`description`,pdfPath,coverPath,price,createdBy,isApproved,noSale,noView)
VALUES ('Xin Cạch Đàn Ông','Katarzyna Grochola','“Xin Cạch Đàn Ông” kể về cuộc hôn nhân kéo dài 10 năm của Judyta.
 Những mẩu chuyện nhỏ xảy ra hàng ngày như không đốt lò sưởi trong phòng ngủ, không ăn uống trên giường,... là chính
 là những yếu tố khiến cuộc hôn nhân của cô tan vỡ. Không gục ngã trước những đau thương, Judyta vẫn tự mình xây nhà,
 nuôi con, làm tốt công việc tại tòa soạn, và thậm chí còn tư vấn cho người khác về những vấn đề trong cuộc sống, như mâu 
 thuẫn gia đình, nữ công gia chánh,...',
 'pdf/2.pdf','cover/2.jpg',150000,'huyenntk',1,0,0);
 INSERT INTO Book(title,authorName,`description`,pdfPath,coverPath,price,createdBy,isApproved,noSale,noView)
VALUES ('Đàn ông sao Hỏa, Đàn bà sao Kim','John Gray','“Đàn ông sao Hỏa, Đàn bà sao Kim” là tác phẩm phản ánh
 tâm lý tiềm thức của con người rất chân thực, là một cuốn sách tâm lý học tình yêu của tác giả John Gray mà 
 bạn không nên bỏ lỡ. Tác phẩm này sẽ giúp người đọc hiểu rõ hơn về bản thân, cũng như các giới tính khác. Qua
 đó, hãy học cách tạo dựng tình yêu và thích ứng với việc kết hôn để cuộc hôn nhân của bạn không trở nên nhàm 
 chán, cũng như tránh rơi vào tình trạng đổ vỡ.',
 'pdf/3.pdf','cover/3.jpg',150000,'huyenntk',1,0,0);
 INSERT INTO Book(title,authorName,`description`,pdfPath,coverPath,price,createdBy,isApproved,noSale,noView)
VALUES ('Trà Hoa Nữ','Alexandre Dumas con','Trà Hoa Nữ được xuất bản vào năm 1848, được Alexandre Dumas sáng tác dựa trên mối tình
 ngắn ngủi của ông và Marie Duplessis, một kỹ nữ yêu hoa trà. Cuốn tiểu thuyết kể về mối tình bi thương của
 nàng kỹ nữ xinh đẹp nhưng mắc bệnh lao phổi, Marguerite Gautier và nhà tư sản Armand Duval. Họ đã có một 
 khoảng thời gian vô cùng hạnh phúc bên nhau, nhưng cuối cùng họ cũng không thể vượt qua sự ngăn cản của 
 gia đình và sức mạnh to lớn của đồng tiền. Kết truyện, Marguerite Gautier ra đi trong sự cô đơn, với tấm
 lòng luôn hướng về người cô thương yêu nhất, Armand Duval.',
 'pdf/4.pdf','cover/4.jpg',150000,'maiphuonghoang',1,0,0);
 INSERT INTO Book(title,authorName,`description`,pdfPath,coverPath,price,createdBy,isApproved,noSale,noView)
VALUES ('Những Con Chim Ẩn Mình Chờ Chết','Colleen McCullough','“Những Con Chim Ẩn Mình Chờ Chết” kể về những 
hy vọng, kế hoạch, lo lắng, niềm tin ẩn giấu và một mối tình bị ngăn cấm ở nước Úc. Dòng họ Clearly có ba thế 
hệ, họ sống bằng nghề chăn nuôi gia súc, dù vùng đất mà họ cư ngụ vô cùng khắc nghiệt , cằn cỗi. Điểm nhấn của
 câu chuyện đến từ mối tình của cô con gái duy nhất trong gia đình, Meggie với Ralph de Bricassart, một linh mục.
 Mối quan hệ của họ không chỉ bị gia đình ngăn cấm, mà còn xâm phạm đến đạo đức và giáo điều. Xuyên suốt tác phẩm 
 là những mâu thuẫn, dằn vặt, buộc các nhân vật phải đưa ra sự lựa chọn, quyết định cho cuộc sống của riêng họ.',
 'pdf/5.pdf','cover/5.jpg',150000,'maiphuonghoang',1,0,0);
 INSERT INTO Book(title,authorName,`description`,pdfPath,coverPath,price,createdBy,isApproved,noSale,noView)
VALUES ('Đừng Nhân Danh Tình Yêu','Bất Kinh Ngữ','“Đừng Nhân Danh Tình Yêu” là câu chuyện xoay quanh nhân vật
 nam chính tên Lục Trình Vũ - một bác sĩ đầy tài năng làm việc trong một bệnh viện có tiếng. Nữ chính là Đỗ
 Nhiệm - một dược sĩ xinh đẹp, giỏi giang và là đồng nghiệp của Trình Vũ. Cả hai đã từng gặp nhau trong khoảng 
 thời gian Đỗ Nhiệm luyện thi Đại học khi đó Trình Vũ là gia sư của cô. Khi đó, cả hai đã có tình ý với nhau nhưng
 chỉ dừng lại ở sự ngại ngùng, bối rối. Và mười năm sau, họ gặp lại nhau trong một hoàn cảnh khác và đã tiến tới mối 
 quan hệ hôn nhân đầy vội vã. Vì sao họ lại kết hôn một cách vội vàng như vậy? Liệu cả hai có cùng nhau đi đến cuối
 con đường hạnh phúc? Đón đọc tác phẩm tình yêu đầy thực tế và đời thường này để biết chi tiết..',
 'pdf/6.pdf','cover/6.jpg',150000,'maiphuonghoang',1,0,0);
 INSERT INTO Book(title,authorName,`description`,pdfPath,coverPath,price,createdBy,isApproved,noSale,noView)
VALUES ('Gọi Em Bằng Tên Anh','André Aciman','“Gọi Em Bằng Tên Anh” được xuất bản vào năm 2007, là cuốn sách 
kể về tình yêu đồng giới của nhà văn  André Aciman. Nhân vật chính của tác phẩm là Elio, một thiếu niên ngây 
ngô, nhưng rất thông minh và Oliver, một nhà học giả điển trai, cuốn hút và điềm tĩnh. Họ gặp nhau vào một ngày
 mùa hè tại vùng biển Riviera nước Ý, vào những năm 1980. Tại đây họ yêu nhau và có với nhau những kỉ niệm vô cùng
 đẹp mà cả hai không bao giờ quên được.',
 'pdf/7.pdf','cover/7.jpg',150000,'duckm',0,0,0);
 INSERT INTO Book(title,authorName,`description`,pdfPath,coverPath,price,createdBy,isApproved,noSale,noView)
VALUES ('Cuốn Theo Chiều Gió','Margaret Mitchell','Cuốn sách "Cuốn Theo Chiều Gió" được viết bởi Margaret
 Mitchell và xuất bản lần đầu vào năm 1936, là một trong những cuốn sách hay nên đọc về tình yêu. Bối 
 cảnh câu chuyện là ở Georgia và Atlanta, trong giai đoạn nội chiến căng thẳng giữa hai miền Nam và Bắc nước Mỹ.
 Tác phẩm xoay quanh Scarlett O\'Hara và Rhett Butler, về chuyện tình ngọt ngào của họ trong thời kỳ chiến tranh 
 gian khổ, là động lực để họ vượt qua khó khăn. Cuốn theo chiều gió không chỉ khắc họa chuyện tình đôi lứa lãng mạn,
 đẹp đẽ, mà còn ca ngợi tình yêu quê hương đất nước, tấm lòng tương thân tương ái của mỗi người dân trong hoàn cảnh khó khăn.',
 'pdf/8.pdf','cover/8.jpg',150000,'duckm',1,0,0);
 INSERT INTO Book(title,authorName,`description`,pdfPath,coverPath,price,createdBy,isApproved,noSale,noView)
VALUES ('Nếu Gặp Người Ấy Cho Tôi Gửi Lời Chào','Takuji Ichikawa','“Nếu Gặp Người Ấy Cho Tôi Gửi Lời Chào” là
 một trong những quyển sách hay về tình yêu kể về một đôi bạn thanh mai trúc mã. Đôi bạn chơi với nhau từ khi
 còn bé và Satoshi đã có tình ý với Karin ngay từ thuở ấu thơ, nhưng anh lại nhút nhát và giữ bí mật tình cảm 
 của mình cho đến khi trưởng thành. Cơ duyên đã cho họ gặp lại nhau tại cửa hàng cá cảnh của Satoshi, nhưng họ
 lại không hề nhận ra nhau. Sau một thời gian, Satoshi nhận ra Karin chính là người mà mình thầm thương trộm nhớ 
 suốt thời thơ ấu, nhờ chiếc vòng cổ quen thuộc cô thường mang. Tất cả ký ức dường như bỗng ùa về trong anh và dần
 dần 2 người cũng nảy sinh tình cảm với nhau.',
 'pdf/9.pdf','cover/9.jpg',150000,'duckm',1,0,0);
 INSERT INTO Book(title,authorName,`description`,pdfPath,coverPath,price,createdBy,isApproved,noSale,noView)
VALUES ('Nơi Em Quay Về Có Tôi Đứng Đợi','Ichikawa Takuji','Nhắc đến những cuốn sách về tình yêu hay nhất,
 không thể không kể đến “Nơi Em Quay Về Có Tôi Đứng Đợi”. Tác phẩm kể về hai nhân vật chính là Satoshi và Yuko.
 Cả hai biết nhau từ khi 15 tuổi, khi học cùng nhau tại một trường trung học. Họ rung động với đối phương, nhưng
 lại không đủ can đảm để thổ lộ với đối phương. Và họ lại gặp nhau vào tuổi 18, những cảm xúc ấy lại ùa về. Cả hai
 dành cho nhau hết tất cả những gì có thể để bù đắp lại khoảng thời gian 3 năm bỏ lỡ đầy nuối tiếc. Nhưng đây chưa
 phải là đích đến cuối cùng, tình yêu giữa họ là một chuỗi gặp gỡ rồi lại chia ly đầy cảm xúc.',
 'pdf/10.pdf','cover/10.jpg',150000,'giangpt',1,0,0);
 INSERT INTO Book(title,authorName,`description`,pdfPath,coverPath,price,createdBy,isApproved,noSale,noView)
VALUES ('Em sẽ đến cùng cơn mưa','Takuji Ichikawa','Em sẽ đến cùng cơn mưa là một trong những cuốn sách hay về
 tâm lý tình yêu, kể về một người đàn ông đánh mất hạnh phúc của mình vào tay thần chết. Tuy nhiên, cuối cùng họ
 cũng tìm được nhau nhờ một phép màu tưởng như chỉ có trong truyện cổ tích. Người chồng gặp lại và yêu Mio, người
 vợ đã chết một năm trước đó trong cơn mưa tháng Sáu.',
 'pdf/11.pdf','cover/11.jpg',150000,'giangpt',0,0,0);
 INSERT INTO Book(title,authorName,`description`,pdfPath,coverPath,price,createdBy,isApproved,noSale,noView)
VALUES ('Mắt Biếc','Nguyễn Nhật Ánh','Mắt Biếc là một cuốn sách hay về tình yêu của tác giả Nguyễn Nhật Ánh,
 được xuất bản lần đầu tiên vào năm 1990. Tác phẩm kể về mối tình sâu đậm mà Ngạn dành cho Hà Lan, đôi bạn 
 cùng nhau lớn lên ở một ngôi làng tên là Đo Đo. Khi trưởng thành, cả hai cùng rời làng và lên thành phố để
 tiếp tục sự nghiệp học hành. Trong khi Ngạn vẫn luôn hướng về Hà Lan, thì cô lại không thể cưỡng lại những cám
 dỗ và nhanh chóng bắt đầu một mối quan hệ với Dũng, một thiếu nhà giàu. Chuyện gì đến cũng đến, Hà Lan mang thai
 với Dũng, nhưng anh lại gạt bỏ trách nhiệm và từ chối nhận trách nhiệm. Hà Lan sinh ra một bé gái xinh đẹp, có tên
 là Trà Long và gửi gắm cho bà ngoại nuôi nấng. Vì mối tình sâu đậm dành cho Hà Lan, nên Ngạn hết lòng thương yêu và 
 chăm sóc Trà Long. Tưởng chừng như Trà Long sẽ là điểm kết cho mối tình dang dở của Hà Lan và Ngạn. Nhưng cuối cùng, 
 Ngạn vẫn chọn rời quê, vì anh nhận ra rằng, đối với anh, Trà Long chỉ là cái bóng của Hà Lan trong anh mà thôi.',
 'pdf/12.pdf','cover/12.jpg',150000,'giangpt',1,0,0);
 INSERT INTO Book(title,authorName,`description`,pdfPath,coverPath,price,createdBy,isApproved,noSale,noView)
VALUES ('Tình yêu và tuổi trẻ','Valery Larbaud','“Tình yêu và tuổi trẻ” là câu chuyện của mỗi chúng ta về tình
 yêu và tuổi trẻ. Những xúc cảm đầy bí ẩn thời niên thiếu là những thứ mà bất kỳ ai cũng đều sẽ trải qua ít nhất
 1 lần. Cuốn sách hay về tình yêu này mang đến cho người đọc những trải nghiệm và cảm xúc chân thực nhất, thậm chí
 đôi khi họ thấy họ ở trong chính câu chuyện đó.',
 'pdf/13.pdf','cover/13.jpg',150000,'duongpt',1,0,0);
 INSERT INTO Book(title,authorName,`description`,pdfPath,coverPath,price,createdBy,isApproved,noSale,noView)
VALUES ('Xứ Cát ','Frank Herbert','"Một thời điểm rất xa trong tương lai…
Từ đời này sang đời khác, người Fremen trên hành tinh sa mạc lưu truyền lời tiên tri về một đấng cứu tinh sẽ dẫn dắt họ giành lấy tự do đích thực…
Từ thế hệ này sang thế hệ khác, những nữ phù thủy Bene Gesserit mỏi mòn chờ đợi sự xuất hiện của một B.G. nam giới duy nhất, người có thể vượt qua mọi giới hạn không gian – thời gian…"',
 'pdf/14.pdf','cover/14.jpg',150000,'nhatvn',1,0,0);
 
 -- Book_Category
INSERT INTO Book_Category(bookId,categoryId)
VALUES (1,1);
INSERT INTO Book_Category(bookId,categoryId)
VALUES (1,2);
INSERT INTO Book_Category(bookId,categoryId)
VALUES (2,1);
INSERT INTO Book_Category(bookId,categoryId)
VALUES (3,1);
INSERT INTO Book_Category(bookId,categoryId)
VALUES (4,1);
INSERT INTO Book_Category(bookId,categoryId)
VALUES (5,1);
INSERT INTO Book_Category(bookId,categoryId)
VALUES (6,1);
INSERT INTO Book_Category(bookId,categoryId)
VALUES (7,1);
INSERT INTO Book_Category(bookId,categoryId)
VALUES (8,1);
INSERT INTO Book_Category(bookId,categoryId)
VALUES (9,1);
INSERT INTO Book_Category(bookId,categoryId)
VALUES (10,1);
INSERT INTO Book_Category(bookId,categoryId)
VALUES (11,1);
INSERT INTO Book_Category(bookId,categoryId)
VALUES (12,1);
INSERT INTO Book_Category(bookId,categoryId)
VALUES (13,1);
INSERT INTO Book_Category(bookId,categoryId)
VALUES (14,2);



INSERT INTO `User`(username,`password`,displayName,dob,email,createDate,lastActive,avatarPath)
 VALUES ('testUser','123','testUser','2003-08-06','huyenntk@gmail.com','2023-04-24','2023-04-24 15:00:00','avatar/huyenntk.jpg');
INSERT INTO User_Role(username,roleId)
VALUES ('testUser',3);


INSERT INTO `User`(username,`password`,displayName,dob,email,createDate,lastActive,avatarPath)
VALUES ('testAdmin','123','testAdmin','2003-08-06','huyenntk@gmail.com','2023-04-24','2023-04-24 15:00:00','avatar/huyenntk.jpg');
INSERT INTO User_Role(username,roleId)
VALUES ('testAdmin',2);
INSERT INTO User_Role(username,roleId)
VALUES ('testAdmin',3);

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
 



select * from Role;
	SELECT * FROM `User` u JOIN User_Role ur on u.username = ur.username WHERE u.username = 'huyenntk' and ur.roleId = 2;
select * from Book where isApproved = 1;



