import { combineReducers } from '@reduxjs/toolkit'
import session, { SessionState } from './sessionSlice'
import user, { UserState } from './userSlice'
import newUser, { userPayload } from './createUser'

const reducer = combineReducers({
    session,
    user,
    newUser
})

export type AuthState = {
    session: SessionState
    user: UserState
    newUser: userPayload
}

export * from './sessionSlice'
export * from './userSlice'

export default reducer
