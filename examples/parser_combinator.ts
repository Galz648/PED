/* 

Features

a function parse (parser, str) that applies a parser to a string -- HERE
a parser type (thing => [thing, string]) that takes a string and returns a tuple of the parsed thing and the rest of the string
operators on the parse functionality (Some operator - applies parses until it fails), Some(parser1, parser2) - applies parser1 and then parser2, etc.)
sequencing (apply one parser after another), choice (apply one parser or another), and many more
*/
type Tuple<a, b> = [a, b]

function head(str: string): Tuple<string, string>[] { // TODO: consider changing the name 
    // Get the first character and the rest of the string

    if (str.length === 0) {
        return [];
    }

    const head = str[0];
    const rest = str.slice(1);
    return [[head, rest]];
}

type Parser<T> = (str: string) => Tuple<string, string>[];
type ParserCombinator<T> = (parser: Parser<T>) => Parser<T>;
// Parser that matches a single letter from the alphabet
const string_parser: Parser<string> = (str: string): Tuple<string, string>[] => {
    const result = head(str);
    const pattern = /^[a-zA-Z]/; // Regex to match a single letter
    if (pattern.test(result[0]?.[0] ?? '')) { // simplify/clarify this
        return head(str);
    } else {
        return [];
    }
}

function Some<T>(parser: Parser<T>): Parser<T> {
    return (str: string): Tuple<string, string>[] => {
        let should_run = true;
        let accumulator: string = "";

        while (should_run) {
            console.log(`Parsing: ${str}  |   Accumulator: ${accumulator}`);
            const result = parser(str);
            const result_not_empty = result.length > 0;
            if (result_not_empty) {
                accumulator += result[0][0];
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
// Function that applies a parser to a string
function parse<T>(parser: Parser<T>, str: string): Tuple<string, string>[] {
    return parser(str);
}

// Test function for the alphabet parser
function test_parser_alphabet() {
    const testString = "AAAA";
    const result = parse(Some(string_parser), testString);

    if (result.length > 0) {
        console.log(`Parsed: '${result[0][0]}', Remaining: '${result[0][1]}'`);
    } else {
        console.log("Parsing failed or no alphabet character found at the start.");
    }
}

// Run the test
test_parser_alphabet();
