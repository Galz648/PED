
import { my_includes } from "./utils"
import { TOKENS, BIN_OP, Lexer } from "./lexer"
export class GrammerValidator {

    // Grammer:
    // EXPR: factor ((+ | -) factor)*
    // factor: SYMBOL

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

    expr() {
        this.factor()
        console.log(`this.current_token: ${this.lexer.current_token}`)
        // const next_token = this.get_next_token();
        // console.log(`next token: ${next_token}`)

        // validate the type
        while (this.lexer.isToken(this.lexer.current_token, [BIN_OP.MINUS, BIN_OP.PLUS])) {
            console.log(`inside loop - this.current_token: ${this.lexer.current_token}`)
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
