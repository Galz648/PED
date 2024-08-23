
import { Result } from "./match.js"



// after I have a few parsers down with this functionality I could refactor the code to use a more generic type or a macro
export interface ParserCursor<T>{
    parsed: string
    remaining: string
    input: string
    AST : any[] // TODO: change any type to a more specific type
}



export type Parser<T> = (input: ParserCursor) => Result<ParserCursor, ParseError>; // TODO: change any type to a more specific type
export type ParserCombinator = <T,U>(parser: Parser<T>) => Parser<U>;


export interface ParseError extends Error { // TODO: should this extend Error?
    message: string;
    index: number;
    input: string;
}

