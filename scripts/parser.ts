
import { assertEqual } from "../src/lib/utils.js"
import { GrammerValidator } from "../src/lib/grammer_validator.js";
import { Lexer, TOKENS } from "../src/lib/lexer.js";


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
            expr: "A + A +",
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

    const lexer = new Lexer();
    const gv = new GrammerValidator(lexer)
    console.log("tokens:", gv.lexer.get_tokens())
    const is_valid = gv.validate();
    return is_valid;


}
function main() {
    run_test_cases()
}


main();


