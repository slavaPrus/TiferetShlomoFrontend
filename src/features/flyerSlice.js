import { createSlice } from '@reduxjs/toolkit';
import Flyers from '../components/Flyers';
const  initialValue = {
    Flyers: []
}

const flyerSlice = createSlice({
    name:"flyer",
    initialState: initialValue,
    reducers:{
        setFlyers: (state , action)=>{
            
            state.Flyers = action.payload;
        }
    }
})
export const {setFlyers}=flyerSlice.actions;
export default flyerSlice.reducer;