import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  oneUser: null,
};

const userSlice = createSlice({
  name: "users",
  initialState: initialValue,
  reducers: {
    setOneUser: (state, action) => {
      state.oneUser = action.payload;
    },
  },
});
export const { setOneUser } = userSlice.actions;
export default userSlice.reducer;
