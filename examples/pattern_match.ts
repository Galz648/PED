import { Result, ok, error } from "../src/match.js"


type Functor = {
    tag: "Functor"
    name: string,
    expressions: Expression[]
}
type Literal = {
    tag: "Literal",
    value: string
}
export type Expression = Literal | Functor



// TODO: apply rule swap on pair - IN PROGRESS
// * TODO: dereference the bindings
// TODO: move to the main project and commit 
// TODO: implement binding - DONE
// TODO: implement recursion into head matching - traversing each tree (variable binding) - DONE
// taken from noq_example.ts
let bindings: Map<string, Expression> = new Map() // why is the key a string and not an expression

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
        const result = compareExpressions(value, rule.head, bindings)
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
    return error(new MatchError(`Failed to match ${JSON.stringify(value)} with rules`))
}



// const result = match({ tag: "Literal", value: "a" }, [
//     {
//         head: { tag: "Literal", value: "a" },
//         body: { tag: "Literal", value: "b" }
//     }
// ])

// console.log(result)


/* 

(Expr, symbol) -> bind symbol: Expr
(symbol, Expr) -> Error ? 

Swap(Pair(f(c), g(d))) = Pair()
*/
function compareExpressions<T>(expr: Expression, head: Expression, bindings: Map<string, Expression>): Result<Map<string, Expression>, MatchError> {
    // traverse each of the expressions and compare them along the way.
    // you can traverse the expressions recursively

    // [expr, head]
    // (functor, functor) -> check deep equality
    // [_, symbol] -> bind
    // [symbol, functor] -> return error for now

    const both_functors = expr.tag == "Functor" && head.tag == "Functor"

    // 

    if (head.tag == "Literal") {
        // 
        bindings.set(head.value, expr)
        console.log(`bindings: ${bindings}`)
        return ok(bindings)
    }

    else if (both_functors) {
        const same_functor_name = expr.name == head.name
        const functor_eq_arg_len = expr.expressions.length == head.expressions.length
        if (!same_functor_name || !functor_eq_arg_len) {
            return error(new Error("Functors are not identical"))
        }
        // TODO: compare sub statements
        // TODO: create bindings
        // compare sub-expressions
        const zip = (a: any[], b: any[]) => a.map((k, i) => [k, b[i]]);
        const zipped_functors = zip(expr.expressions, head.expressions)
        const results = zipped_functors.map((pair) => {
            const result = compareExpressions(pair[0], pair[1], bindings)
            if (!result) {
                return error(new Error("something went wrong during Functor comparison"))
            }
            else {
                return ok(result)
            }
        })

        if (results.some((result) => !result.ok)) {
            return error(new Error(""))
        }
        // zip + reduce ? determine if one of othem is invalid
        // compareExpressions(expr.expressions, head.expressions)
        return ok(bindings)
    }

    else if (head.tag == "Functor" && expr.tag == "Literal") {
        return error(new Error("Rule Functor has a different shape than a Literal"))
    }
    // TODO: handle other cases
    else {
        return error(new Error("encountered unhandled codepath"))
    }
}



(function main() {

    const swap_pair = new Rule({
        tag: "Functor",
        name: "pair",
        expressions: [{ tag: "Literal", value: "a" }, { tag: "Literal", value: "b" }]
    }, {
        tag: "Functor",
        name: "pair",
        expressions: [{ tag: "Literal", value: "b" }, { tag: "Literal", value: "a" }]
    })
    

    const result = match({
        tag: "Functor",
        name: "pair",
        expressions: [{ tag: "Literal", value: "c" }, { tag: "Literal", value: "d" }]
    }, [swap_pair])
    // Swap(Pair(a,b)) = Pair(a, b)
    // Swap(Pair(g(c), f(d))) -> ?

    console.log(`result: ${JSON.stringify(result)}\n\n\n\n\n\t ----\n RULE: ${JSON.stringify(swap_pair)}`)
    console.log("bindings: ")
    console.log(bindings)
})()
