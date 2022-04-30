import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SignUpState {
    email: string,
    password: string
    confirmPassword: string
}

const initialState: SignUpState = {
    email: '',
    password: '',
    confirmPassword: ''
}

export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        setSignUpEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setSignUpPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        setSignUpConfirmPassword: (state, action: PayloadAction<string>) => {
            state.confirmPassword = action.payload
        },
        clearSignUp: (state) => {
            state.email = ''
            state.password = ''
            state.confirmPassword = ''
        }
    },
})

export const { setSignUpEmail, setSignUpPassword, setSignUpConfirmPassword, clearSignUp } = signUpSlice.actions

export default signUpSlice.reducer