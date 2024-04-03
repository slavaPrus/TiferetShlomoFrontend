import { createSlice } from '@reduxjs/toolkit';
const  initialValue = {
    Tests: []
}

const testSlice = createSlice({
    name:"test",
    initialState: initialValue,
    reducers:{
        setTests: (state , action)=>{
            
            state.Tests = action.payload;
        }
    }
})
export const {setTests}=testSlice.actions;
export default testSlice.reducer;