
export enum TOKENS {
    // TOKENS
    SPACE_TOKEN = "SPACE_TOKEN",
    SYMBOL = "SYMBOL",
    START = "START",
    EOF = "EOF"
}
export enum BIN_OP { // 
    // Binary Ops
    MINUS = "-",
    PLUS = "+",
    MULT = "*",
    DIV = "/"
}

enum UNARY_OP {
    POWER = "**",
}


export function determine_token(char: string) { // TODO: is there a more compatible type for this ?

    if (char == BIN_OP.PLUS) {
        return BIN_OP.PLUS;
    }

    if (char == BIN_OP.MINUS) {
        return BIN_OP.MINUS;
    }

    if (char == BIN_OP.MULT) {
        return BIN_OP.MULT;
    }

    if (char == BIN_OP.DIV) {
        return BIN_OP.DIV;
    }

    if (char == UNARY_OP.POWER) {
        return UNARY_OP.POWER
    }

    if (/^[A-Za-z]+$/.test(char)) {
        return TOKENS.SYMBOL
    }
    else {
        throw new Error(`unrecognized token: ${char}`)
    }
}

export function lex(text: string[], tokens: string[]) {
    text.forEach((c, i) => {
        let token = determine_token(c)
        tokens.push(token);
    })
    return tokens
}


export function splitString(input: string): string[] {
    return input.split(/\s+/);
}

