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
import { useAuth } from "@/store/login"
import { Auth } from "@/services/Auth"
import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Toaster } from 'react-hot-toast';

type FormValues = {
    email: string
    password: string
}

const options = {
    defaultValues: {
        email: "",
        password: ""
    }
}

function Login() {
    const location = useLocation()
    const navigate = useNavigate()

    const { formState: { errors }, register, handleSubmit } = useForm<FormValues>(options);
    const login = useAuth(store => store.setIsLoggedIn)

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: Auth.login,
        onSuccess: (data) => {
            toast.success("Success. You will be redirected in 2 seconds...");
            let id = setTimeout(() => {
                //@ts-ignore
                localStorage.setItem("token", data.data.token)
                login()
                const redirect = location.search.split("=")[1]
                navigate(redirect ? redirect : '/templates')
                clearInterval(id)
            }, 2000)
        },
        onError: (data) => {
            toast.error(data.message);
        }
    })

    return (
        <div className="flex items-center justify-center mx-10 h-full">
            <Card className="min-w-96 max-w-xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Login account</CardTitle>
                    <CardDescription>
                        Enter your email and password below to login into account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(({ email, password }) => mutate({ email, password }))}>
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
                            <Input
                                {...register("email", {
                                    required: "Enter email",
                                    minLength: {
                                        value: 10,
                                        message: "Email too short."
                                    },
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Entered value does not match email format"
                                    }
                                })}
                                id="email"
                                type="email"
                                placeholder="mail@example.com"
                            />
                            {"email" in errors && (
                                <p className="text-sm font-semibold text-red-300">{errors.email?.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                {...register("password", {
                                    required: "Enter password",
                                    minLength: {
                                        value: 4,
                                        message: "Password too short."
                                    }
                                })}
                                id="password"
                                type="password"
                            />
                            {"password" in errors && (
                                <p className="text-sm font-semibold text-red-300">{errors.password?.message}</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                        <Button disabled={isPending || isSuccess} className="w-full" variant={"outline"} onClick={() => mutate({ email: "guest@gmail.com", password: "guest" })}>Continue as Guest</Button>
                        <Button disabled={isPending || isSuccess} className="w-full" type="submit">Login</Button>
                    </CardFooter>
                </form>
            </Card>
            <Toaster />
        </div>
    )
}

export default Login