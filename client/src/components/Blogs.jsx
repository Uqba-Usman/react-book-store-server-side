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
      filtered = books.filter(
        (b) =>
          b.title.toLowerCase().startsWith(sQ.toLowerCase()) ||
          b.author.toLowerCase().startsWith(sQ.toLowerCase()) ||
          b.isbn.toLowerCase().startsWith(sQ.toLowerCase())
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
    <div>
      <section
        id="page-title"
        class="text-light"
        data-bg-parallax="polo/images/e.jpg"
      >
        <div class="container">
          <div class="page-title">
            <h1>Welcome to UUTT</h1>
            <p>Book Store</p>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div class="col-lg-4 center pb-5">
            <SearchBox value={searchQuery} onChange={handleSearch} />
          </div>

          {data.length === 0 ? (
            <p>There is no book available</p>
          ) : (
            <div class="row">
              {data.map((book, index) => (
                <SingleBook key={index} book={book} />
              ))}
            </div>
          )}

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
      <section id="section5" class="background-grey p-t-100 p-b-100">
        <div class="container">
          <div class="heading-text heading-section text-center">
            <h2>Meet our Team</h2>
            <p>A true story, that never been told!</p>
          </div>
          <div class="row team-members team-members-circle m-b-40">
            <div class="col-lg-3">
              <div class="team-member">
                <div class="team-image">
                  <img src="polo/images/uqba.jpg" />
                </div>
                <div class="team-desc">
                  <h3>Muhammad Uqba</h3>
                  <span>Software Developer</span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing tristique
                    hendrerit laoreet.{" "}
                  </p>
                  <div class="align-center">
                    <a
                      class="btn btn-xs btn-slide btn-light"
                      href="https://www.facebook.com/profile.php?id=100008788505872"
                    >
                      <i class="fab fa-facebook-f"></i>
                      <span>Facebook</span>
                    </a>
                    <a
                      class="btn btn-xs btn-slide btn-light"
                      href="https://twitter.com/UsmanUqba?s=09"
                      data-width="100"
                    >
                      <i class="fab fa-twitter"></i>
                      <span>Twitter</span>
                    </a>
                    <a
                      class="btn btn-xs btn-slide btn-light"
                      href="https://www.instagram.com/uqbausman/?hl=en"
                      data-width="118"
                    >
                      <i class="fab fa-instagram"></i>
                      <span>Instagram</span>
                    </a>
                    <a
                      class="btn btn-xs btn-slide btn-light"
                      href="mailto:muqbausman@gmail.com"
                      data-width="80"
                    >
                      <i class="far fa-envelope"></i>
                      <span>Mail</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="team-member">
                <div class="team-image">
                  <img src="polo/images/umar.jpg" />
                </div>
                <div class="team-desc">
                  <h3>Umar Shahbaz</h3>
                  <span>Software Developer</span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing tristique
                    hendrerit laoreet.{" "}
                  </p>
                  <div class="align-center">
                    <a class="btn btn-xs btn-slide btn-light" href="#">
                      <i class="fab fa-facebook-f"></i>
                      <span>Facebook</span>
                    </a>
                    <a
                      class="btn btn-xs btn-slide btn-light"
                      href="//#region "
                      data-width="100"
                    >
                      <i class="fab fa-twitter"></i>
                      <span>Twitter</span>
                    </a>
                    <a
                      class="btn btn-xs btn-slide btn-light"
                      href="#"
                      data-width="118"
                    >
                      <i class="fab fa-instagram"></i>
                      <span>Instagram</span>
                    </a>
                    <a
                      class="btn btn-xs btn-slide btn-light"
                      href="mailto:#"
                      data-width="80"
                    >
                      <i class="far fa-envelope"></i>
                      <span>Mail</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="team-member">
                <div class="team-image">
                  <img src="polo/images/talha.jpeg" />
                </div>
                <div class="team-desc">
                  <h3>Talha Ahmed</h3>
                  <span>Software Developer</span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing tristique
                    hendrerit laoreet.{" "}
                  </p>
                  <div class="align-center">
                    <a class="btn btn-xs btn-slide btn-light" href="#">
                      <i class="fab fa-facebook-f"></i>
                      <span>Facebook</span>
                    </a>
                    <a
                      class="btn btn-xs btn-slide btn-light"
                      href="#"
                      data-width="100"
                    >
                      <i class="fab fa-twitter"></i>
                      <span>Twitter</span>
                    </a>
                    <a
                      class="btn btn-xs btn-slide btn-light"
                      href="#"
                      data-width="118"
                    >
                      <i class="fab fa-instagram"></i>
                      <span>Instagram</span>
                    </a>
                    <a
                      class="btn btn-xs btn-slide btn-light"
                      href="mailto:#"
                      data-width="80"
                    >
                      <i class="far fa-envelope"></i>
                      <span>Mail</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="team-member">
                <div class="team-image">
                  <img src="polo/images/tahir.jpg" />
                </div>
                <div class="team-desc">
                  <h3>Tahir Tariq</h3>
                  <span>Software Developer</span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing tristique
                    hendrerit laoreet.{" "}
                  </p>
                  <div class="align-center">
                    <a class="btn btn-xs btn-slide btn-light" href="#">
                      <i class="fab fa-facebook-f"></i>
                      <span>Facebook</span>
                    </a>
                    <a
                      class="btn btn-xs btn-slide btn-light"
                      href="#"
                      data-width="100"
                    >
                      <i class="fab fa-twitter"></i>
                      <span>Twitter</span>
                    </a>
                    <a
                      class="btn btn-xs btn-slide btn-light"
                      href="#"
                      data-width="118"
                    >
                      <i class="fab fa-instagram"></i>
                      <span>Instagram</span>
                    </a>
                    <a
                      class="btn btn-xs btn-slide btn-light"
                      href="mailto:#"
                      data-width="80"
                    >
                      <i class="far fa-envelope"></i>
                      <span>Mail</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
