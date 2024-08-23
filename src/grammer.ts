import { get } from "http"
import { error } from "./match"
import { doSequence, } from "./parser_combinators"
import { alphabet_parser, mult_div_parser, plus_minus_parser} from "./parsers"
import { ParseError, Parser, ParserCursor } from "./types"
import { Visitor } from "./ast_generator"


// TODO: wrap this in a namespace

export interface Rule {
    accept<T >(visitor: T): any
}

export interface Literal<T> extends Rule {
    value: T
}
export interface Term extends Rule {
    left_expr: Literal<any>
    op: "*" | "/"
    right_expr: Literal<any>
}
export interface Factor {
    expression: Expression
}
export interface FunctionCall {
    function_name: string
    expression: Expression
}

export type Operation = "+" | "/" | "-" | "*"



export interface Expression extends Rule {
    left_term: Term
    add_op: "+" | "-"
    right_term: Term
}

export class ExpressionNode implements Expression {
    left_term: Term
    add_op: "+" | "-"
    right_term: Term
    constructor(left_term: Term, add_op: "+" | "-", right_term: Term) {
        this.left_term = left_term
        this.add_op = add_op
        this.right_term = right_term
    }
//     accept(visitor: Visitor) {
//         return visitor.visitExpression(this)
//     }
}

// rules corresponding to parsers
// string -> parser(string) -> Cursor
// parser_name -> grammer rule -> AST
// const Expr = doSequence([doSequence([factor, plus_minus_parser, factor])]) -> AST
// Expr -> AST (BinOpNod)
// const factor = optional(Some(Or(alphabet_parser, white_space_parser)))
// wrap the parser and return an AST

export class LiteralNode<T> implements Literal<T> {
    value: T
    constructor(value: T) {
        this.value = value
    }
    accept(visitor: Visitor) {
        return visitor.visitLiteral(this)
    }
}
export class TermNode implements Term {
    left_expr: Literal<any>
    op: "*" | "/"
    right_expr: Literal<any>
    constructor(left_expr: Literal<any>, op: "/" | "*", right_expr: Literal<any>) {
        this.left_expr = left_expr
        this.right_expr = right_expr
        this.op = op
    }
    accept(visitor: Visitor) {
        return visitor.visitTerm(this)
    }
}

export function get_factor_parser(): Parser<Factor> {
    const factor = doSequence([alphabet_parser, doSequence([mult_div_parser, alphabet_parser])])
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
        if (result.ok) {
            // visitor pattern for AST generation
            // const ast_generator = new ASTGenerator()
            // ast_generator.visitTerm(result.value.AST[0])
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
            // // pop the AST nodes from the result and create a new AST node
            // const left = result.value.AST.pop()
            // const op = result.value.AST.pop()
            // const right = result.value.AST.pop()
            // const expr_node = new ExpressionNode(left, op, right)
            // console.log(`Expression: `)
            // console.log(result.value.AST)
            // result.value.AST.push(expr_node)
            return result
        }
        else {
            return result
        }

    }
    return wrapper
}
