import { get } from "http"
import { Visitor } from "./ast_generator"
import { error } from "./match"
import { doSequence, optional, Or, Some } from "./parser_combinators"
import { alphabet_parser, left_paran_parser, literal_parser, mult_div_parser, plus_minus_parser, right_paran_parser, white_space_parser } from "./parsers"
import { ParseError, Parser, ParserCursor } from "./types"

/* 

<expression> ::= <term> | <expression> <ws> <add_op> <ws> <term> | "(" <ws> <expression> <ws> ")"
<term>       ::= <factor> | <term> <ws> <mul_op> <ws> <factor> | <factor> <ws> "^" <ws> <factor> | <factor> "`" | <function_call>
<factor>     ::= <number> | <variable> | "(" <ws> <expression> <ws> ")" | <function_call>
<function_call> ::= <function_name> "(" <ws> <expression> <ws> ")"
<add_op>     ::= "+" | "-"
<mul_op>     ::= "*" | "/"
<number>     ::= "DIGIT" ("." "DIGIT")?
<variable>   ::= "LETTER" ("LETTER" | "DIGIT")*
<function_name> ::= "LETTER" ("LETTER" | "DIGIT")*
<ws>         ::= " "*

*/
// TODO: wrap this in a namespace
export interface Literal {
    value: string | number | ""
}
export interface Term {
    left_expr: Literal
    mul_op: Operation
    right_expr: Literal
    accept(visitor: Visitor): any
}
export interface Factor {
    expression: Expression
}
export interface FunctionCall {
    function_name: string
    expression: Expression
}

export type Operation = "+" | "/" | "-" | "*"



export interface Expression {
    left_term: Term
    add_op: "+" | "-"
    right_term: Term
    accept(visitor: Visitor): any
}

// rules corresponding to parsers
// string -> parser(string) -> Cursor
// parser_name -> grammer rule -> AST
// const Expr = doSequence([doSequence([factor, plus_minus_parser, factor])]) -> AST
// Expr -> AST (BinOpNod)
// const factor = optional(Some(Or(alphabet_parser, white_space_parser)))
// wrap the parser and return an AST

class LiteralNode implements Literal {
    value: string | number | ""
    constructor(value: string | number | "") {
        this.value = value
    }
    accept(visitor: Visitor) {
        return visitor.visitLiteral(this)
    }
}
export class TermNode implements Term {
    left_expr: Literal
    mul_op: Operation
    right_expr: Literal 
    constructor(left_expr: Literal, right_expr: Literal) {
        this.left_expr = left_expr
        this.right_expr = right_expr
        this.mul_op = "*"
    }
    accept(visitor: Visitor) {
        return visitor.visitTerm(this)
    }
}

function get_factor_parser(): Parser<Factor> {
    const factor = alphabet_parser
    const wrapper: Parser<Factor> = (cursor: ParserCursor) => { 
         // wrap term with additional functionality - generate AST node
        const result = factor(cursor)
        if (result.ok) {
            const factor_node = new LiteralNode(result.value.parsed)
            result.value.AST.push(factor_node)
            console.log(`Factor: `)
            console.log(result.value.AST)
            return result
        }
        else {
            return result
        }

    }
    return wrapper
}
function get_term_parser(): Parser<Term> {
    const term = doSequence([get_factor_parser(), mult_div_parser, get_factor_parser()])
    const wrapper: Parser<Term> = (cursor: ParserCursor) => { 
         // wrap term with additional functionality - generate AST node
        const result = term(cursor)
        console.log(result)
        if (result.ok) {
            // pop the AST nodes from the result and create a new AST node
            const left = result.value.AST.pop()
            const op = result.value.AST.pop()
            const right = result.value.AST.pop()
            const term_node = new TermNode(left, right)
            result.value.AST.push(term_node)
            return result
        }
        else {
            return result
        }

    }
    return wrapper
}
const factor = optional((alphabet_parser))
// const term = doSequence([Or(factor, doSequence([factor, mult_div_parser, factor]))])
// export const Expr = doSequence([get_term_parser(), plus_minus_parser, get_term_parser()]) // FIX: putting the Or parser combinator inside the doSequence doesn't work as expected
export const term = get_term_parser()
// const Expr = doSequence([term], "Expr")
// const ParenthesizedExpr = doSequence([left_paran_parser, Expr, right_paran_parser])
// export const root = doSequence([Or(Expr, ParenthesizedExpr)])
// export const grammer_rules: Map<string, Parser> = new Map<string, Parser>();
// class ParserGenerator {
//     rules: Map<string, Parser>
//     constructor(rules: Map<string, Parser>) {
//         this.rules = rules;
//     }

//     apply_rule(input: string, rule: string): Result<ParserCursor, ParseError> {
//         const parser = this.rules.get(rule);
//         if (!parser) {
//             throw Error(`Rule: ${rule} not found in the parser rules`);
//         }
//         return parse(parser, input);

//     }
// }
// const parser_generator = new ParserGenerator(grammer_rules)

