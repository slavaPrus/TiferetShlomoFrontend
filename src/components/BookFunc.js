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
    debugger
    const existingItem = cartItems.find((item) => item.bookId === book.bookId);
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.pictureData = "";
    } else {
      setCartItems((prev) => [
        ...prev,
        { ...book, quantity: 1, pictureData: "" },
      ]);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
    // מחיקת הספר מהעגלה כאשר הכמות מגיעה ל-1
    try {
      const updateItems = cartItems.filter(
        (item) => item.bookId !== book.bookId
      );
      setCartItems(updateItems);

      localStorage.setItem("cartItems", JSON.stringify(updateItems));
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
        message: " ארעה שגיאה במהלך המחיקה של הספר",
      });
     setTimeout(
      () => setAlert({ open: false, severity: "", message: "" }),
      9000
    );
    }
  } else if (quantity > 1) {
    const updateItems = cartItems.map((item) => {
      if (item.bookId !== book.bookId) return book;
      return {
        ...book,
        quantity: item.quantity - 1,
      };
    });
    setCartItems(updateItems);

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
