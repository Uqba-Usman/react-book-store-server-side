import React, { useState, useEffect } from "react";
import SingleBook from "./books/singleBook";
import { Grid } from "@material-ui/core";
import _ from "lodash";
import axios from "axios";
import bookService from "../services/BookService";
import SearchBox from "./searchBox/searchBox";
import Pagination from "./pagination/Pagination";
import { paginate } from "./pagination/paginate";

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState();
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [totalCount, setTotalCount] = useState();
  const [data, setData] = useState([]);
  console.log("Initialzation State");
  // const booksnew = [
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "1" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "2" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "3" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "4" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "5" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "6" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "7" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "8" },
  //   { title: "Book Name", description: "QWERT", price: "100", isbn: "9" },
  // ];
  // setBooks(booksnew);

  // const getBooksData = async () => {
  //   console.log("Get Books Data");
  //   try {
  //     const res = await bookService.getBooks();
  //     console.log("RES", res);
  //     await setBooks(res);
  //     const result = getPageData(res);
  //     console.log("RESULT", result);
  //     setData(result.data);
  //     setTotalCount(result.totalCount);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   console.log("USE EFFECT");
  //   getBooksData();
  //   // bookService
  //   //   .getBooks()
  //   //   .then((res) => setBooks(res))
  //   //   .catch((err) => console.log(err));
  //   console.log("NEXT");
  // }, []);

  console.log("Functions");

  const getPageData = (cd, cP, pS, sQ) => {
    console.log("GET APGE DTA", cd);
    let filtered = cd;
    if (sQ) {
      filtered = books.filter((b) =>
        b.title.toLowerCase().startsWith(sQ.toLowerCase())
      );
    }
    console.log("FILTERED", filtered);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    console.log("SORTED", sorted);
    const newData = paginate(sorted, cP, pS);
    console.log("NEW DATA", newData, filtered.length);
    setData(newData);
    setTotalCount(filtered.length);
  };

  useEffect(() => {
    bookService
      .getBooks()
      .then((res) => {
        console.log("RESPONSE", res);
        setBooks(res);
        getPageData(res, currentPage, pageSize, searchQuery);
      })
      .catch((err) => console.log(err));

    // axios
    //   .get("localhost:4500/api/books")
    //   .then((result) => setBooks(result))
    //   .catch((error) => console.log(error));
  }, []);

  const handlePageChange = async (page) => {
    console.log("HPC", page);
    await setCurrentPage(page);
    console.log("CURRENT PAGE", currentPage);
    getPageData(books, page, pageSize, searchQuery);
  };
  const handleSearch = (query) => {
    console.log("HS", query);
    setSearchQuery(query);
    setCurrentPage(1);
    getPageData(books, 1, pageSize, query);
  };

  return (
    <section>
      {/* {books.length === 0 && return <p>There is no book available</p>} */}
      <div className="container">
        <div class="col-lg-4  center pb-5">
          <SearchBox value={searchQuery} onChange={handleSearch} />
        </div>

        <div class="row">
          {data.length === 0 ? (
            <p>There is no book available</p>
          ) : (
            <div class="row">
              {data.map((book, index) => (
                <SingleBook key={index} book={book} />
              ))}
            </div>
          )}
        </div>
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Blogs;
