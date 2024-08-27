import exp from "constants"
import { Result, ok, error } from "./match"

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

function onLiteral(literal: Literal, acc: string) {
    acc += literal.value
    return acc
}
function onFunctor(functor: Functor, acc: string) {
    const reps = functor.expressions.map((expr) => {
        return walk_expr(expr)
    })
   
    acc += functor.name + "(" + reps + ")"
    return acc
}

function walk_expr(expr: Expression) {
    let acc = "";
    // acc += onA(walkA(char) as A, acc) : acc += onB(walkB(char), acc)
    return (expr.tag == "Functor") ? onFunctor(walkFunctor(expr), acc) : onLiteral(walkLiteral(expr), acc)
}
// TODO: implement display of rules
// TODO: remove bindings from map when dereferencing
// TODO: function to walk expression (pattern matching)
// TODO: move to the main project and commit 
// TODO: implement binding - DONE
// TODO: dereference the bindings - DONE
// TODO: apply rule swap on pair - DONE
// TODO: implement recursion into head matching - traversing each tree (variable binding) - DONE
/* 
weaknesses of the code: 
mutating global map
nested if statements - how to make these look better ? 

*/
// taken from noq_example.ts
type Bindings = Map<string, Expression>
let bindings: Bindings = new Map() // why is the key a string and not an expression?

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
    const match = rules.some((rule) => { // TODO: change this cranky implementation
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

// TODO: prettify this ugly shit
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

// function expr_to_string(expr: Expression): string {
//     let repr: string = ""
//     // walk expr
//     function walk_expr_inner(expr: Expression) {
//         if (expr.tag == "Functor") {
//             walk_expr_inner(expr.expressions.forEach(()))
//         }
//         else if (expr.tag == "Literal") {
//             return
//         }
//     }

//     walk_expr(expr, (literal: Literal) => {
//         repr.concat(literal.value)
//     }, (functor: Functor) => {
//         repr.concat(functor.name)
//         repr.concat("(")
//         walk_expr(functor, (literal: Literal) => {
//             repr.concat(literal.value)
//         }, )
//     })

//     return repr
// }
function dereference(result: Expression, bindings: Bindings) {

    if (result.tag == "Functor") {
        result.expressions.map((expr) => dereference(expr, bindings))
    }
    else if (result.tag == "Literal") {
        // determine if mapping exists
        const lookup = bindings.get(result.value)
        if (lookup) {
            // replace in result
            if (lookup.tag == "Literal") {
                result.value = lookup.value // replace value
            }
        }
    }
    return result
}


function main() {
    const input = {
        tag: "Functor", name: "swap", expressions: [
            {
                tag: "Functor",
                name: "pair",
                expressions: [{ tag: "Literal", value: "c" }, { tag: "Literal", value: "d" }]
            }]
    }

    const swap_pair = new Rule({
        tag: "Functor", name: "swap", expressions: [
            {
                tag: "Functor",
                name: "pair",
                expressions: [{ tag: "Literal", value: "a" }, { tag: "Literal", value: "b" }]
            }]
    }, {
        tag: "Functor",
        name: "pair",
        expressions: [{ tag: "Literal", value: "b" }, { tag: "Literal", value: "a" }]
    })


    const result = match(input as Expression, [swap_pair])
    // Swap(Pair(a,b)) = Pair(a, b)
    // Swap(Pair(g(c), f(d))) -> ?

    if (result.ok) {
        console.log(`result: ${JSON.stringify(result)}\n\n\n\n\n\t ----\n RULE: ${JSON.stringify(swap_pair)}`)
        console.log("bindings: ")
        console.log(bindings)
        const deref = dereference(result.value, bindings)
        const repr_original = walk_expr(input as Expression)
        const repr_result = walk_expr(deref)
        console.log(`${JSON.stringify(repr_original)} = ${JSON.stringify(repr_result)}`)

    }

}



document.addEventListener("DOMContentLoaded", () => {

    main()
})


function walkFunctor(expr: Functor) {
    expr.expressions.map((expr: Expression) => walk_expr(expr))
    return expr
}

function walkLiteral(expr: Literal): Literal {
    return expr
}

