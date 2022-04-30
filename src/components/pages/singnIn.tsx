import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"

export const SignInPage = () => {
    const user = useAppSelector((state) => state.user)
    if (!!user.email && !!user.password) return <Navigate to={'/'} />

    return (
        <main>SignInPage</main>
    )
}