
import { Expression } from "./grammer.js"
import { Result } from "./match.js"
// TODO: separate into different files


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
    AST : any[] // TODO: change any type to a more specific type
}



export type Parser<T> = (input: ParserCursor) => Result<ParserCursor, ParseError>; // TODO: change any type to a more specific type
export type ParserCombinator = <T,U>(parser: Parser<T>) => Parser<U>;
// export type Ok = { kind: "ok", value: string };
// export interface Err { kind: "err", message: string, pos: number };


export interface ParseError extends Error { // TODO: should this extend Error?
    message: string;
    index: number;
    input: string;
}

