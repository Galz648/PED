export type Tuple<a, b> = [a, b]

export type Parser = (str: string) => Tuple<string, string>[];

export type ParserCombinator = (parser: Parser) => Parser;
