export class UserNotFoundException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class UserAlreadyExistException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class UserNotExistException extends Error {
    constructor(message: string) {
        super(message);
    }
}
