import React, { useEffect, useState } from "react";
import FilterInput from "./FilterInput";
import SearchInput from "./SearchInput";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getLessonsByPage,
  getFilterLessonsByPage,
  getSearchLessonsByPage,
} from "../utils/LessonUtil";
import { setLessons } from "../features/lessonSlice";
import LessonGrid from "./LessonGrid";
import EditLessonAdmin from "./EditLessonAdmin";
import AddIcon from "@mui/icons-material/Add";
import EditObjectAdmin from "./EditObjectAdmin";


export default function RabbiLessons() {
  const dispatch = useDispatch();
  const [FetchCurrentPage, setFetchCurrentPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevStr, setPrevStr] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [filterCategory, setFilterCategory] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const oneUser = useSelector((state) => state.users.oneUser);
  const categories = ["מדרש רבה","שיעורים מספריו","חגים ומועדים","השקפה","הלווית הרב זצוק\"ל","סיפורים/הספדים/דברי שבח מפי מרן","קצרים","עין הרב ביהדות","רבנים/תלמידים מספרים","תיעודים מחיי הרב","סוגיות אקטואליות","טהרת הבית/שלום בית", "אמונה ובטחון", "מוסר","הלכה"];

  const emptyLesson = {
    LessonName: "",
    LessonSubject: "",
    LessonURL: "",
    LessonData: "",
    LessonType: "",
  };
  const [newLesson, setNewLesson] = useState(emptyLesson);
  const [isNewLesson, setIsNewLesson] = useState(false);
  useEffect(() => {
    fetchData(FetchCurrentPage);
  }, []);

  const fetchData = async (page) => {
    try {
      const res = await getLessonsByPage(page);
      // Check if the last element is null
      const lastElementIsNull = res[res.length - 1] === null;
      // Update hasNext flag
      setHasNext(!lastElementIsNull);
      // Remove the null element if present
      if (lastElementIsNull) {
        res.pop();
      }
      // Dispatch the books
      dispatch(setLessons(res));
      // Update current page
      setFetchCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Lessons = useSelector((state) => state.lesson.Lessons);

  const handleSearchLessons = async (s, page) => {
    try {
      if (s !== "") {
        page = page || 1;
        setIsSearch(true); // Set isSearch to true when searching
        setIsFilter(false); // Set isFilter to false when searching
        const res = await getSearchLessonsByPage(s, s === prevStr ? page : 1);
        const lastElementIsNull = res[res.length - 1] === null;
        // Update hasNext flag
        setHasNext(!lastElementIsNull);
        // Remove the null element if present
        if (lastElementIsNull) {
          res.pop();
        }
        setCurrentPage(page);
        dispatch(setLessons(res));
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
      ? handleSearchLessons(prevStr, currentPage + 1)
      : isFilter
        ? handleFilterCategory(filterCategory, currentPage + 1)
        : fetchData(FetchCurrentPage + 1);
  };

  const handlePrevPage = () => {
    isSearch
      ? handleSearchLessons(prevStr, currentPage - 1)
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
        const res = await getFilterLessonsByPage(
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
        dispatch(setLessons(res));
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
  const handleClickAddLesson = () => {
    setOpen(true);
    setSelectedLesson(newLesson);
    setIsNewLesson(true);
  };

  return (
    <>
      {
          <EditObjectAdmin
            open={open}
            onClose={setOpen}
            objectType={"Lesson"}
            objectData={selectedLesson}
            setObject={setSelectedLesson}
            isNewObject={isNewLesson}
          />
      }
      {/* <EditLessonAdmin
          open={open}
          onClose={setOpen}
          Lesson={selectedLesson}
          setLesson={setSelectedLesson}
          isNewLesson={isNewLesson}
        /> */}
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
          <SearchInput handleChange={handleSearchLessons} />
        </Box>
        {oneUser && oneUser.userType === 2 && (
          <Button onClick={handleClickAddLesson}>
            הוספת שיעור
            <AddIcon />
          </Button>
        )}
        <Grid
          container
          width={"80%"}
          flexWrap={"wrap"}
          sx={{ p: "10px", justifyContent: "space-between", rowGap: "20px" }}
        >
          {Lessons &&
            Lessons.length > 0 &&
            Lessons.map((lesson, index) => {
              return (
                <LessonGrid
                  index={index}
                  lesson={lesson}
                  key={index}
                  setOpen={setOpen}
                  setSelectedLesson={setSelectedLesson}
                  setIsNewLesson={setIsNewLesson}
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
