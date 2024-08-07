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

        let parsed = "";
        for (const parser of parsers) {

            const result = parser(cursor);
            if (result.ok) {
                parsed += result.value.parsed;
            } else {
                return error<ParseError>({ message: `doSequence - Error Parsing: ${cursor.remaining}`, index: (cursor.input).indexOf(cursor.remaining), input: cursor.input });
            }
        }
        return ok({ parsed: parsed, remaining: cursor.remaining, input: cursor.input });
    }
    return wrapped_parser;
};

export const Some: ParserCombinator = (parser: Parser): Parser => {
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
            input: cursor.input
        });
    }

    return wrapped_parser;
}
