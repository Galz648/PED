import { Result, ok, error } from "./match"
import { zip } from "./utils"
type Bindings = Map<string, Expression>
let bindings: Bindings = new Map()

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



function match_expr(expr: Expression, onLiteral: (expr: Literal) => any, onFunctor: (expr: Functor) => any, handle_else: (expr: Expression) => any) {
    if (expr.tag == "Literal") {
        return onLiteral(expr)
    }
    else if (expr.tag == "Functor") {
        return onFunctor(expr)
    }
    else {
        handle_else(expr)
    }
}



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
/* 
weaknesses of the code: 
mutating global map
nested if statements - how to make these look better ? 

*/



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

// TODO: prettify this ugly shit
function compareExpressions<T>(expr: Expression, head: Expression, bindings: Map<string, Expression>): Result<Map<string, Expression>, MatchError> {
    // traverse each of the expressions and compare them along the way.
    // traversing the expressions recursively

    // [expr, head]
    // (functor, functor) -> check deep equality
    // [_, symbol] -> bind
    // [symbol, functor] -> return error for now

    const both_functors = expr.tag == "Functor" && head.tag == "Functor"
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
            return error(new Error("Something bad happened"))
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
function walkFunctor(expr: Functor) {
    expr.expressions.map((expr: Expression) => walk_expr(expr))
    return expr
}

function dereference(expr: Expression, bindings: Bindings) { // TODO: change name from result

    const onLiteral = (literal: Literal) => {
        const lookup = bindings.get(literal.value)
        if (lookup) {
            if (lookup.tag == "Literal") {
                literal.value = lookup.value
            }
        }
    }
    const onFunctor = (functor: Functor) => functor.expressions.map((expr) => dereference(expr, bindings))
    // const onLiteral = 

    match_expr(expr, onLiteral, onFunctor, (_) => {
        console.error("case not handled ")
    })

    return expr
}

function main() {
    // TODO: create a "replace all" given an expression and a rule
    // TODO: instead of inputting an Expression, create a parser to generate the Expression from string
    const input = {
        tag: "Functor", name: "swap", expressions: [
            {
                tag: "Functor",
                name: "pair",
                expressions: [{ tag: "Literal", value: "c" }, { tag: "Literal", value: "d" }]
            }]
    }

    const swap_pair = new Rule(
        {
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

    if (result.ok) {
        console.log("bindings: ")
        console.log(bindings)
        const deref = dereference(result.value, bindings)
        const repr_original = walk_expr(input as Expression)
        const repr_result = walk_expr(deref)
        console.log(`${JSON.stringify(repr_original)} = ${JSON.stringify(repr_result)}`)

    }

}


document.addEventListener("DOMContentLoaded", () => { main() })

function walkLiteral(expr: Literal): Literal {
    return expr
}

