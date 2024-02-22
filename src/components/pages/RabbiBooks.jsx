import React, { useEffect, useState } from "react";
import FilterInput from "./FilterInput";
import SearchInput from "./SearchInput";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getBooksByPage,
  getFilterBooksByPage,
  getSearchBooksByPage,
} from "../../utils/BookUtil";
import { setBooks } from "../../features/bookSlice";
import BookGrid from "../BookGrid";

export default function RabbiBooks() {
  const dispatch = useDispatch();
  const [FetchCurrentPage, setFetchCurrentPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevStr, setPrevStr] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    fetchData(currentPage);
  }, []);

  const fetchData = async (page) => {
    try {
      const res = await getBooksByPage(page);
      dispatch(setBooks(res.length > 3 ? res.splice(1, res.length) : res));
      setFetchCurrentPage(page + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const books = useSelector((state) => state.book.Books);

  const handleSearchBooks = async (s) => {
    try {
      setIsSearch(true); // Set isSearch to true when searching
      setIsFilter(false); // Set isFilter to false when searching
      if (s !== "") {
        if (s === prevStr) {
          const res = await getSearchBooksByPage(s, currentPage);
          dispatch(setBooks(res.length > 3 ? res.splice(1, res.length) : res));
          setCurrentPage((prevPage) => prevPage + 1);
          setPrevStr(s);
        } else {
          const res = await getSearchBooksByPage(s, 1);
          dispatch(setBooks(res.length > 3 ? res.splice(1, res.length) : res));
          setCurrentPage(currentPage+1);
          setPrevStr(s);
        }
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
      ? handleSearchBooks(prevStr)
      : isFilter
        ? handleFilterCategory()
        : fetchData(currentPage);
  };

  const handleFilterCategory = async (str) => {
    try {
      if (str.length !== 0) {
        const res = await getFilterBooksByPage(str, currentPage);
        dispatch(setBooks(res));
        setCurrentPage(currentPage + 1);
        setIsSearch(false); // Set isSearch to false when filtering
        setIsFilter(true); // Set isFilter to true when filtering
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
        sx={{ p: "10px", justifyContent: "space-between" }}
      >
        {books &&
          books.length > 0 &&
          books.map((book, index) => {
            return <BookGrid index={index} book={book} key={index} />;
          })}
      </Grid>
      <Button disabled={books.length < 3} onClick={() => handleNextPage()}>
        הבא
      </Button>
    </Box>
  );
}
