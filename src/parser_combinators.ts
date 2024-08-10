import { Parser, Tuple, ParserCombinator, ParseError, ParserCursor } from "./types";
import {
    Result, Ok, Err, error, ok
} from "./match.js";

// TODO: remove duplicate type from function declarations
// TODO: change [] to EmptyTuple in types.ts

// rewriting the Or function to use the new Parser type - use the ParserCursor type
export function Or(parser1: Parser, parser2: Parser): Parser {
    return (input: ParserCursor): Result<ParserCursor, ParseError> => {
        const result1 = parser1(input);
        if (result1.ok) {
            return result1;
        }
        return parser2(input);
    }
}

export const doSequence = (parsers: Parser[]): Parser => {
    const wrapped_parser: Parser = (cursor) => {
        const ASTs = []
        let new_cursor = cursor
        let parsed = "";
        for (const parser of parsers) {

            const result = parser(new_cursor);
            if (result.ok) {
                new_cursor = result.value
                parsed += result.value.parsed; // TODO: why this ? 
                ASTs.push(result.value.AST)
            } else {
                console.log("AST: ")
                console.log(ASTs)
                return error<ParseError>({ message: `doSequence - Error Parsing: <${parser.name}> failed to recognize <${cursor.remaining[0] ?? ""}>. \n Error: ${result.value.message}`, index: (cursor.input).indexOf(cursor.remaining), input: cursor.input });
            }
        }
        
        return ok({
            parsed: parsed, remaining: cursor.remaining, input: cursor.input, AST: ASTs
        });
    }
    return wrapped_parser;
};

export const Some: ParserCombinator = (parser: Parser): Parser => {
    const ASTs = [];
    const wrapped_parser: Parser = (cursor) => {
        let parsed = "";
        let should_run = true
        let remaining = cursor.remaining
        let new_cursor = cursor

        while (should_run) {
            console.log("running some");
            const result = parser(new_cursor);
            if (result.ok) {
                console.log(result.value)
                parsed += result.value.parsed
                new_cursor = result.value
                ASTs.push(new_cursor.AST)
                if (new_cursor.remaining.length == 0) {
                    should_run = false
                }
            }
            else {
                return error<ParseError>({
                    message: `Some - Failed Parsing: ${remaining}`,
                    index: result.value.index,
                    input: cursor.input
                })
            }

        }
        return ok({
            parsed: parsed,
            remaining: new_cursor.remaining,
            input: cursor.input,
            AST: {
                value: "bar",
                children: [],
                type: "foo",
            }
        });
    }

    return wrapped_parser;
}
