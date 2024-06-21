

export class AuthError extends Error {
    status
    constructor({message}: {message: string}) {
        super(message)
        this.name = "AuthError"
        this.status = "error"
    }
}