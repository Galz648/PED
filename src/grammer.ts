
import { error } from "./match"
import { doSequence, } from "./parser_combinators"
import { alphabet_parser, mult_div_parser, plus_minus_parser } from "./parsers"
import { ParseError, Parser, ParserCursor } from "./types"


// TODO: wrap this in a namespace


export interface Literal<T>  {
    value: T
}
export interface Term {
    left_expr: Literal<any>
    op: "*" | "/"
    right_expr: Literal<any>
}
export interface Factor {
    expression: Expression
}

export type Operation = "+" | "/" | "-" | "*"



export interface Expression {
    left_term: Term
    add_op: "+" | "-"
    right_term: Term
}

export function get_factor_parser(): Parser<Factor> {
    const factor = doSequence([alphabet_parser])
    const wrapper: Parser<Factor> = (cursor: ParserCursor<Factor>) => {
        // wrap term with additional functionality - generate AST node
        const result = factor(cursor)
        if (result.ok) {
            return result

        }

        return result

    }
    return wrapper
}
export function get_term_parser(): Parser<Term> {
    const term = doSequence([get_factor_parser(), doSequence([plus_minus_parser, get_factor_parser()])])
    const wrapper: Parser<Term> = (cursor: ParserCursor<Term>) => {
        // wrap term with additional functionality - generate AST node
        const result = term(cursor)

        console.log(result)
        if (result.ok) { // TODO: refactor this
            return result
        }
        else {
            return result
        }

    }
    return wrapper
}

export function get_expr_parser(): Parser<Expression> {
    const expr = doSequence([get_term_parser()])
    const wrapper: Parser<Expression> = (cursor: ParserCursor<Expression>) => {
        // wrap term with additional functionality - generate AST node
        const result = expr(cursor)
        if (result.ok) {
            return result
        }
        else {
            return result
        }

    }
    return wrapper
}
