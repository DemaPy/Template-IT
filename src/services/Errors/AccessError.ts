

export class AccessError extends Error {
    status
    constructor({message}: {message: string}) {
        super(message)
        this.status = "error"
        this.name = "AccessError"
    }
}