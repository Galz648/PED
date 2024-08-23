// import { Expression, ExpressionNode, Factor, Literal, LiteralNode, Term, TermNode } from "./grammer";

import { Factor, Literal, LiteralNode, Term, TermNode } from "./grammer"

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
