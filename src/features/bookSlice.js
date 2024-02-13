import { createSlice } from '@reduxjs/toolkit';
const  initiavalue = {
    Books: []
}

const bookSlice = createSlice({
    name:"book",
    initialState: initiavalue,
    reducers:{
        setBooks: (state , actions)=>{
            
            state.Books = actions.payload;
        }
    }
})
export const {setBooks}=bookSlice.actions;
export default bookSlice.reducer;