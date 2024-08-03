import { Parser, Tuple, ParserCombinator } from "./types";


export function Or(parser1: Parser, parser2: Parser): Parser { // ParserCombinator
    return (str: string): Tuple<string, string>[] => {
        const result1 = parser1(str);
        if (result1.length > 0) {
            return result1;
        }
        return parser2(str);
    }
}

export function doSequence<T>(parsers: Parser[]): Parser {
    return (input: string): Tuple<string, string>[] => {
        let acc = "";
        let remainingInput = input;

        for (const parser of parsers) {
            const result = parser(remainingInput);
            if (!result) {
                // If any parser fails, return null
                return [];
            }
            // console.log(`result: ${result}`);
            const [parsedValue, newRemainingInput] = result[0];
            acc += parsedValue;
            remainingInput = newRemainingInput;
        }

        // Return the accumulated results and the remaining input
        return [[acc, remainingInput]];
    };
}
export const Some: ParserCombinator = (parser: Parser): Parser => {
    return (str: string): Tuple<string, string>[] => {
        let should_run = true;
        let accumulator: string = "";

        while (should_run) {
            const result = parser(str);
            console.log(`Result: ${result}`);
            const result_not_empty = result.length > 0;
            if (result_not_empty) {
                accumulator += result[0][0]; // TODO: beautify this
                console.log(`Parsing: ${str}  |   Accumulator: ${accumulator}`);
                str = result[0][1]; // Update the string
            } else {
                should_run = false;
            }
        }

        if (accumulator.length > 0) {
            return [[accumulator, str]];
        }
        return [];

    }
}
