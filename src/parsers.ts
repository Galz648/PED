
import { ParseError, ParserCursor } from './types.js';
import { Parser } from './types.js';
import { Result, Ok, Err, error, ok } from './match.js';
import { findSubstring, head } from './utils.js';
// import { Or, Some, doSequence } from './parser_combinators.js';
import { doSequence, Or, Some } from './parser_combinators.js';
import { ASTGenerator } from './ast_generator.js';


// TODO: Extract parser inner functionality to a function
// TODO: write function to have a n-ary input for Or
// Parser that matches a single digit


export const literal_parser = (literal: string): Parser<string> => {
    const _ = (cursor: ParserCursor) => {
        const result = head(cursor.remaining);
        // TOOD: figure out the position of the parser at points of failure

        if (result.ok) {
            const is_pattern = result.value[0] == literal
            const head_char = result.value[0];
            const remaining = result.value[1];
            if (is_pattern) {
                const c = {
                    parsed: head_char, remaining: remaining, input: cursor.input, AST: []
                    // cursor.AST.push(literal_node)
                };
                return ok(c);
            }
            else {
                return error<ParseError>({ message: `Error - Expected Literal "${literal}": ${head_char}`, index: (cursor.input).indexOf(head_char), input: cursor.input, name: "literal_parser" });
            }
        } else {
            return result;
        }
    }
    return _

}
const digit_parser: Parser<number> = (cursor) => { // TODO: change to a more specific type
    const pattern = /^[0-9]/; // Regex to match a single digit
    const result = head(cursor.remaining);
    // TOOD: figure out the position of the parser at points of failure

    if (result.ok) {
        const is_pattern = pattern.test(result.value[0])
        const head_char = result.value[0];
        const remaining = result.value[1];

        if (is_pattern) {
            const c = {
                ...cursor,
                parsed: head_char, remaining: remaining, input: cursor.input, AST: []
            };
            return ok(c);
        }
        else {
            return error<ParseError>({
                message: `Error Parsing Digit: ${head_char}`, index: (cursor.input).indexOf(head_char), input: cursor.input,
                name: ''
            });
        }
    } else {
        return result;
    }

}



// Parser that matches a single whitespace character
export const white_space_parser: Parser<" "> = (cursor) => {
    const pattern = /^\s/; // Regex to match a single whitespace character
    const result = head(cursor.remaining);

    if (result.ok) {
        const is_pattern = pattern.test(result.value[0])
        const head_char = result.value[0];
        const remaining = result.value[1];
        if (is_pattern) {
            const c = {
                ...cursor,
                parsed: head_char, remaining: remaining, input: cursor.input, AST: []
            };
            return ok(c)
        }
        else {
            return error<ParseError>({
                message: `Error Parsing White Space: ${head_char}`, index: (cursor.input).indexOf(head_char), input: cursor.input,
                name: 'white_space_parser'
            });
        }
    } else {
        return result
    }
};

// Parser that matches a plus or minus sign
// Parser that matches a single whitespace character
export const plus_minus_parser: Parser<"+" | "-"> = (cursor) => {
    const pattern = /^[+-]/;  // Regex to match plus or minus sign
    const result = head(cursor.remaining);

    if (result.ok) {
        const head_char = result.value[0];
        const new_remaining = result.value[1];
        const is_pattern = pattern.test(head_char)
        if (is_pattern) {
            const c = {
                ...cursor,
                parsed: head_char, remaining: new_remaining, input: cursor.input, AST: []
            };
            return ok(c);
        }
        else {
            return error<ParseError>({
                message: `PlusMinusParser: Error Parsing ${head_char}`, index: (cursor.input).indexOf(head_char), input: cursor.input,
                name: 'plus_minus_parser'
            });
        }
    } else {
        return result;
    }
};

export const alphabet_parser: Parser<string> = (cursor) => {
    const pattern = /^[a-zA-Z]/; // Regex to match a single alphabet letter
    const result = head(cursor.remaining);

    if (result.ok) {
        const is_pattern = pattern.test(result.value[0])
        const head_char = result.value[0];
        const remaining = result.value[1];
        if (is_pattern) {
            const c = {
                ...cursor, parsed: head_char, remaining: remaining, input: cursor.input, AST: []
            };
            return ok(c);
        }
        else {
            return error<ParseError>({
                message: `Error Parsing Alphabet: ${head_char}`, index: (cursor.input).indexOf(head_char), input: cursor.input,
                name: ''
            });
        }
    } else {
        return result;
    }
};




// Combined factor parser for digits and alphabet characters



// export const simple_parser = Some(
//     Or(
//         alphabet_parser, digit_parser
//     ));

// Function that applies a parser to a string
export const eof_parser: Parser<""> = (cursor) => {
    if (cursor.remaining.length == 0) {
        const result = head(cursor.remaining)
        const c = {
            parsed: "", remaining: "", input: cursor.input
        };
        return ok(cursor);
    }
    return error<ParseError>({
        message: "Error - Expected EOF", index: (cursor.input).indexOf(cursor.remaining), input: cursor.input,
        name: ''
    });
}

export function parse<T>(parser: Parser<T>, str: string): Result<ParserCursor, ParseError> {
    try {
        // parsing_result.length > 0 && parsing_result === "" // TODO: write an alternative to this
        const ci: ParserCursor = {
            parsed: "",
            input: str,
            remaining: str,
            AST: []
        }

        const result = parser(ci);
        const ast_gen = new ASTGenerator();
        if (result.ok) {
            const ast = ast_gen.visitTerm(result.value.AST);

        }
        return result;
    } catch (e) {
        return error<ParseError>(e as ParseError); // TODO: determine if there is a better solution than this
    }


}
export const mult_div_parser: Parser<"+" | "*"> = (cursor) => {
    const pattern = /^[*/]/; // Regex to match a single digit
    const result = head(cursor.remaining);
    // TOOD: figure out the position of the parser at points of failure

    if (result.ok) {
        const is_pattern = pattern.test(result.value[0])
        const head_char = result.value[0];
        const remaining = result.value[1];
        if (is_pattern) {
            const c = {
                ...cursor, parsed: head_char, remaining: remaining, input: cursor.input, AST: [{
                    value: head_char,
                    type: "BinOpNode",
                    children: null
                }]
            };
            return ok(c);
        }
        else {
            return error<ParseError>({
                message: `Error Parsing (* | /): ${head_char}`, index: (cursor.input).indexOf(head_char), input: cursor.input,
                name: ''
            });
        }
    } else {
        return result;
    }
}
const eq_parser: Parser<"="> = (cursor) => {
    const pattern = /^=/; // Regex to match a single digit
    const result = head(cursor.remaining);
    // TOOD: figure out the position of the parser at points of failure

    if (result.ok) {
        const is_pattern = pattern.test(result.value[0])
        const head_char = result.value[0];
        const remaining = result.value[1];
        if (is_pattern) {
            const c = {
                ...cursor, parsed: head_char, remaining: remaining, input: cursor.input, AST: [{
                    value: head_char,
                    type: "KEYWORD",
                    children: null
                }]
            };
            return ok(c);
        }
        else {
            return error<ParseError>({
                message: `Error Parsing EQ: ${head_char}`, index: (cursor.input).indexOf(head_char), input: cursor.input,
                name: ''
            });
        }
    } else {
        return result;
    }
};


export { doSequence };


export const left_paran_parser = literal_parser("(")
export const right_paran_parser = literal_parser(")")

// Grammer rules as parser combinators


