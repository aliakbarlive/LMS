import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Action } from "history";

export type userPayload = {
    firstName: string
    lastName: string
    middleName:string
    email: string
    userName: string
    password: string
    profilePic:any | null
    role:Array<string | number>
}

const initialState: userPayload = {
    firstName: '',
    lastName: '',
    middleName:'',
    email: '',
    userName: '',
    password: '',
    profilePic: null,
    role:[],
}

const createUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        newCreatedUser: (state, action: PayloadAction<userPayload>)=>{
             state.firstName = action.payload.firstName;
             state.lastName = action.payload.lastName;
             state.middleName = action.payload.middleName;
             state.email = action.payload.email;
             state.userName = action.payload.userName;
             state.profilePic = action.payload.profilePic;
             state.role = action.payload.role;
        },
        // deletedUser: (state, action: PayloadAction<userPayload>)=>{
        // }
    },
})

export const { newCreatedUser } = createUserSlice.actions
export default createUserSlice.reducer