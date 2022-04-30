import { useRef } from "react"
import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { setSignInEmail, setSignInPassword } from "../../redux/forms/signInSlice"
import { useAppSelector } from "../../redux/hooks"
import { Input } from "../ui/input"



export const SignInPage = () => {
    const { user, signIn } = useAppSelector((state) => state)
    const dispatch = useDispatch()

    const emailInput = useRef<Input>(null)
    const passwordInput = useRef<Input>(null)

    if (!!user.email && !!user.password) return <Navigate to={'/'} />

    const logIn = async () => {
        const isEmailValid = await emailInput.current?.validate()
        const isPasswordValid = await passwordInput.current?.validate()
        if (isEmailValid && isPasswordValid) {
            
        }        
    }

    return (
        <main className="flex flex-col justify-center">
            <Input
                ref={emailInput}
                value={signIn.email}
                placeholder="Введите email"
                onChange={(value) => dispatch(setSignInEmail(value))}
                validationSchema={Input.validation.email}
            />
            <Input
                ref={passwordInput}
                value={signIn.password}
                placeholder="Введите пароль"
                onChange={(value) => dispatch(setSignInPassword(value))}
                validationSchema={Input.validation.password}
            />
            <button
                className="rounded bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white"
                onClick={logIn}
            >
                Войти
            </button>
        </main>
    )
}