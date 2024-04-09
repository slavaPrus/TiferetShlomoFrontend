import React, { useEffect, useState } from "react";
import FilterInput from "./FilterInput";
import SearchInput from "./SearchInput";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getBooksByPage,
  getFilterBooksByPage,
  getSearchBooksByPage,
} from "../utils/BookUtil";
import { setBooks } from "../features/bookSlice";
import BookGrid from "./BookGrid";

export default function RabbiBooks() {
  const dispatch = useDispatch();
  const [FetchCurrentPage, setFetchCurrentPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevStr, setPrevStr] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [filterCategory, setFilterCategory] = useState([]);
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    fetchData(FetchCurrentPage);
  }, []);

  const fetchData = async (page) => {
    try {
      const res = await getBooksByPage(page);
      // Check if the last element is null
      const lastElementIsNull = res[res.length - 1] === null;
      // Update hasNext flag
      setHasNext(!lastElementIsNull);
      // Remove the null element if present
      if (lastElementIsNull) {
        res.pop();
      }
      // Dispatch the books
      dispatch(setBooks(res));
      // Update current page
      setFetchCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const books = useSelector((state) => state.book.Books);

  const handleSearchBooks = async (s, page) => {
    try {
      if (s !== "") {
        page = page || 1;
        setIsSearch(true); // Set isSearch to true when searching
        setIsFilter(false); // Set isFilter to false when searching
        const res = await getSearchBooksByPage(s,s === prevStr ? page : 1);
        const lastElementIsNull = res[res.length - 1] === null;
        // Update hasNext flag
        setHasNext(!lastElementIsNull);
        // Remove the null element if present
        if (lastElementIsNull) {
          res.pop();
        }
        setCurrentPage(page);
        dispatch(setBooks(res));
        setPrevStr(s);
      } else {
        setPrevStr("");
        setCurrentPage(1);
        fetchData(1);
        setIsSearch(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNextPage = () => {
    isSearch
      ? handleSearchBooks(prevStr, currentPage + 1)
      : isFilter
        ? handleFilterCategory(filterCategory, currentPage + 1)
        : fetchData(FetchCurrentPage + 1);
  };
  const handlePrevPage = () => {
    isSearch
      ? handleSearchBooks(prevStr, currentPage - 1)
      : isFilter
        ? handleFilterCategory(filterCategory, currentPage - 1)
        : fetchData(FetchCurrentPage - 1);
  };

  const handleFilterCategory = async (str, page) => {
    try {
      if (str !== "הצג הכל") {
        page = page || 1;
        setIsSearch(false); // Set isSearch to false when filtering
        setIsFilter(true); // Set isFilter to true when filtering
        setCurrentPage(page);
        debugger
        const res = await getFilterBooksByPage(str,filterCategory===str?page:1);
        const lastElementIsNull = res[res.length - 1] === null;
        // Update hasNext flag
        setHasNext(!lastElementIsNull);
        // Remove the null element if present
        if (lastElementIsNull) {
          res.pop();
        }
        dispatch(setBooks(res));
        setFilterCategory(str);
      } else {
        setCurrentPage(1);
        fetchData(1);
        setIsFilter(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"10px"}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-around"}
        gap={"5px"}
        padding={"20px"}
      >
        <FilterInput handleChange={handleFilterCategory} />
        <SearchInput handleChange={handleSearchBooks} />
      </Box>
      <Grid
        container
        width={"80%"}
        flexWrap={"wrap"}
        sx={{ p: "10px", justifyContent: "space-between",rowGap:"20px"}}
      >
        {books &&
          books.length > 0 &&
          books.map((book, index) => {
            return <BookGrid index={index} book={book} key={index} />;
          })}
      </Grid>
      <Button
        disabled={
          isFilter || isSearch ? currentPage === 1 : FetchCurrentPage === 1
        }
        onClick={() => handlePrevPage()}
      >
        הקודם
      </Button>
      <Button disabled={!hasNext} onClick={() => handleNextPage()}>
        הבא
      </Button>
    </Box>
  );
}
