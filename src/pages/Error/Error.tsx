import PageContainer from "@/components/PageContainer"
import Title from "@/components/Title"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

type Props = {
    message: string
    path: string
}

const Error = ({ message, path }: Props) => {

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