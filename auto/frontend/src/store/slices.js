import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    status:false,
    userInfo:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,

    reducers:{
        login: (state,action) =>{
            state.status = true
            state.employeeInfo = action.payload
        },

        logOut: (state)=>{
            state.status = false
            state.employeeInfo = null
        }
    }
})

export const {login, logOut} = authSlice.actions
export default authSlice.reducer