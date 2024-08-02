/*
help me write the essentials of a parser combinator in pseudo code/english
parser a :: String -> (a[], String)

parser_combinator(parser[], precedence): parser[] {

parsers = [alphanumeric_parser]


for (parser in parsers) {
    while (parser(str) != []) {
        result = parser(input)

        if (result != []) {
            str = result[1]
        }
        continue
    }

now turn this roughly into code, I wannna try to implement it

}


*/

// function parse_number(str: string): [number, string] {
//     if (str.length == 0) {
//         return [, ""]
//     }
//     return [str, ""]
// }
