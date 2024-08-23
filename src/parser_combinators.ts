import { Parser, ParserCombinator, ParseError, ParserCursor } from "./types";
import {
    Result, Ok, Err, error, ok
} from "./match.js";

// TODO: remove duplicate type from function declarations
// TODO: change [] to EmptyTuple in types.ts

// rewriting the Or function to use the new Parser type - use the ParserCursor type
export function Or<T, U> (parser1: Parser<T >, parser2: Parser<U>): Parser<T| U> {
    return (input: ParserCursor): Result<ParserCursor, ParseError> => {
        const result1 = parser1(input);
        if (result1.ok) {
            return result1;
        }
        return parser2(input);
    }
}


export const doSequence= (parsers: Parser<any>[]): Parser<any> => {
    const wrapped_parser: Parser<any> = (cursor) => {
        let new_cursor = cursor
        let acc = "";
        let ast_acc: any[] = []
        for (const parser of parsers) {

            const result = parser(new_cursor);
            if (result.ok) {
                new_cursor = result.value // ? 
                acc += result.value.parsed; // TODO: why this ?
                ast_acc.push(...result.value.AST)
            } else {
                return error<ParseError>({ message: `doSequence - Error Parsing: <${parser.name}> failed to recognize <${cursor.remaining[0] ?? ""}>. \n Error: ${result.value.message}`, index: (cursor.input).indexOf(cursor.remaining), input: cursor.input, name: ""}); // TODO: format the string or just propegate, it looks awful
            }
        }
        return ok({
            parsed: acc, remaining: new_cursor.remaining, input: cursor.input, AST: ast_acc
        });
    }
    return wrapped_parser;
};

export const Some: ParserCombinator = <T>(parser: Parser<T>): Parser<T> => {

    const wrapped_parser: Parser<T> = (cursor) => {
        let parsed = "";
        let should_run = true
        let remaining = cursor.remaining
        let new_cursor = cursor

        while (should_run) {

            const result = parser(new_cursor);
            if (result.ok) {
                parsed += result.value.parsed
                new_cursor = result.value
                if (new_cursor.remaining.length == 0) {
                    should_run = false
                }
            }
            else {
                return error<ParseError>({
                    name: "Some",
                    message: `Some - Failed Parsing: ${remaining}`,
                    index: result.value.index,
                    input: cursor.input,
                    
                })
            }

        }
        return ok({
            parsed: parsed,
            remaining: new_cursor.remaining,
            input: cursor.input,
            AST: []
        });
    }

    return wrapped_parser;
}
