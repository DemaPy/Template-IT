type ServerResponseSuccess<T> = {
    status: "success",
    message: string,
    data: T
}

type ServerResponseError = {
    status: "error",
    message: string,
}