
import { Result, Ok, Err, error, ok } from "./match.js";
import { ParserCursor, Parser, ParseError } from "./types.js";
// Helper function to log test results
export function assertEqual(actual: any, expected: any, message: string): void { //TODO: move to utils
    if (actual === expected) {
        console.log(`✔️  ${message}`);
    } else {
        console.error(`❌  ${message}`);
        console.error(`   Expected: ${expected}, but got: ${actual}`);
    }
}

export function reverse(arr: any[]) {
    const reversed: any[] = [];
    for (let step = -1; step > -arr.length + 1; step--)
        reversed.push(arr[step])

    return reversed
}

export function head(str: string): Result<string[], ParseError> { // TODO: consider changing the name 
    // Get the first character and the rest of the string

    if (str.length === 0) {
        const parse_error: ParseError = { message: "Error: Empty string", index: 0, input: str , "name" : "head" }; 
        return error<ParseError>(parse_error);
    }

    const head = str[0];
    const rest = str.slice(1);

    return ok<string[]>( // TODO: change to object, instead of array - indices are confusing!
        [head, rest]
    );
}

export function findSubstring(original: string, pattern: string): number[] {
    const regex = new RegExp(pattern, 'g');
    const matches = [];
    let match;

    while ((match = regex.exec(original)) !== null) {
        matches.push(match.index);
    }

    return matches;
}

export const zip = (a: any[], b: any[]) => a.map((k, i) => [k, b[i]]);
