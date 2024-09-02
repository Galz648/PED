import { get_expr_parser } from "../grammer";
import { grammer_parser, parse } from "../parsers";
import { Evaluator, gen_tester, TestCase } from "./test_utils";



const test_cases: TestCase[] = [
    {
        input: "w+",
        expected: false
    },
    {
        input: "w*",
        expected: false
    },
    {
        input: "", // Empty input
        expected: true
    },
    {
        input: "",
        expected: true
    },
    {
        input: "w", // Single number
        expected: true
    },
    {
        input: "w+w", // Addition
        expected: true
    },
    {
        input: "w*y", // Multiplication
        expected: true
    },
    {
        input: "w / w", // Division
        expected: true
    },
    {
        input: "(w+w)", // Nesting
        expected: true
    },
    {
        input: "(w*w)", // Nesting
        expected: true
    },
];






// export const test_parsers: Tester = (test_cases: TestCase[], name: string): TestResults => {


// }

// test_parsers(test_cases, "parser_tester")
const tester_name = "parser_tester"
const evaluator: Evaluator = (_case: TestCase) => {
    return parse(grammer_parser, _case.input)
}
export const parser_tester = gen_tester(test_cases, tester_name, evaluator)
