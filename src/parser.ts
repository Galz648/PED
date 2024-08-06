import { Err, Ok, error, ok, Result } from "./match.js";
import {
    ParseError,
    ParserCursor,
    Parser
} from "./types.js"
// Function that applies a parser to a string
export function parse(parser: Parser, str: string): Result<ParserCursor, ParseError> {
    // Grammar:
    // root: expr | statement
    // statement: expr = expr
    // term: (UnaryOp(factor) (BinaryOp factor)* | term (BinaryOp factor)*
    // factor: UnaryOp(SYMBOL) | UnaryOp(CONSTANT) | SYMBOL | CONSTANT
    // UnaryOp: ` | _- | _+
    // BinaryOp: + | - | * | / | ^
    // Null : "" <--
    try {
        // parsing_result.length > 0 && parsing_result === "" // TODO: write an alternative to this
        const ci: ParserCursor = {
            parsed: "",
            input: str,
            remaining: str
        }

        const result = parser(ci);
        return result;
        // return ok<string[]>(result)
    } catch (e) {
        return error<ParseError>(e as ParseError); // TODO: determine if there is a better solution than this
    }


}
