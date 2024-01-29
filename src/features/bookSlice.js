import { createSlice } from '@reduxjs/toolkit';
const  initiavalue = {
    Books: []
}

const userSlice = createSlice({
    name:"books",
    initialState: initiavalue,
    reducers:{
        setBooks: (state , actions)=>{
            
            state.Books = actions.payload;
        }
    }


})
export const {setBooks}=userSlice.actions;
export default userSlice.reducer;