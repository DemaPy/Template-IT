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
        <div className="container max-w-screen-xl mx-auto md:px-6 px-2 pt-16 md:pt-24 min-h-screen flex flex-col items-stretch h-full">
            {children}
        </div>
    )
}

export default LoginGuard