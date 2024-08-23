import { get_expr_parser } from "./grammer";
import { parse } from "./parsers";

interface TestCase {
    input: string,
    expected: boolean
}


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



const test_parsers = (test_cases: TestCase[]) => {
    let total_tests = test_cases.length
    let failing_tests = 0
    let passing_tests = 0

    for (const test_case of test_cases) {
        const result = parse(get_expr_parser(), test_case.input);
        if (result.ok !== test_case.expected) {
            failing_tests += 1

            console.error(`Test Failed for input: "${test_case.input}" \n Expected: ${test_case.expected} \n Got: ${result.ok}`);
        } else {
            passing_tests += 1
        }


    }
    // print report
    console.warn(`Total Tests: ${total_tests} \n Failing Tests: ${failing_tests} \n Passing Tests: ${passing_tests}`);
    test_cases.map((test_case) => console.log(`test_case.input: "${test_case.input}" \n result: ${parse(Expr, test_case.input, "expression").ok}`))
    // console.warn(`input: ${}`)

}

test_parsers(test_cases)
