import {creatSlice} from "@reduxjs/toolkit";
const  initiavalue = {
    logedUser: null
}

const userSlice = creatSlice({
    name:"user",
    initalState: initiavalue,
    reducers:{
        setLoggedUser: (state , action)=>{
            
            state.logedUser = action.payload;
        }
    }


})
export const {setLoggedUser}=userSlice.action;
export default userSlice.reducer;