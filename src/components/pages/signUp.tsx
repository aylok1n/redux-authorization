import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"

export const SignUpPage = () => {
    const user = useAppSelector((state) => state.user)
    if (!!user.email && !!user.password) return <Navigate to={'/'} />
    
    return (
        <main>SignUpPage</main>
    )
}