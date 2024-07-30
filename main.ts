
import { assertEqual } from "./lib/utils"
import { GrammerValidator } from "./lib/grammer_validator";
import { Lexer, TOKENS } from "./lib/lexer";


function run_test_cases() {
    const expressions = [
        // {
        //     expr: "",
        //     expected: false
        // },
        // {
        //     expr: "-",
        //     expected: false
        // },
        // {
        //     expr: "A -",
        //     expected: false
        // },
        // {
        //     expr: "A + A",
        //     expected: true
        // },
        // {
        //     expr: "A + + A + +",
        //     expected: false
        // },
        {
            expr: "A ** A +",
            expected: true
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
    let tokens: string[] = [TOKENS.START];
    let lexer = new Lexer(tokens)


    // Example usage:
    const result = Lexer.splitString(expr);
    console.log(result);
    tokens = lexer.lex(result)

    tokens.push(TOKENS.EOF); // add end token
    console.log("tokens:", tokens)
    // validate
    let validator = new GrammerValidator(lexer)

    const is_valid = validator.validate();
    return is_valid;
}
function main() {
    run_test_cases()
}


main();


