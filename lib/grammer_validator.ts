
import { my_includes } from "./utils"
import { TOKENS, BIN_OP } from "./lexer"
export class GrammerValidator {

    // Grammer:
    // EXPR: factor ((+ | -) factor)*
    // factor: SYMBOL

    // EXAMPLE: 2 + 3 * 4

    current_token: string;
    current_index: number;
    tokens: string[]

    constructor(tokens: string[]) {
        this.current_index = 0;
        this.tokens = tokens;
        this.current_token = this.tokens[this.current_index]
    }
    error(message: string) {
        throw Error(message)
    }

    consume_token() { // TODO: how do you handle the EOF token? 
        const next_token = this.get_next_token()
        this.current_token = next_token
    }

    isToken(value: any, tokens: string[]): value is string {
        return my_includes(tokens, value)
    }
    factor() {
        let next_token = this.get_next_token()
        if (next_token === TOKENS.SYMBOL) {
            this.consume_token()
            // return SYMBOL
        } else {
            this.error(`token: "${next_token}" != SYMBOL`)
        }
    }
    get_next_token() { // move to the lexer
        this.current_index += 1 // TODO: is this neccesary?
        const next_token = this.tokens[this.current_index];
        if (!(next_token === undefined)) {
            return next_token
        }
        throw new Error("Reached EOF Token")
    }
    expr() {
        this.factor()
        console.log(`this.current_token: ${this.current_token}`)
        // const next_token = this.get_next_token();
        // console.log(`next token: ${next_token}`)

        // validate the type
        while (this.isToken(this.current_token, [BIN_OP.MINUS, BIN_OP.PLUS])) {
            console.log(`inside loop - this.current_token: ${this.current_token}`)
            this.factor()
        }

    }

    validate(): Boolean {

        try {
            this.expr()
            return true;
        } catch (e) {
            console.log(e)
            return false;
        }
    }
}
