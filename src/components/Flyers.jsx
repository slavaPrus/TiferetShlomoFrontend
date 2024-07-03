import React, { useEffect, useState } from "react";
import FilterInput from "./FilterInput";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import { Alert, Box, Button, Grid, Snackbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFlyers } from "../features/flyerSlice";
import FlyerGrid from "./FlyerGrid";
import EditObjectAdmin from "./EditObjectAdmin";
import AddIcon from "@mui/icons-material/Add";
import {
  getFlyersByPage,
  getFilterFlyersByPage,
  getSearchFlyersByPage,
} from "../utils/FlyerUtil";

const emptyFlyer = {
  flyerUrl: "",
  parashatShavuaDescribe: "",
};

export default function Flyers() {
  const [newFlyer, setNewFlyer] = useState(emptyFlyer);
  const dispatch = useDispatch();
  const [fetchCurrentPage, setFetchCurrentPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevStr, setPrevStr] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [filterCategory, setFilterCategory] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedFlyer, setSelectedFlyer] = useState(null);
  const [isNewFlyer, setIsNewFlyer] = useState(false);
  const oneUser = useSelector((state) => state.users.oneUser);
  const flyers = useSelector((state) => state.flyer.Flyers);
  const [alert, setAlert] = useState({ open: false, severity: "", message: "" });

  useEffect(() => {
    fetchData(fetchCurrentPage);
  }, []);

  const fetchData = async (page) => {
    try {
      const res = await getFlyersByPage(page);
      const lastElementIsNull = res[res.length - 1] === null;
      setHasNext(!lastElementIsNull);
      if (lastElementIsNull) {
        res.pop();
      }
      dispatch(setFlyers(res));
      setFetchCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchFlyers = async (s, page) => {
    try {
      if (s !== "") {
        page = page || 1;
        setIsSearch(true);
        setIsFilter(false);
        const res = await getSearchFlyersByPage(s, s === prevStr ? page : 1);
        const lastElementIsNull = res[res.length - 1] === null;
        setHasNext(!lastElementIsNull);
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
        : fetchData(fetchCurrentPage + 1);
  };

  const handlePrevPage = () => {
    isSearch
      ? handleSearchFlyers(prevStr, currentPage - 1)
      : isFilter
        ? handleFilterCategory(filterCategory, currentPage - 1)
        : fetchData(fetchCurrentPage - 1);
  };

  const handleFilterCategory = async (str, page) => {
    try {
      if (str !== "הצג הכל") {
        page = page || 1;
        setIsSearch(false);
        setIsFilter(true);
        setCurrentPage(page);
        const res = await getFilterFlyersByPage(
          str,
          filterCategory === str ? page : 1
        );
        const lastElementIsNull = res[res.length - 1] === null;
        setHasNext(!lastElementIsNull);
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

  const handleClickAddFlyer = () => {
    setOpen(true);
    setSelectedFlyer(newFlyer);
    setIsNewFlyer(true);
  };
  const handleCloseAlert = () => {
    setAlert({ open: false, severity: "", message: "" });
  };

  return (
    <>
      <EditObjectAdmin
        open={open}
        onClose={setOpen}
        flyer={selectedFlyer}
        objectData={selectedFlyer}
        objectType={"Flyer"}
        setObject={setSelectedFlyer}
        setFlyer={setSelectedFlyer}
        isNewObject={isNewFlyer}
      />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="10px"
      >
         <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            variant="filled"
            sx={{ width: "80%" }}
            onClose={handleCloseAlert}
            severity={alert.severity}
          >
            {alert.message}
          </Alert>
        </Snackbar>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width={"80%"}
          padding={"45px"}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            width={"50%"}
            gap={"10px"}
          >
            <SearchInput handleChange={handleSearchFlyers} />
          </Box>
          <Typography variant="h4" color={"#0B1365"} fontWeight={"700"}>
            עלוני פרשת שבוע
          </Typography>
        </Box>
        {oneUser && oneUser.userType === 2 && (
          <Button onClick={handleClickAddFlyer}>
            הוספת עלון
            <AddIcon />
          </Button>
        )}
        <Grid
          container
          width="80%"
          flexWrap="wrap"
          sx={{
            border: "2px solid #e3e2e2",
            borderRadius: "35px 35px 0 0",
            p: "70px",
            justifyContent: "space-between",
            rowGap: "50px",
          }}        >
          {flyers &&
            flyers.length > 0 &&
            flyers.map((flyer, index) => (
              <FlyerGrid
                index={index}
                flyer={flyer}
                key={index}
                setOpen={setOpen}
                setAlert={setAlert}
                setSelectedFlyer={setSelectedFlyer}
                setIsNewFlyer={setIsNewFlyer}
              />
            ))}
        </Grid>
        <Button
          disabled={
            isFilter || isSearch ? currentPage === 1 : fetchCurrentPage === 1
          }
          onClick={handlePrevPage}
        >
          הקודם
        </Button>
        <Button disabled={!hasNext} onClick={handleNextPage}>
          הבא
        </Button>
      </Box>
    </>
  );
}
