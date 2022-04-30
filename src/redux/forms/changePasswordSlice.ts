import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ChangePasswordState {
    oldPassword: String,
    password: String,
    newPassword: String,
}

const initialState: ChangePasswordState = {
    oldPassword: '',
    password: '',
    newPassword: '',
}

export const changePasswordSlice = createSlice({
    name: 'changePassword',
    initialState,
    reducers: {
        setOldPassword: (state, action: PayloadAction<string>) => {
            state.oldPassword = action.payload
        },
        setChangePassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        setNewPassword: (state, action: PayloadAction<string>) => {
            state.newPassword = action.payload
        },
        clearChangePassword: (state) => {
            state.oldPassword = ''
            state.password = ''
            state.newPassword = ''
        }
    },
})

export const { setOldPassword, setChangePassword, setNewPassword, clearChangePassword } = changePasswordSlice.actions

export default changePasswordSlice.reducer