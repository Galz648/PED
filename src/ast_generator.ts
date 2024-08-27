// import { Expression, ExpressionNode, Factor, Literal, LiteralNode, Term, TermNode } from "./grammer";

import { Expression, Factor, Literal, Term} from "./grammer"

export interface Visitor {
    visitFactor(factor: Factor): any
    visitLiteral(literal: Literal<any>): LiteralNode<any>
    visitTerm(term: Term): TermNode
    // visitExpression(expression: Expression): ExpressionNode
}

interface ExpressionVisitor extends Visitor {
    // visit(expr: Expression): any
    visitLiteral(literal: Literal<any>): any
}

// export class ASTGenerator implements ExpressionVisitor {
//     visitLiteral(literal: Literal<any>) {
//         return
//     }
//    visitFactor(factor: Factor) {
//         console.log(factor)
//         return 
//     }
// }


export class ExpressionNode implements Expression {
    left_term: Term
    add_op: "+" | "-"
    right_term: Term
    constructor(left_term: Term, add_op: "+" | "-", right_term: Term) {
        this.left_term = left_term
        this.add_op = add_op
        this.right_term = right_term
    }
    accept<T>(visitor: T) {
        throw new Error("Method not implemented.")
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
