import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiGetAllUser } from "@/services/KnowledgeBaseService";


export type UserList = {
    _id: string
    firstName: string
    lastName: string
    middleName:string
    email: string
    userName: string
    password: string
    profilePic:any | null
    role:Array<string | number>
    createdAt: string
    is_verified: boolean
}

interface UserListState {
    isLoading: boolean
    usersData: any[] // Define UserData type according to your application
    isError: boolean
}

const initialState: UserListState = {
    isLoading: false,
    usersData: [],
    isError: false
};


export const getAllUsers = createAsyncThunk(
    'users',
    async () => {
        const response = await apiGetAllUser<UserList>()
        return response.data
    }
)

const userListSlice = createSlice({
    name: 'userList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state, action: PayloadAction<any>)=>{
            state.isLoading = true;
        })
        builder.addCase(getAllUsers.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.usersData = action.payload.users;
        });
        builder.addCase(getAllUsers.rejected, (state, action: PayloadAction<any>) => {
            console.log('Error', action.payload);
            state.isError = true;
        })
    },
})



export default userListSlice.reducer