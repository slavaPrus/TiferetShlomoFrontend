import React, { useEffect, useState } from "react";
import FilterInput from "./FilterInput";
import SearchInput from "./SearchInput";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByPage, getSearchBooksByPage } from "../../utils/BookUtil";
import { setBooks } from "../../features/bookSlice";
import BookGrid from "../BookGrid";

export default function RabbiBooks() {
  // const books =["aaa","bbb"]
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetchData(currentPage);
  }, []);

  const fetchData = async (page) => {
    try {
      // Call your asynchronous function here, for example getAllBooks

      const res = await getBooksByPage(page);

      dispatch(setBooks(res));
      setCurrentPage(currentPage + 1);

      // Other logic after the async function completes
    } catch (error) {
      // Handle errors if necessary
      console.error("Error fetching data:", error);
    }
  };

  const books = useSelector((state) => state.book.Books);
  const handleSearchBooks = async (str) => {
    try {
      const res = await getSearchBooksByPage(str, 1);
      console.log(res);
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
        <FilterInput />
        <SearchInput handleChange={handleSearchBooks} />
      </Box>
      <Grid container width={"80%"} flexWrap={"warp"}sx={{p:"10px",justifyContent:"space-between"}}>
        {books &&
          books.length > 0 &&
          books.map((book, index) => {
            return <BookGrid index={index} book={book} />;
          })}
      </Grid>
      <Button onClick={() => fetchData(currentPage + 1)}>הבא</Button>
    </Box>
  );
}
