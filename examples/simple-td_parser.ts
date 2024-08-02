// /* 

// Create a simple grammer and parser
// create a state machine representing this grammer

// There are terminal and non-terminal nodes

// non-teminal nodes return a list of other nodes (non/terminal)

// we essentially need to implement some kind of a directed cyclic graph

// What kind of automata would be suitable here ?
// what is the difference between an NDA, DFA, and a turing machine

// terminal nodes return a token
// GRAMMER: 
// expr: term ( + | - ) term
// term: INTEGER ( * | / ) INTEGER

// */
// import { assertEqual, reverse } from "../lib/utils"
// import { Lexer, TOKENS } from "../lib/lexer";

// type Grammer = string[][]


// class GrammerValidator {
//     lexer: Lexer
//     grammer: Grammer
//     constructor(lexer: Lexer, grammer: Grammer) {
//         this.lexer = lexer
//         this.grammer = grammer
//     }

//     validate_tokenized_expr(tokenized_expr: string[]) {
//         let stack: string[] = [];
//         // grammer tokens
//         // rule lookup (lookup(grammer token) -> rule/s)
//         let valid = true;
//         while (valid == true) {
//             tokenized_expr.forEach((gt) => {
//                 console.log("do something")
//             });
//             (reverse(this.grammer[0])).forEach(element => {
//                 stack.push(element)
//             });
//         }

//     }

// }



// function run_test_cases() {
//     const expressions = [
//         {
//             expr: "1 + 1",
//             expected: true
//         }
//     ];

//     expressions.forEach((item) => {
//         const expr: string = item.expr;
//         const expected: boolean = item.expected;
//         // const is_valid = validate_expression(expr)
//         // assertEqual(is_valid, expected, `${expr}`)
//     })
// }


// function validate_expression(expr: string) {
//     // tokenize
//     let tokens: string[] = [TOKENS.START];
//     let lexer = new Lexer(tokens)


//     // Example usage:
//     const result = Lexer.splitString(expr);
//     console.log(result);
//     tokens = lexer.lex(result)
//     tokens.push(TOKENS.EOF); // TODO: find a more nice looking way
//     console.log("tokens:", tokens)
//     let grammer = [[]]
//     // validate
//     let validator = new GrammerValidator(lexer, grammer)

//     const is_valid = validator.validate_tokenized_expr(tokens);
//     return is_valid;
// }
// function main() {
//     run_test_cases()
// }


// main();


