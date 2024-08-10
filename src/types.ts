
import { Result } from "./match.js"
// TODO: separate into different files
export type Tuple<a, b> = [a, b]
export type EmptyTuple = [];

export interface Node {
    value: string,
    type: string,
    children: Node[] | null
}
// after I have a few parsers down with this functionality I could refactor the code to use a more generic type or a macro
export interface ParserCursor {
    parsed: string
    remaining: string
    input: string
    AST: Node
}



export type Parser = (input: ParserCursor) => Result<ParserCursor, ParseError>; // TODO: change any type to a more specific type
export type ParserCombinator = (parser: Parser) => Parser;
// export type Ok = { kind: "ok", value: string };
// export interface Err { kind: "err", message: string, pos: number };


export interface ParseError { // TODO: should this extend Error?
    message: string;
    index: number;
    input: string;
}

