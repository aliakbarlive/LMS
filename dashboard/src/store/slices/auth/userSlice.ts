import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    userName: string
    email: string
    firstName: string
    lastName: string
    profilePic: string
    is_verified: boolean
    role: string
    _id: string
    createdAt: string
    updatedAt: string
}

const initialState: UserState = {
    _id: '',
    email: '',
    firstName: '',
    is_verified: false,
    lastName: '',
    profilePic: '',
    role: '',
    userName: '',
    updatedAt: '',
    createdAt: '',
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.email = action.payload.email
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.profilePic = action.payload.profilePic
            state.userName = action.payload.userName
            state._id = action.payload._id
            state.role = action.payload.role
            state.is_verified = action.payload.is_verified
            state.createdAt = action.payload.createdAt
            state.updatedAt = action.payload.updatedAt
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
