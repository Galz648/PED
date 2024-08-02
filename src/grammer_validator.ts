
import { my_includes } from "./utils.js"
import { TOKENS, BIN_OP, Lexer } from "./lexer.js"
export class GrammerValidator {

    // Grammer:
    // EXPR: TERM ( + | - ) TERM)*
    // TERM: BET ( / | * ) BET)*
    // BET: factor ** factor

    // EXAMPLE: 2 + 3 * 4

    lexer: Lexer

    constructor(lexer: Lexer) {
        this.lexer = lexer
    }
    error(message: string) {
        throw Error(message)
    }

    factor() {
        let next_token = this.lexer.get_next_token()
        if (next_token === TOKENS.SYMBOL) {
            this.lexer.consume_token()
            // return SYMBOL
        } else {
            this.error(`token: "${next_token}" != SYMBOL`)
        }
    }

    term() {
        this.factor()
        console.log(`this.current_token: ${this.lexer.current_token}`)


        // validate the type
        while (this.lexer.isToken(this.lexer.current_token, [BIN_OP.MULT, BIN_OP.DIV])) {
            console.log(`inside loop - this.current_token: ${this.lexer.current_token}`)
            this.factor()
        }

    }
    expr() {
        this.term()
        console.log(`this.current_token: ${this.lexer.current_token}`)
        // const next_token = this.get_next_token();
        // console.log(`next token: ${next_token}`)

        // validate the type
        while (this.lexer.isToken(this.lexer.current_token, [BIN_OP.MINUS, BIN_OP.PLUS])) {
            console.log(`inside loop - this.current_token: ${this.lexer.current_token}`)
            this.term()
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
