import { useAuth } from '@/store/login'
import { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginGuard = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate()
    const { isLogged } = useAuth()


    useEffect(() => {
        if (!isLogged) {
            navigate("/login")
            return
        }
    }, [isLogged])


    return (
        <>{children}</>
    )
}

export default LoginGuard