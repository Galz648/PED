/* 
string -> AST - AST parser+generator
string -> bool - validator
AST -> AST - tree modifier
Parser -> string | Error - parser to grammer rule mapper
string -> Parser | Error - reverse parser lookup 


program flow:
*/

// EXAMPLE
// test the name of the returned function from a higher order function.

// function f() {
//     const g = () => {

//     }
//     return g
// }

// const inner_func = f()

// console.log(`inner_func_name ${inner_func.name}`)


function expr_parser(): Function {
    // should return the parser (plane function or wrapped by parser combinator)
    return () => { return true }
}
function term_parser(): Function {
    // should return the parser (plane function or wrapped by parser combinator)
    return () => { }
}
function parser_equality(p1: Parser, p2: Parser) {
    return true;
}
const mapper = new Map()

mapper.set("term", term_parser())
mapper.set("expr", {
    parser : expr_parser(),
    AST: {value: "", children: []}
})

type Parser = any
function determine_parser(p: Parser): string | Error {
    if (parser_equality(p, mapper.get("expr"))) {
        return mapper.get("expr")
    }

    else {
        throw new Error("parser not recognized")
    }

}



function parse(p: Parser, input: string) {
    const is_valid = p(input)
    if (is_valid) {
        return true
    }
    else {
        return false
    }
}


function main() {
    const top_level_rule_name = "expr"
    const top_level_rule = mapper.get(top_level_rule_name).parser

    const is_valid = parse(top_level_rule, "foo + bar")

    if (is_valid) {
        // generate AST
        const AST = parser_to_AST(top_level_rule_name)
        console.log(`AST: `)
        console.log(AST)

    } else {
        throw new Error("input not parsable")
    }
}

main()

interface Node {
    children: Node[]
    value: string
}
type AST = Node

function parser_to_AST(rule_name: string): AST { // NOTE: This could be refactored to get the AST from the mapper
    return mapper.get(rule_name).AST
}
