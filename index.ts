
// import { assertEqual, my_includes } from "../utils"


// Helper function to log test results
function assertEqual(actual: any, expected: any, message: string): void { //TODO: move to utils
    if (actual === expected) {
        console.log(`✔️  ${message}`);
    } else {
        console.error(`❌  ${message}`);
        console.error(`   Expected: ${expected}, but got: ${actual}`);
    }
}


function my_includes(l: any[], item: any) { //TODO: move to utils
    let is_equal = false;
    l.forEach((i) => {
        if (i === item) {
            is_equal = true
        }
    })

    return is_equal;
}

// TOKENS
const SPACE_TOKEN = "SPACE_TOKEN"
const SYMBOL = "SYMBOL"
const START = "START"
const EOF = "EOF"
enum BIN_OP { // 
    // Binary Ops
    MINUS = "-",
    PLUS = "+",
    MULT = "*",
    DIV = "/"
}


enum UNARY_OP {
    POWER = "**",
}
function determine_token(char: string) { // TODO: is there a more compatible type for this ?

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
        return SYMBOL
    }
    else {
        throw new Error(`unrecognized token: ${char}`)
    }
}
function lex(text: string[], tokens: string[]) {
    text.forEach((c, i) => {
        let token = determine_token(c)
        tokens.push(token);
    })
    return tokens
}


function splitString(input: string): string[] {
    return input.split(/\s+/);
}


class GrammerValidator {

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
        if (next_token === SYMBOL) {
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

function run_test_cases() {
    const expressions = [
        // {
        //     expr: "",
        //     expected: false
        // },
        {
            expr: "-",
            expected: false
        },
        {
            expr: "A -",
            expected: false
        },
        {
            expr: "A + A",
            expected: true
        },
        {
            expr: "A + + A + +",
            expected: false
        },
    ];

    expressions.forEach((item) => {
        const expr: string = item.expr;
        const expected: boolean = item.expected;
        const is_valid = validate_expression(expr)
        assertEqual(is_valid, expected, `${expr}`)
    })
}


function validate_expression(expr: string) {
    // tokenize

    let tokens: string[] = [START];

    // Example usage:
    const result = splitString(expr);
    console.log(result);
    tokens = lex(result, tokens)

    tokens.push(EOF); // add end token
    console.log("tokens:", tokens)
    // validate
    let validator = new GrammerValidator(tokens)

    const is_valid = validator.validate();
    return is_valid;
}
function main() {
    run_test_cases()
}


main();


