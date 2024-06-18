import { createSlice } from '@reduxjs/toolkit';
const  initialValue = {
    Lessons: []
}

const lessonSlice = createSlice({
    name:"lesson",
    initialState: initialValue,
    reducers:{
        setLessons: (state , action)=>{
            
            state.Lessons = action.payload;
        }
    }
})
export const {setLessons}=lessonSlice.actions;
export default lessonSlice.reducer;