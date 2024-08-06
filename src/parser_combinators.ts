import { Parser, Tuple, ParserCombinator, ParseError, ParserCursor } from "./types";
import {
    Result, Ok, Err, error, ok
} from "./match.js";

// TODO: remove duplicate type from function declarations
// TODO: change [] to EmptyTuple in types.ts
// are these functions pure?

// export function Or(parser1: Parser, parser2: Parser): Parser { // ParserCombinator - TODO: add parser to funtion declaration
//     return (input: ParserCursor):  => {
//         const result1 = parser1(str);
//         match<Result>(result1, (ok) => {
//         if (result1.value.length > 0) {
//             return result1;
//         }
//         return parser2(str);
//     },
//         (err) => { // TODO: there is nothing to do here, since 

//         });
// }

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


// export function doSequence<T>(parsers: Parser[]): Parser {
//     return (input: string): Result => {
//         let acc = "";
//         let remainingInput = input; // <- position tracking, create error handling

//         for (const parser of parsers) {
//             const result = parser(remainingInput);
//             if (result.length === 0) {
//                 return [];
//             }
//             // console.log(`result: ${result}`);
//             const [parsedValue, newRemainingInput] = result[0];
//             acc += parsedValue;
//             remainingInput = newRemainingInput;
//         }

//         // Return the accumulated results and the remaining input
//         return [acc, remainingInput];
//     };
// }
// export const Some: ParserCombinator = (parser: Parser): Parser => {
//     return (str: string): Result => {
//         let should_run = true;
//         let accumulator: string = ""; // <- position tracking, create error handling

//         while (should_run) {
//             const result = parser(str);
//             console.log(`Result: ${result}`);
//             const result_not_empty = result.length > 0;
//             if (result_not_empty) {
//                 const tuple: Tuple<string, string> = [result[0]!, result[1]!];
//                 console.log(`Tuple: ${tuple}`);
//                 accumulator += result[0]; // TODO: beautify this
//                 console.log(`Parsing: ${str}  |   Accumulator: ${accumulator}`);
//                 str = result[1]! // WARNING: ! - 
//             } else {
//                 should_run = false;
//             }
//         }

//         if (accumulator.length > 0) {
//             return [accumulator, str];
//         }
//         return [];

//     }
// }
