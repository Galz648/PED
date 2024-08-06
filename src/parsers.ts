
import { Tuple, Parser, ParserCombinator, ParseError, ParserCursor } from './types.js';
import { Result, Ok, Err, error, ok, match } from './match.js';
import { findSubstring, head } from './utils.js';
// import { Or, Some, doSequence } from './parser_combinators.js';
import { Or} from './parser_combinators.js';



// Parser that matches a single digit
function digit_parser(cursor: ParserCursor): Result<ParserCursor, ParseError> {
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
    // const first_item: string = result.value;
    // const first_pos = findSubstring(cursor.remaining, first_item)[0];
    // const remaining: string = cursor.remaining.substring(1);


    //     const is_pattern: boolean = pattern.test(first_item);
    //     if (is_pattern) {
    //         const cursor: ParserCursor = { parsed: "bar" + first_item, remaining, input: "foo" };
    //         return ok<ParserCursor>(cursor);
    //     }
    //     else {
    //         return error<ParseError>({ message: `Error Parsing Digit: ${first_item}`, pos: first_pos, input: cursor.input });
    //     }
    // let foo = match(result,
    //     (_) => {
    //         const first_item: string = _.value[0];
    //         const first_pos = findSubstring(cursor.remaining, first_item)[0];
    //         const remaining: string = _.value[1]

    //         const is_pattern: boolean = pattern.test(first_item);
    //         if (is_pattern) {
    //             // cursor = { parsed: cursor.parsed + first_item, remaining, input: cursor.input } as ParserCursor;
    //             const cursor: ParserCursor = { parsed: "bar" + first_item, remaining, input: "foo" };
    //             return ok<ParserCursor>(cursor);
    //         }
    //         else {

    //             // return error<ParseError>({ message: "Error parsing digit", pos: first_pos, input: cursor.parsed });
    //             return ({ ok: false, value: { message: `Error Parsing Digit: ${first_item}`, pos: first_pos, input: cursor.input } });
    //         }
    //     },
    //     (err) => {
    //         return ({ message: `Error Parsing Digit: ${err.value}`, pos: 0, input: cursor.input });
    //     }
    // ); 
    // help me construct a result object
    result.ok ? console.log("ok") : console.log("error");
}

// constructing a result object


// };

// // Parser that matches a single whitespace character
// const white_space_parser = (str: string): Ok<string[]> => {
//     const pattern = /^\s/; // Regex to match a single whitespace character
//     const result = head(str);
//     let match(result,
//         (result) => {
//             if (pattern.test(ok.value)) {
//                 return ok(ok.value);
//             }
//         },
//         (err) => {
//             return ok([]);
//         }
//     // );

// };

// // Parser that matches a plus or minus sign
// const plus_minus_parser = (str: string): Ok<string[]> => {
//     const pattern = /^[+-]/; // Regex to match a plus or minus sign
//     const result = head(str);

//     if (result.kind === "ok" && pattern.test(result.value)) {
//         return ok(result.value);
//     }
//     return ok([]);
// };


// // Parser that matches a single alphabet letter
// const alphabet_parser = (str: string): Ok<string[]> => {
//     const pattern = /^[a-zA-Z]/; // Regex to match a single alphabet letter
//     const result = head(str);

//     if (result.kind === "ok" && pattern.test(result.value)) {
//         return ok(result.value);
//     }
//     return ok([]);
// };

// export const simple_parser = Some([alphabet_parser, digit_parser]);
export const simple_parser = Or(digit_parser, digit_parser);

// Combined factor parser for digits and alphabet characters
// const factor = Or(alphabet_parser, digit_parser);

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

