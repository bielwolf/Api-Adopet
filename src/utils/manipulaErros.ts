import { EnumHttpStatusCode } from "../enum/enumHttpStatusCode";

export class ManipulaErros extends Error {
    readonly statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class RequestBad extends ManipulaErros {
    constructor(message: string) {
        super(message, EnumHttpStatusCode.BAD_REQUEST);
    }
}

export class NotFound extends ManipulaErros {
    constructor(message: string) {
        super(message, EnumHttpStatusCode.NOT_FOUND);
    }
}