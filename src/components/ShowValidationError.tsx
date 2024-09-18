
type Props = {
    error: string
}

const ShowValidationError = ({ error }: Props) => {
    return (
        <>
            {
                error && (
                    <p className="text-sm mt-2 text-red-300 text-muted-foreground">
                        {error}
                    </p>
                )
            }
        </>
    )
}

export default ShowValidationError