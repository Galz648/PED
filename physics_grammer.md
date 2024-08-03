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
root: expr | statement
statement: expr = expr
0 - expr: (UnaryOp(term) (BinaryOp term)* | term (BinaryOp term)*
// 1 - term: Operator(variable | literal) | variable | constant
    term: SYMBOL | CONSTANT | expr
    UnaryOp: ` | _- | _+
2 - BinaryOp: + | - | * | / | ^
3 - Null : "" <-- 
// 4 - variable: (LEFT PARAN RIGHT_PARAN)*
    // factor : 

A BinaryOp B

f(x) = (x^2)`
1
1 + 2
f(x) = x^2
g(x) = f(x)
(1 - (+(-(+(1)))))
