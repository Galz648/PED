type C = A | B
interface A {
    tag: "A"
    expressions: C[]
}

interface B {
    tag: "B"
}

function onB(char: B, acc: string) {
    // console.log(char)
    acc += char.tag
    return acc
}
function onA(char: A, acc: string) {
    console.log(char)
    acc += char.tag
    char.expressions.forEach((expr) => {
        acc += "(" + walkC(expr) + ")"
    })

    return acc
}


function walkB(char: B) {
    return char
}
function walkA(char: A) {
    char.expressions.map((expr) => walkC(expr))
    return { tag: "A", expressions: char.expressions }

}
function walkC(char: C) {
    let acc = "" // TODO: change acc to a class that implements a push 
    char.tag == "A" ? acc += onA(walkA(char) as A, acc) : acc += onB(walkB(char), acc)
    return acc
}
const expr = {
    tag: "A",
    expressions: [
        { tag: "B" }
    ]
} as A

const acc = walkC(expr)
console.log(`acc: ${acc}`)
