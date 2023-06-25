// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import BookServices from "../../services/BookServices";
// import "./ListBook.scss";
// import CategoryServices from "../../services/CategoryServices";
// import { Pagination } from "antd";
// import { Card } from "react-bootstrap";
// import { Button, FormControl } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faSearch,
//   faTimes,
//   faList,
//   faSort,
// } from "@fortawesome/free-solid-svg-icons";
// import { isDisabled } from "@testing-library/user-event/dist/utils";

// function ListBook() {
//   const [pageBooks, setPageBooks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [condition, setCondition] = useState("");
//   const [searchMessage, setSearchMessage] = useState("");
//   const [displayMessage, setDisplayMessage] = useState("");

//   const getAllPublicBooks = () => {
//     return BookServices.getAllPublicBooks()
//       .then((response) => {
//         console.log(response);
//         return response.data.length;
//       })
//       .catch((error) => {
//         console.log(error);
//         return 0;
//       });
//   };

//   const [totalItems, setTotalItems] = useState(0);

//   useEffect(() => {
//     getAllPublicBooks().then((count) => setTotalItems(count));
//   }, []);

//   const [categories, setCategories] = useState([]);
//   const sizePerPage = 12;

//   const getAllCategories = () => {
//     CategoryServices.getAllCategories()
//       .then((response) => {
//         setCategories(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const getPageBooks = (pageNumber, pageSize) => {
//     BookServices.getPageBooks(pageNumber, pageSize)
//       .then((response) => {
//         setPageBooks(response.data);
//       })
//       .catch((error) => {
//         console.log("loi lay ra page book");
//         console.log(error);
//       });
//   };

//   const findCondition = () => {
//     if (searchMessage.length > 0) {
//       const query = encodeURIComponent(searchMessage).replace(/%20/g, "%20");
//       setDisplayMessage(searchMessage);
//       filterBook(0, sizePerPage, query);
//     } else {
//       setDisplayMessage("");
//       getPageBooks(0, sizePerPage);
//     }
//   };
//   const handleReset = () => {
//     setCondition("");
//     getPageBooks(0, sizePerPage);
//     getAllPublicBooks().then((count) => setTotalItems(count));
//   };
//   const filterBook = (pageNumber, pageSize, searchText) =>
//     BookServices.filterBook(pageNumber, pageSize, searchText).then(
//       (response) => {
//         setPageBooks(response.data.content);
//         setTotalItems(response.data.totalElements);
//       }
//     );

//   const orderBook = (pageNumber, pageSize, field) =>
//     BookServices.getPublicBookOrderBy(pageNumber, pageSize, field).then(
//       (response) => {
//         setPageBooks(response.data.content);
//         setTotalItems(response.data.totalElements);
//       }
//     );
//   useEffect(() => {
//     filterBook(
//       0,
//       sizePerPage,
//       encodeURIComponent(condition).replace(/%20/g, "%20")
//     );
//   }, []);

//   useEffect(() => {
//     getAllCategories();
//   }, []);
//   useEffect(() => {
//     getPageBooks(0, sizePerPage);
//   }, []);

//   const handlePageChange = (current) => {
//     if (checked.length > 0) {
//       setCurrentPage(current);
//       console.log("current" + current);
//       getPageBooksByCategories(checked.join(","), current - 1, sizePerPage);
//     } else {
//       setCurrentPage(current);
//       getPageBooks(current - 1, sizePerPage);
//     }
//   };

//   const [checked, setChecked] = useState([]);
//   const handleCheck = (categoryId) => {
//     setChecked((prev) => {
//       const isChecked = checked.includes(categoryId);
//       if (isChecked) {
//         //Uncheck
//         return checked.filter((item) => item !== categoryId);
//       } else {
//         return [...prev, categoryId];
//       }
//     });
//   };
//   // useEffect(() => {
//   //   if(checked.length!==0){
//   //     handleSubmit();}
//   // }, [checked]);

//   const getPageBooksByCategories = (categoryIds, pageNumber, pageSize) => {
//     BookServices.getPageBooksByCategories(categoryIds, pageNumber, pageSize)
//       .then((response) => {
//         setPageBooks(response.data);
//         console.log("response" + response.data);
//       })
//       .catch((error) => {
//         console.log("loi lay ra page book");
//         console.log(error);
//       });
//   };

//   const getBooksByCategories = (categoryIds) => {
//     BookServices.getBooksByCategories(categoryIds)
//       .then((response) => {
//         setTotalItems(response.data.length);
//       })
//       .catch((error) => {
//         console.log("loi lay ra number page book");
//         console.log(error);
//       });
//   };
//   console.log("total page: " + totalItems);

//   const handleSubmit = (categoryId) => {
//     // handleCheck(categoryId)
//     console.log("check on submit:" + checked);
//     setCurrentPage(1);
//     console.log({ ids: checked });
//     const categoryIds = checked.join(",");
//     console.log(categoryIds);
//     getPageBooksByCategories(categoryIds, 0, sizePerPage);
//     getBooksByCategories(categoryIds);
//   };
//   const [isVisible, setIsVisible] = useState(false);

//   const handleButtonClick = () => {
//     setIsVisible(!isVisible);
//     handleReset();
//   };
//   const handleOrder = (e) => {
//     console.log(e.target.value);
//     orderBook(e.target.value, 0, sizePerPage);
//   };
//   return (
//     <>
//       <div className="find d-flex justify-content-center homepage">
//         <div className="itemSearch">
//           <Button
//             size="sm"
//             variant="outline-info"
//             type="button"
//             style={{
//               borderColor: "#eaa451",
//               color: "white",
//               backgroundColor: "#eaa451",
//               boxShadow: "none",
//               margin: "5px",
//             }}
//             // onClick={handleReset}
//             onClick={handleButtonClick}
//           >
//             <FontAwesomeIcon icon={faList} />
//           </Button>
//         </div>
//         {/* <div className="itemSearch"> */}
//         <FormControl
//           placeholder="Search Books Here"
//           name="search"
//           className={"info-border  text-black w-50 "}
//           value={searchMessage}
//           onChange={(e) => setSearchMessage(e.target.value)}
//         />
//         {/* </div> */}
//         <div className="itemSearch">
//           <Button
//             size="sm"
//             variant="outline-info"
//             type="button"
//             style={{
//               borderColor: "#eaa451",
//               color: "white",
//               backgroundColor: "#eaa451",
//               boxShadow: "none",
//               margin: "5px",
//             }}
//             onClick={findCondition}
//           >
//             <FontAwesomeIcon icon={faSearch} />
//           </Button>
//         </div>
//         <div className="itemSearch">
//           <Button
//             size="sm"
//             variant="outline-danger"
//             type="button"
//             style={{
//               borderColor: "#eaa451",
//               color: "white",
//               backgroundColor: "#eaa451",
//               boxShadow: "none",
//               margin: "5px",
//             }}
//             onClick={() => {
//               setSearchMessage("");
//               handleReset();
//             }}
//           >
//             <FontAwesomeIcon icon={faTimes} />
//           </Button>
//         </div>
//         <select name="" id="" onChange={handleOrder}>
//           <option value="">--Sort by--</option>
//           <option value="title">Title</option>
//           <option value="price">Price</option>
//         </select>
//       </div>
//       {isVisible && (
//         <div className="categories row">
//           {categories.map((category) => (
//             <div className="select col-6 col-md-3 col-sm-4 d-flex ">
//               <label key={category.categoryId}>
//                 <input
//                   type="checkbox"
//                   className="form-check-input w-20 h-20 ms-1 me-1"
//                   checked={checked.includes(category.categoryId)}
//                   onChange={() => handleCheck(category.categoryId)}
//                 />
//                 {category.categoryName}
//               </label>
//             </div>
//           ))}

//           <div className="btn btn-success" onClick={handleSubmit}>
//             Find
//           </div>
//         </div>
//       )}
//       {displayMessage.length > 0 && (
//         <div>
//           <span>Search result for "</span>
//           <span
//             style={{ whiteSpace: "nowrap" }}
//             dangerouslySetInnerHTML={{ __html: displayMessage }}
//           />
//           <span>"</span>
//         </div>
//       )}
//       <div className="list-books row">
//         {pageBooks.map((book) => (
//           <div
//             key={book.bookId}
//             className={
//               book.bookId + " col-lg-3 col-md-4 col-sm-6 col-xs-12 single-book"
//             }
//           >
//             <Card className="card" style={{ width: "19rem", height: "28rem" }}>
//               <div className="cover">
//                 <Card.Img
//                   variant="top"
//                   src={"http://localhost:6789/api/books/cover/" + book.bookId}
//                   style={{ height: "14rem", width: "auto" }}
//                 />
//               </div>
//               <Card.Body style={{ height: "16rem" }}>
//                 <Card.Title
//                   style={{
//                     height: "3rem",
//                     width: "auto",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "#1a1668",
//                     fontWeight: "800",
//                   }}
//                 >
//                   {book.title}
//                 </Card.Title>
//                 <Card.Text
//                   style={{
//                     height: "2rem",
//                     width: "auto",
//                     color: "#eaa451",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {book.authorName}
//                 </Card.Text>
//                 <Card.Text style={{ height: "1rem", width: "auto" }}>
//                   {book.price}
//                 </Card.Text>
//                 <Link
//                   to={"/book/view/" + book.bookId}
//                   className="btn btn-info"
//                   style={{ backgroundColor: "#1a1668", color: "white" }}
//                 >
//                   Đọc Ngay{" "}
//                 </Link>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>

//       <Pagination
//         style={{
//           borderColor: "#eaa451",
//           color: "black",
//           boxShadow: "none",
//           margin: "5px",
//         }}
//         total={totalItems}
//         defaultPageSize={sizePerPage}
//         showTotal={(total, range) =>
//           `${range[0]}-${range[1]} of ${total} items`
//         }
//         current={currentPage}
//         onChange={(current) => {
//           handlePageChange(current);
//         }}
//       />
//     </>
//   );
// }

// export default ListBook;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookServices from "../../services/BookServices";
import "./ListBook.scss";
import CategoryServices from "../../services/CategoryServices";
import { Pagination } from "antd";
import { Card } from "react-bootstrap";
import { Button, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faSearch,
 faTimes,
 faList,
 faSort,
} from "@fortawesome/free-solid-svg-icons";
import { isDisabled } from "@testing-library/user-event/dist/utils";


function ListBook() {
 const [pageBooks, setPageBooks] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [condition, setCondition] = useState("");
 const [searchMessage, setSearchMessage] = useState("");
 const [displayMessage, setDisplayMessage] = useState("");


 const getAllPublicBooks = () => {
   return BookServices.getAllPublicBooks()
     .then((response) => {
       console.log(response);
       return response.data.length;
     })
     .catch((error) => {
       console.log(error);
       return 0;
     });
 };


 const [totalItems, setTotalItems] = useState(0);


 useEffect(() => {
   getAllPublicBooks().then((count) => setTotalItems(count));
 }, []);


 const [categories, setCategories] = useState([]);
 const sizePerPage = 12;


 const getAllCategories = () => {
   CategoryServices.getAllCategories()
     .then((response) => {
       setCategories(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
 };


 const getPageBooks = (pageNumber, pageSize) => {
   BookServices.getPageBooks(pageNumber, pageSize)
     .then((response) => {
       setPageBooks(response.data);
     })
     .catch((error) => {
       console.log("loi lay ra page book");
       console.log(error);
     });
 };


 const findCondition = () => {
   if (searchMessage.length > 0) {
     const query = encodeURIComponent(searchMessage).replace(/%20/g, "%20");
     setDisplayMessage(searchMessage);
     filterBook(0, sizePerPage, query);
   } else {
     setDisplayMessage("");
     getPageBooks(0, sizePerPage);
   }
 };
 const handleReset = () => {
   setCondition("");
   getPageBooks(0, sizePerPage);
   getAllPublicBooks().then((count) => setTotalItems(count));
 };
 const filterBook = (pageNumber, pageSize, searchText) =>
   BookServices.filterBook(pageNumber, pageSize, searchText).then(
     (response) => {
       setPageBooks(response.data.content);
       setTotalItems(response.data.totalElements);
     }
   );


 const orderBook = (pageNumber, pageSize, field) =>
   BookServices.getPublicBookOrderBy(pageNumber, pageSize, field).then(
     (response) => {
       setPageBooks(response.data.content);
       setTotalItems(response.data.totalElements);
     }
   );
 useEffect(() => {
   filterBook(
     0,
     sizePerPage,
     encodeURIComponent(condition).replace(/%20/g, "%20")
   );
 }, []);


 useEffect(() => {
   getAllCategories();
 }, []);
 useEffect(() => {
   getPageBooks(0, sizePerPage);
 }, []);


 const handlePageChange = (current) => {
   if (checked.length > 0) {
     setCurrentPage(current);
     console.log("current" + current);
     getPageBooksByCategories(checked.join(","), current - 1, sizePerPage);
   } else {
     setCurrentPage(current);
     getPageBooks(current - 1, sizePerPage);
   }
 };


 const [checked, setChecked] = useState([]);
 const handleCheck = (categoryId) => {
   setChecked((prev) => {
     const isChecked = checked.includes(categoryId);
     if (isChecked) {
       //Uncheck
       return checked.filter((item) => item !== categoryId);
     } else {
       return [...prev, categoryId];
     }
   });
 };
 // useEffect(() => {
 //   if(checked.length!==0){
 //     handleSubmit();}
 // }, [checked]);


 const getPageBooksByCategories = (categoryIds, pageNumber, pageSize) => {
   BookServices.getPageBooksByCategories(categoryIds, pageNumber, pageSize)
     .then((response) => {
       setPageBooks(response.data);
       console.log("response" + response.data);
     })
     .catch((error) => {
       console.log("loi lay ra page book");
       console.log(error);
     });
 };


 const getBooksByCategories = (categoryIds) => {
   BookServices.getBooksByCategories(categoryIds)
     .then((response) => {
       setTotalItems(response.data.length);
     })
     .catch((error) => {
       console.log("loi lay ra number page book");
       console.log(error);
     });
 };
 console.log("total page: " + totalItems);


 const handleSubmit = (categoryId) => {
   // handleCheck(categoryId)
   console.log("check on submit:" + checked);
   setCurrentPage(1);
   console.log({ ids: checked });
   const categoryIds = checked.join(",");
   console.log(categoryIds);
   getPageBooksByCategories(categoryIds, 0, sizePerPage);
   getBooksByCategories(categoryIds);
 };
 const [isVisible, setIsVisible] = useState(false);


 const handleButtonClick = () => {
   setIsVisible(!isVisible);
   handleReset();
 };
 const handleOrder = (e) => {
   console.log(e.target.value);
   orderBook(e.target.value, 0, sizePerPage);
 };
 return (
   <>
     <div className="find d-flex justify-content-center homepage">
       <div className="itemSearch">
         <Button
           size="sm"
           variant="outline-info"
           type="button"
           style={{
             borderColor: "#eaa451",
             color: "white",
             backgroundColor: "#eaa451",
             boxShadow: "none",
             margin: "5px",
           }}
           // onClick={handleReset}
           onClick={handleButtonClick}
         >
           <FontAwesomeIcon icon={faList} />
         </Button>
       </div>
       {/* <div className="itemSearch"> */}
       <FormControl
         placeholder="Search Books Here"
         name="search"
         className={"info-border  text-black w-50 "}
         value={searchMessage}
         onChange={(e) => setSearchMessage(e.target.value)}
       />
       {/* </div> */}
       <div className="itemSearch">
         <Button
           size="sm"
           variant="outline-info"
           type="button"
           style={{
             borderColor: "#eaa451",
             color: "white",
             backgroundColor: "#eaa451",
             boxShadow: "none",
             margin: "5px",
           }}
           onClick={findCondition}
         >
           <FontAwesomeIcon icon={faSearch} />
         </Button>
       </div>
       <div className="itemSearch">
         <Button
           size="sm"
           variant="outline-danger"
           type="button"
           style={{
             borderColor: "#eaa451",
             color: "white",
             backgroundColor: "#eaa451",
             boxShadow: "none",
             margin: "5px",
           }}
           onClick={() => {
             setSearchMessage("");
             handleReset();
           }}
         >
           <FontAwesomeIcon icon={faTimes} />
         </Button>
       </div>
       <select name="" id="" onChange={handleOrder}>
         <option value="">--Sort by--</option>
         <option value="title">Title</option>
         <option value="price">Price</option>
       </select>
     </div>
     {isVisible && (
       <div className="categories row">
         {categories.map((category) => (
           <div className="select col-6 col-md-3 col-sm-4 d-flex ">
             <label key={category.categoryId}>
               <input
                 type="checkbox"
                 className="form-check-input w-20 h-20 ms-1 me-1"
                 checked={checked.includes(category.categoryId)}
                 onChange={() => handleCheck(category.categoryId)}
               />
               {category.categoryName}
             </label>
           </div>
         ))}


         <div className="btn btn-success" onClick={handleSubmit}>
           Find
         </div>
       </div>
     )}
     {displayMessage.length > 0 && (
       <div>
         <span>Search result for "</span>
         <span
           style={{ whiteSpace: "nowrap" }}
           dangerouslySetInnerHTML={{ __html: displayMessage }}
         />
         <span>"</span>
       </div>
     )}
     <div className="list-books row">
       {pageBooks.map((book) => (
         <div
           key={book.bookId}
           className={
             book.bookId + " col-lg-3 col-md-4 col-sm-6 col-xs-12 single-book"
           }
         >
           <Card className="card" style={{ width: "19rem", height: "28rem" }}>
             <div className="cover">
               <Card.Img
                 variant="top"
                 src={"http://localhost:6789/api/books/cover/" + book.bookId}
                 style={{ height: "14rem", width: "auto" }}
               />
             </div>
             <Card.Body style={{ height: "16rem" }}>
               <Card.Title
                 style={{
                   height: "3rem",
                   width: "auto",
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center",
                   color: "#1a1668",
                   fontWeight: "800",
                 }}
               >
                 {book.title}
               </Card.Title>
               <Card.Text
                 style={{
                   height: "2rem",
                   width: "auto",
                   color: "#eaa451",
                   fontWeight: "bold",
                 }}
               >
                 {book.authorName}
               </Card.Text>
               <Card.Text style={{ height: "1rem", width: "auto" }}>
                 {book.price}
               </Card.Text>
               <Link
                 to={"/book/view/" + book.bookId}
                 className="btn btn-info"
                 style={{ backgroundColor: "#1a1668", color: "white" }}
               >
                 Đọc Ngay{" "}
               </Link>
             </Card.Body>
           </Card>
         </div>
       ))}
     </div>


     <Pagination
       style={{
         borderColor: "#eaa451",
         color: "black",
         boxShadow: "none",
         margin: "5px",
       }}
       total={totalItems}
       defaultPageSize={sizePerPage}
       showTotal={(total, range) =>
         `${range[0]}-${range[1]} of ${total} items`
       }
       current={currentPage}
       onChange={(current) => {
         handlePageChange(current);
       }}
     />
   </>
 );
}


export default ListBook;
