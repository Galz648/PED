import { doSequence, Or, Some } from './primitives.js';
import { Tuple, Parser, ParserCombinator } from './types.js';
import { head } from './utils.js';
// Parser that matches a single letter from the alphabet

const white_space_parser = (str: string): Tuple<string, string>[] => {
    const result = head(str);
    const pattern = /^\s/; // Regex to match a single letter
    if (pattern.test(result[0]?.[0] ?? '')) { // simplify/clarify this
        return head(str);
    } else {
        return [];
    }
}
const plus_minus_parser = (str: string): Tuple<string, string>[] => {
    const result = head(str);
    const pattern = /^[+-]/; // Regex to match a single letter
    if (pattern.test(result[0]?.[0] ?? '')) { // simplify/clarify this
        return head(str);
    } else {
        return [];
    }
}
const digit_parser = (str: string): Tuple<string, string>[] => {
    const result = head(str);
    const pattern = /^[0-9]/; // Regex to match a single letter
    if (pattern.test(result[0]?.[0] ?? '')) { // simplify/clarify this
        return head(str);
    } else {
        return [];
    }
};
const char_parser: Parser = (str: string): Tuple<string, string>[] => { // TODO: change name to alphabet_parser
    const result = head(str);
    const pattern = /^[a-zA-Z]/; // Regex to match a single letter
    if (pattern.test(result[0]?.[0] ?? '')) { // simplify/clarify this
        return head(str);
    } else {
        return [];
    }
}


const factor = Or(char_parser, digit_parser);
export const basic_bin_op =
    doSequence([
        factor,
        Some(
            Or(plus_minus_parser, white_space_parser)
        ),
        factor
    ])




// Function that applies a parser to a string
export function parse(parser: Parser, str: string): Tuple<string, string>[] {
    // Grammer:
    // root: expr | statement
    // statement: expr = expr
    // 0 - term: (UnaryOp(factor) (BinaryOp factor)* | term (BinaryOp factor)*
    //     factor: UnarOp(SYMBOL) | UnarOp(CONSTANT) | SYMBOL | CONSTANT
    //     UnaryOp: ` | _- | _+
    // 2 - BinaryOp: + | - | * | / | ^
    // 3 - Null : "" <-- 
    return parser(str);
}
