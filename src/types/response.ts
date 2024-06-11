type ServerResponse<T> = {
    status: "error" | "success",
    message: string,
    error: Error
    data: T
    code?: number
}