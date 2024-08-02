
import { my_includes } from "./utils.js";
export enum TOKENS {
    // TOKENS
    INTEGER = "INTEGER",
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

    constructor() {
        this.tokens = [TOKENS.START, TOKENS.EOF];
        this.current_index = 0;
        this.current_token = this.tokens[this.current_index]
    }

    get_next_token() { // move to the lexer
        this.current_index += 1 // TODO: is this neccesary?
        const next_token = this.tokens[this.current_index];
        const not_undefined = !(next_token === undefined)
        if (not_undefined) {
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

    static determine_token(char: string) { // TODO: make code more compact, using a mapper ? 
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

    get_tokens() {
        return this.tokens
    }
    reset_state() {
        this.tokens = [TOKENS.START, TOKENS.EOF];
        this.current_index = 0;
        this.current_token = this.tokens[this.current_index]
    }

    lex(text: string) { 
        const text_as_list = Lexer.splitString(text)
        const tokens: string[] = []

        text_as_list.forEach((c: string, i) => {
            let token = Lexer.determine_token(c)
            tokens.push(token);
        })
        this.tokens = tokens
        this.current_index = 0
        this.current_token = this.tokens[this.current_index]
    }


    private static splitString(input: string): string[] {
        return input.split(/\s+/);
    }




}




