
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
            const c = {
                parsed: head_char, remaining: remaining, input: cursor.input, AST: {
                    value: head_char,
                    type: "DigitNode",
                    children: null
                }
            };
            return ok(c);
        }
        else {
            return error<ParseError>({ message: `Error Parsing Digit: ${head_char}`, index: (cursor.input).indexOf(head_char), input: cursor.input });
        }
    } else {
        return result;
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
            const c = {
                parsed: head_char, remaining: remaining, input: cursor.input, AST: {
                    value: " ",
                    type: "WhiteSpaceNode",
                    children: null
                }
            };
            return ok(c)
        }
        else {
            return error<ParseError>({ message: `Error Parsing Digit: ${head_char}`, index: (cursor.input).indexOf(head_char), input: cursor.input });
        }
    } else {
        return result
    }
};

// Parser that matches a plus or minus sign
// Parser that matches a single whitespace character
export const plus_minus_parser: Parser = (cursor) => {
    const pattern = /^[+-]/;  // Regex to match plus or minus sign
    console.log(`remaining: ${cursor.remaining}`)
    const result = head(cursor.remaining);

    if (result.ok) {
        const head_char = result.value[0];
        const new_remaining = result.value[1];
        const is_pattern = pattern.test(head_char)
        if (is_pattern) {
            const c = {
                parsed: head_char, remaining: new_remaining, input: cursor.input, AST: {
                    value: head_char,
                    type: head_char == "+" ? "PlusNode" : "MinusNode",
                    children: null
                }
            };
            return ok(c);
        }
        else {
            return error<ParseError>({ message: `PlusMinusParser: Error Parsing ${head_char}`, index: (cursor.input).indexOf(head_char), input: cursor.input });
        }
    } else {
        return result;
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
            console.log(`alphabet parser: remaining - <${remaining}>`)
            const c = {
                parsed: head_char, remaining: remaining, input: cursor.input, AST: {
                    value: head_char,
                    type: "CharNode",
                    children: null
                }
            };
            return ok(c);
        }
        else {
            return error<ParseError>({ message: `Error Parsing Alphabet: ${head_char}`, index: (cursor.input).indexOf(head_char), input: cursor.input });
        }
    } else {
        return result;
    }
};
export const factor = Or(alphabet_parser, digit_parser);
// export const simple_parser = Some([alphabet_parser, digit_parser]);
export const term = doSequence([
    alphabet_parser, plus_minus_parser, alphabet_parser
])
export const simple_parser = factor
export const parser_seq = Some(alphabet_parser);

// Combined factor parser for digits and alphabet characters


// Basic binary operation parser
export const basic_bin_op = Or(
    doSequence([
        factor,
        Some(
            Or(plus_minus_parser, white_space_parser)
        ),
        factor
    ]),
    factor
);

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
            remaining: str,
            AST: {
                type: "ROOT",
                value: "",
                children: []
            }
        }

        const result = parser(ci);
        return result;
    } catch (e) {
        return error<ParseError>(e as ParseError); // TODO: determine if there is a better solution than this
    }


}
