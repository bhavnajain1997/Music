import { createSlice } from "@reduxjs/toolkit";

const loginSLice = createSlice({
    name : "login",
    initialState : {
        showLoginpage : false,
    },
    reducers: {
        toogleLoginPageView : (state) => {
            state.showLoginpage = !state.showLoginpage;
       },
       
    }
})

export const { toogleLoginPageView} = loginSLice.actions;
export default loginSLice.reducer;