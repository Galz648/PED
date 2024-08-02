/* 
Terminals
* literal (constant)
* Variable?
non-terminals:
* expr
* term
* UnaryOp
* BinaryOp
operators:

need context to determine of binary or unary OP ?
Grammer:
0 - expr: term (-term)*
1 - term: Operator(variable | literal) | variable | constant
2 - BinaryOp: + | - | * | /
3 - Operator: BinaryOp | UnaryOp | f_N
4 - variable: (literal)

A BinaryOp B

f(x) = (x^2)`
1
1 + 2
(1 - (+(-(+(1)))))

*/
