
import { Tuple, Parser, ParseError, ParserCursor } from './types.js';
import { Result, Ok, Err, error, ok } from './match.js';
import { findSubstring, head } from './utils.js';
// import { Or, Some, doSequence } from './parser_combinators.js';
import { doSequence, Or, Some } from './parser_combinators.js';

// TODO: Extract parser inner functionality to a function
// TODO: write function to have a n-ary input for Or
// Parser that matches a single digit
const digit_parser: Parser = (cursor) => {
    const pattern = /^[0-9]/; // Regex to match a single digit
    const result = head(cursor.remaining);
    // TOOD: figure out the position of the parser at points of failure

    if (result.ok) {
        const is_pattern = pattern.test(result.value[0])
        const head_char = result.value[0];
        const remaining = result.value[1];
        if (is_pattern) {
            const c = { parsed: head_char, remaining: remaining, input: cursor.input } as ParserCursor;
            return ok(c) as Ok<ParserCursor>;
        }
        else {
            return error<ParseError>({ message: `Error Parsing Digit: ${head_char}`, index: (cursor.input).indexOf(head_char), input: cursor.input });
        }
    } else {
        return result as Err<ParseError>;
    }

}



// Parser that matches a single whitespace character
const white_space_parser: Parser = (cursor) => {
    const pattern = /^\s/; // Regex to match a single whitespace character
    const result = head(cursor.remaining);

    if (result.ok) {
        const is_pattern = pattern.test(result.value[0])
        const head_char = result.value[0];
        const remaining = result.value[1];
        if (is_pattern) {
            const c = { parsed: head_char, remaining: remaining, input: cursor.input } as ParserCursor;
            return ok(c) as Ok<ParserCursor>;
        }
        else {
            return error<ParseError>({ message: `Error Parsing Digit: ${head_char}`, index: (cursor.input).indexOf(head_char), input: cursor.input });
        }
    } else {
        return result as Err<ParseError>;
    }
};

// Parser that matches a plus or minus sign
// Parser that matches a single whitespace character
export const plus_minus_parser: Parser = (cursor) => {
    const pattern = /^[+-]/;  // Regex to match plus or minus sign
    const result = head(cursor.remaining);

    if (result.ok) {
        const is_pattern = pattern.test(result.value[0])
        const head_char = result.value[0];
        const remaining = result.value[1];
        if (is_pattern) {
            const c = { parsed: head_char, remaining: remaining, input: cursor.input } as ParserCursor;
            return ok(c) as Ok<ParserCursor>;
        }
        else {
            return error<ParseError>({ message: `Error Parsing ( + | - ): ${head_char}`, index: (cursor.input).indexOf(head_char), input: cursor.input });
        }
    } else {
        return result as Err<ParseError>;
    }
};

const alphabet_parser: Parser = (cursor) => {
    const pattern = /^[a-zA-Z]/; // Regex to match a single alphabet letter
    const result = head(cursor.remaining);

    if (result.ok) {
        const is_pattern = pattern.test(result.value[0])
        const head_char = result.value[0];
        const remaining = result.value[1];
        if (is_pattern) {
            const c = { parsed: head_char, remaining: remaining, input: cursor.input } as ParserCursor;
            return ok(c) as Ok<ParserCursor>;
        }
        else {
            return error<ParseError>({ message: `Error Parsing Alphabet: ${head_char}`, index: (cursor.input).indexOf(head_char), input: cursor.input });
        }
    } else {
        return result as Err<ParseError>;
    }
};
// export const simple_parser = Some([alphabet_parser, digit_parser]);
export const simple_parser = Or(Or(digit_parser, plus_minus_parser), alphabet_parser);

// Combined factor parser for digits and alphabet characters
// export const factor = Or(alphabet_parser, digit_parser;
export const parser_seq = Some(alphabet_parser);
// Basic binary operation parser
// export const basic_bin_op = Or(
//     doSequence([
//         factor,
//         Some(
//             Or(plus_minus_parser, white_space_parser)
//         ),
//         factor
//     ]),
//     factor
// );

// export const simple_parser = Some(
//     Or(
//         alphabet_parser, digit_parser
//     ));

// Function that applies a parser to a string
export function parse(parser: Parser, str: string): Result<ParserCursor, ParseError> {
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
