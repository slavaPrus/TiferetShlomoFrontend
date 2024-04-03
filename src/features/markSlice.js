import { createSlice } from '@reduxjs/toolkit';
const  initialValue = {
    Marks: []
}

const markSlice = createSlice({
    name:"marks",
    initialState: initialValue,
    reducers:{
        setMarks: (state , action)=>{
            
            state.Marks = action.payload;
        }
    }
})
export const {setMarks}=markSlice.actions;
export default markSlice.reducer;