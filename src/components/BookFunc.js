import { deleteBook } from "../utils/BookUtil";

export const handleDeleteBook = async (book, setAlert) => {
  try {
    const res = await deleteBook(book.bookId);
    if (res.status === 200) {
      setAlert({
        open: true,
        severity: "success",
        message: "המחיקה בוצעה בהצלחה",
      });
      setTimeout(
        () => setAlert({ open: false, severity: "", message: "" }),
        9000
      );
    } else {
      setAlert({
        open: true,
        severity: "error",
        message: "ארעה שגיאה במהלך המחיקה",
      });
      setTimeout(
        () => setAlert({ open: false, severity: "", message: "" }),
        9000
      );
    }
  } catch (error) {
    setAlert({
      open: true,
      severity: "error",
      message: "ארעה שגיאה במהלך המחיקה",
    });
    setTimeout(
      () => setAlert({ open: false, severity: "", message: "" }),
      9000
    );
  }
};

export const handleAddCart = (book, setAlert, cartItems, setCartItems) => {
  try {
    const existingItem = cartItems.find((item) => item.bookId === book.bookId);
    let newCartItems;
    if (existingItem) {
      newCartItems = cartItems.map((item) =>
        item.bookId === book.bookId
          ? { ...item, quantity: item.quantity + 1, pictureData: "" }
          : item
      );
    } else {
      newCartItems = [
        ...cartItems,
        { ...book, quantity: 1, pictureData: "" },
      ];
    }
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    setAlert({
      open: true,
      severity: "success",
      message: "הספר נוסף לעגלה",
    });
    setTimeout(
      () => setAlert({ open: false, severity: "", message: "" }),
      9000
    );
  } catch (error) {
    setAlert({
      open: true,
      severity: "error",
      message: "ארעה שגיאה בהוספת הספר",
    });
    setTimeout(
      () => setAlert({ open: false, severity: "", message: "" }),
      9000
    );
  }
};

export const handleDecreaseQuantity = (
  book,
  quantity,
  setAlert,
  cartItems,
  setCartItems
) => {
  if (quantity === 1) {
    // מחיקת הספר מהעגלה כאשר הכמות מגיעה ל-0
    try {
      const updatedItems = cartItems.filter(
        (item) => item.bookId !== book.bookId
      );
      setCartItems(updatedItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      setAlert({
        open: true,
        severity: "success",
        message: "הספר הוסר מהעגלה בהצלחה",
      });
      setTimeout(
        () => setAlert({ open: false, severity: "", message: "" }),
        9000
      );
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        message: "ארעה שגיאה במהלך המחיקה של הספר",
      });
      setTimeout(
        () => setAlert({ open: false, severity: "", message: "" }),
        9000
      );
    }
  } else if (quantity > 1) {
    const updatedItems = cartItems.map((item) =>
      item.bookId === book.bookId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    setAlert({
      open: true,
      severity: "success",
      message: "כמות הספר עודכנה בהצלחה",
    });
    setTimeout(
      () => setAlert({ open: false, severity: "", message: "" }),
      9000
    );
  }
};

