
import { my_includes } from "./utils";
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

export class Lexer {

    current_token: string;
    current_index: number;
    tokens: string[]

    constructor(tokens: string[]) {
        this.current_index = 0;
        this.tokens = tokens;
        this.current_token = this.tokens[this.current_index]
    }

    get_next_token() { // move to the lexer
        this.current_index += 1 // TODO: is this neccesary?
        const next_token = this.tokens[this.current_index];
        if (!(next_token === undefined)) {
            return next_token
        }
        throw new Error("Reached EOF Token")
    }
    consume_token() { // TODO: how do you handle the EOF token? 
        const next_token = this.get_next_token()
        this.current_token = next_token
    }

    isToken(value: any, tokens: string[]): value is string {
        return my_includes(tokens, value)
    }

    determine_token(char: string) { // TODO: is there a more compatible type for this ?

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
    lex(text: string[]) {
        text.forEach((c, i) => {
            let token = this.determine_token(c)
            this.tokens.push(token);
        })
        return this.tokens // TODO: not sure if used
    }


    static splitString(input: string): string[] {
        return input.split(/\s+/);
    }
}




