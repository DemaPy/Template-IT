"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { useAuth } from "@/store/login"
import { Auth } from "@/services/Auth"
import { useLocation, useNavigate } from "react-router-dom"

function Login() {
    const location = useLocation()
    const navigate = useNavigate()
    const login = useAuth(store => store.setIsLoggedIn)
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const handleLogin = async () => {
        const response = await Auth.login({ email, password })
        
        if (response.status === "error") {

            if ("errors" in response) {
                let error_message = ""
                for (const error of response.errors) {
                    error_message += response.message + ": " + error.msg
                }
                alert(error_message)
                return
            }

            alert(response.message)
            return
        }

        
        if (response.status === "success") {
            localStorage.setItem("token", response.data.token)
            login()
            const redirect = location.search.split("=")[1]
            navigate(redirect ? redirect : '/templates')
        }
    }

    const handleLoginGuest = async () => {
        const response = await Auth.login({ email: "guest@gmail.com", password: "guest" })
        if (response.status === "error") {
            alert(response.message)
            return
        }

        if (response.status === "success") {
            localStorage.setItem("token", response.data?.token!)
            login()
            const redirect = location.search.split("=")[1]
            navigate(redirect ? redirect : '/templates')
        }
    }

    return (
        <div className="flex items-center justify-center mx-10 h-full">
            <Card className="min-w-96 max-w-xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Login account</CardTitle>
                    <CardDescription>
                        Enter your email below to login into account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {/* <div className="grid grid-cols-2 gap-6">
                        <Button variant="outline">
                            <Icons.gitHub className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                        <Button variant="outline">
                            <Icons.google className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div> */}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={email || ""} onChange={(ev) => setEmail(ev.target.value)} type="email" placeholder="m@example.com" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" value={password || ""} onChange={(ev) => setPassword(ev.target.value)} type="password" />
                    </div>
                </CardContent>
                <CardFooter className="gap-2">
                    <Button className="w-full" variant={"outline"} onClick={handleLoginGuest}>Continue as Guest</Button>
                    <Button className="w-full" onClick={handleLogin}>Login</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login