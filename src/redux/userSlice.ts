import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface LoginActionPayload {
    email: string,
    password: string
}

interface UserState {
    email: string | null,
    password: string | null
}

const initialState: UserState = {
    email: null,
    password: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginActionPayload>) => {
            state.email = action.payload.email
            state.email = action.payload.email
        },
        logout: (state) => {
            state.email = null
            state.email = null
        },
    },
})

export const { login, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer