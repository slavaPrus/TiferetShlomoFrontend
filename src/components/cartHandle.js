export const handleAddCart = (book) => {
  let cartLocal = localStorage.getItem("cartItems");
  let cartItems = cartLocal == null ? [] : JSON.parse(cartLocal);
  const existingItem = cartItems.find((item) => item.id === book.bookId);

  if (existingItem) {
    // אם המוצר קיים בעגלה
    // הוספת הכמות של המוצר החדש לכמות המוצר הקיים
    existingItem.quantity += book.quantity;
  } else {
    // אם המוצר לא קיים בעגלה
    // הוספת המוצר החדש לעגלה
    cartItems.push(book);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  alert("נוסף לעגלה");
};
export const handleDeleteBookFromCart = (bookToRemove) => {
  // Retrieve cart items from local storage
  let cartLocal = localStorage.getItem("cartItems");
  let cartItems = cartLocal == null ? [] : JSON.parse(cartLocal);

  // Find the index of the first occurrence of the book to remove
  const indexToRemove = cartItems.findIndex(
    (book) => book.bookId === bookToRemove.bookId
  );

  // If the book is found in the cart
  if (indexToRemove !== -1) {
    // Remove the book from the cart
    const updatedCartItems = [
      ...cartItems.slice(0, indexToRemove),
      ...cartItems.slice(indexToRemove + 1),
    ];

    // Update local storage with the updated cart items
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    alert("המוצר הוסר מהעגלה");

    // Update state to reflect the change
    return updatedCartItems;

    // Alert the user
  }
};
