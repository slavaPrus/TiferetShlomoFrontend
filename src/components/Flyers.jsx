import React, {useEffect,useState}from "react";
import FilterInput from "./FilterInput";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {setFlyers} from "../features/flyerSlice";
import FlyerGrid from "./FlyerGrid";
// import EditFlyerAdmin from "./EditFlyerAdmin";
import AddIcon from "@mui/icons-material/Add";
import {
    getFlyersByPage,
    getFilterFlyersByPage,
    getSearchFlyersByPage,
  } from "../utils/FlyerUtil";


export default function Flyers() {
    const dispatch = useDispatch();
    const [FetchCurrentPage, setFetchCurrentPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [prevStr, setPrevStr] = useState("");
    const [isFilter, setIsFilter] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [filterCategory, setFilterCategory] = useState([]);
    const [hasNext, setHasNext] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedFlyer, setSelectedFlyer] = useState(null);
    const oneUser = useSelector((state) => state.users.oneUser);
    const categories = ["בראשית","שמות", "ויקרא", "במדבר", "דברים"];
  
    const emptyFlyer = {
      FlyerName: "",
      FlyerUrl: "",
      ParashatShavua: "",
    
    };
    const [newFlyer, setNewFlyer] = useState(emptyFlyer);
    const [isNewFlyer, setIsNewFlyer] = useState(false);
    useEffect(() => {
      fetchData(FetchCurrentPage);
    }, []);
  
    const fetchData = async (page) => {
      try {
        const res = await getFlyersByPage(page);
        // Check if the last element is null
        const lastElementIsNull = res[res.length - 1] === null;
        // Update hasNext flag
        setHasNext(!lastElementIsNull);
        // Remove the null element if present
        if (lastElementIsNull) {
          res.pop();
        }
        // Dispatch the flyer
        dispatch(setFlyers(res));
        // Update current page
        setFetchCurrentPage(page);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const flyers = useSelector((state) => state.flyer.Flyers);
  
    const handleSearchFlyers = async (s, page) => {
      try {
        if (s !== "") {
          page = page || 1;
          setIsSearch(true); // Set isSearch to true when searching
          setIsFilter(false); // Set isFilter to false when searching
          const res = await getSearchFlyersByPage(s, s === prevStr ? page : 1);
          const lastElementIsNull = res[res.length - 1] === null;
          // Update hasNext flag
          setHasNext(!lastElementIsNull);
          // Remove the null element if present
          if (lastElementIsNull) {
            res.pop();
          }
          setCurrentPage(page);
          dispatch(setFlyers(res));
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
        ? handleSearchFlyers(prevStr, currentPage + 1)
        : isFilter
          ? handleFilterCategory(filterCategory, currentPage + 1)
          : fetchData(FetchCurrentPage + 1);
    };
  
    const handlePrevPage = () => {
      isSearch
        ? handleSearchFlyers(prevStr, currentPage - 1)
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
          const res = await getFilterFlyersByPage(
            str,
            filterCategory === str ? page : 1
          );
          const lastElementIsNull = res[res.length - 1] === null;
          // Update hasNext flag
          setHasNext(!lastElementIsNull);
          // Remove the null element if present
          if (lastElementIsNull) {
            res.pop();
          }
          dispatch(setFlyers(res));
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
    const handleClickAddFlyer= () => {
      setOpen(true);
      setSelectedFlyer(newFlyer);
      setIsNewFlyer(true);
    };
  
    return (
      <>
        {
          // <EditFlyerAdmin
          //   open={open}
          //   onClose={setOpen}
          //   flyer={selectedFlyer}
          //   setflyer={setSelectedFlyer}
          //   isNewFlyer={isNewFlyer}
          // />
        }
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
            justifyContent={"space-between"}
            width={"90%"}
          >
            <FilterInput
              handleChange={handleFilterCategory}
              categories={categories}
            />
            <SearchInput handleChange={handleSearchFlyers} />
          </Box>
          {oneUser && oneUser.userType === 2 && (
            <Button onClick={handleClickAddFlyer}>
              הוספת עלון
              <AddIcon />
            </Button>
          )}
          <Grid
            container
            width={"80%"}
            flexWrap={"wrap"}
            sx={{ p: "10px", justifyContent: "space-between", rowGap: "20px" }}
          >
            {flyers &&
              flyers.length > 0 &&
              flyers.map((flyer, index) => {
                return (
                  <FlyerGrid
                    index={index}
                    flyer={flyer}
                    key={index}
                    setOpen={setOpen}
                    setSelectedFlyer={setSelectedFlyer}
                    setIsNewFlyer={setIsNewFlyer}
                  />
                );
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
      </>
    );
  }
  