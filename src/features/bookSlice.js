import { createSlice } from '@reduxjs/toolkit';
const  initialValue = {
    Books: []
}

const bookSlice = createSlice({
    name:"book",
    initialState: initialValue,
    reducers:{
        setBooks: (state , action)=>{
            
            state.Books = action.payload;
        }
    }
})
export const {setBooks}=bookSlice.actions;
export default bookSlice.reducer;