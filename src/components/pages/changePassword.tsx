import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"

export const ChangePasswordPage = () => {
    const user = useAppSelector((state) => state.user)
    if (!user.email || !user.password) return <Navigate to={'/signIn'} />

    return (
        <main>ChangePassWordPage</main>
    )
}