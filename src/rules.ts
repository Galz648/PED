// TODO: apply rule swap on pair
// TODO: move to the main project and commit
// TODO: implement binding
// TODO: implement recursion into head matching - traversing each tree (variable binding)

import { Expression } from "./grammer"
import { error, ok, Result } from "./match"

// taken from noq_example.ts
const bindings: Map<string, Expression> = new Map() // why is the key a string and not an expression?
type Pair = {
    a: Expression
    b: Expression
}
type Literal = {

    value: number
}

// test if two "Expressions" are equal
const expr_1 = {
    value: 1
}
const expr_2 = {
    value: 2
}


class Rule {
    head: Expression
    body: Expression
    constructor(head: Expression, body: Expression) {
        this.head = head
        this.body = body
    }

}

class MatchError implements Error {
    name: string
    message: string
    constructor(message: string) {
        this.name = "Match Error"
        this.message = `${this.name}: ${message}`
    }
}
type Some<T> = T
// function some<T>(something: Some<T>): Maybe<T> {
//     return something ? something :  null
// }
type Maybe<T> = Some<T> | null // TODO: according to the fp playlist, there is a problem with this ? look at the fp-ts implementation for reference



function match(value: Expression, rules: Rule[]): Result<Expression, MatchError> {
    // TODO: nothing is done with comparison error message
    let found_rule: Maybe<Rule> = null
    const match = rules.some((rule) => { // TODO: change this cranky implementationw    
        console.log(value, rule)
        const result = compareExpressions(value, rule.head)
        console.log(result)

        if (result.ok) {
            found_rule = rule
            return true
        }
    })
    console.log(match)

    if (match) {
        return ok(found_rule!.body) // TODO: handle question-mark !
    }
    return error(new ParseError(`Failed to match ${JSON.stringify(value)} with rules`))
}


const swap_pair = new Rule({
    tag: "Functor",
    name: "pair",
    expressions: [{ tag: "Literal", value: "a" }, { tag: "Literal", value: "b" }]
}, {
    tag: "Functor",
    name: "pair",
    expressions: [{ tag: "Literal", value: "b" }, { tag: "Literal", value: "a" }]
}

)
// const result = match({ tag: "Literal", value: "a" }, [
//     {
//         head: { tag: "Literal", value: "a" },
//         body: { tag: "Literal", value: "b" }
//     }
// ])

// console.log(result)

const result = match({
    tag: "Functor",
    name: "pair",
    expressions: [{ tag: "Literal", value: "a" }, { tag: "Literal", value: "b" }]
}, [swap_pair])
// Swap(Pair(a,b)) = Pair(a, b)
// Swap(Pair(g(c), f(d))) -> ?

console.log(result)

/* 

(Expr, symbol) -> bind symbol: Expr
(symbol, Expr) -> Error ? 

Swap(Pair(f(c), g(d))) = Pair()
*/
function compareExpressions<T>(expr: Expression, head : Expression): Result<Expression, MatchError> {
    // traverse each of the expressions and compare them along the way.
    // you can traverse the expressions recursively

    // [value, head]
    // (functor, functor) -> check deep equality
    // [_, symbol] -> bind
    // [symbol, functor] -> return error for now
    let evaluating = true
    let bindings: [string, Expression][] = []
    while (evaluating) {
        const is_head_symbol = head.tag == "Literal" 
        const both_literal = expr.tag == "Literal" && head.tag == "Literal"
        const both_functors =  expr.tag == "Functor" && head.tag == "Functor"

        // 

        if (expr.tag == "Functor" && head.tag == "Literal") {
            // 
            bindings.push([head.value, expr])
            console.log(`bindings: ${bindings}`)
        }

        if (both_functors) {
            const same_functor_name = expr.name == head.name
            const functor_eq_arg_len = expr.expressions.length == head.expressions.length
            if (!same_functor_name || !functor_eq_arg_len) {
                return Err
            }
            // compare sub-expressions
            // zip + reduce ? determine if one of othem is invalid
            // compareExpressions(expr.expressions, head.expressions)
        }
       
        else {
            // different shapes ? 
            evaluating = false
        }
    }
    return new Err(new Error("head and value don't match")) 
}

