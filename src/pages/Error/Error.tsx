import PageContainer from "@/components/PageContainer"
import Title from "@/components/Title"
import { Button } from "@/components/ui/button"
import { AuthError } from "@/services/Errors/AuthError"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

type Props = {
    message: string
    path: string
    error: Error | null
}

class ErrorItem {
    timestamp: number
    token: string
    message: string

    constructor({ message }: { message: string }) {
        this.timestamp = Date.now()
        this.token = localStorage.getItem("token") || "Token not found"
        this.message = message
    }
}

const Error = ({ error, message, path }: Props) => {
    const navigate = useNavigate()
    useEffect(() => {
        try {
            const errors = JSON.parse(localStorage.getItem("errors") || "[]")
            const err = new ErrorItem({ message: message })
            localStorage.setItem("errors", JSON.stringify([...errors, err]))
            if (error && error instanceof AuthError) {
                navigate("/login")
            }
        } catch (error) {
            const err = new ErrorItem({ message: localStorage.getItem("errors") || "Error storage empty" })
            localStorage.setItem("critical-errors", JSON.stringify(err))
            localStorage.clear()
        }
    }, [])

    return (
        <PageContainer>
            <Title title={message} />
            <Button variant={"outline"} asChild>
                <Link to={path}>Go to {path}</Link>
            </Button>
        </PageContainer>
    )
}

export default Error