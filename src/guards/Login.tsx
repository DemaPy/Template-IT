import { useAuth } from '@/store/login'
import { PropsWithChildren, useEffect } from 'react'

const LoginGuard = ({ children }: PropsWithChildren) => {
    const login = useAuth(store => store.setIsLoggedIn)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            login()
        }
    }, [])


    return (
        <>{children}</>
    )
}

export default LoginGuard