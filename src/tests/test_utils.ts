import { Result } from "../match"

interface TestCase {
    input: string,
    expected: boolean
}


export interface TestResults {
    tester : string
    num_success: number
    num_fail: number
}

type LazyTestResults = () => TestResults

type Tester = (cases: TestCase[], name: string, evaluator: Evaluator ) => LazyTestResults


type Evaluator = (_case: TestCase) => Result<any, any> // TODO: provide specific types

function run_cases(test_cases: TestCase[], name: string, evaluator: Evaluator): TestResults { // TODO: move to utils? 
    let total_tests = test_cases.length
    let failing_tests = 0
    let passing_tests = 0

    for (const test_case of test_cases) {
        // const result = parse(get_expr_parser(), test_case.input);
        const result = evaluator(test_case)
        if (result.ok !== test_case.expected) {
            failing_tests += 1

            console.error(`Test Failed for input: "${test_case.input}" \n Expected: ${test_case.expected} \n Got: ${result.ok}`);
        } else {
            passing_tests += 1
            // TODO: log to console that test succeeded
            // test_cases.map((test_case) => console.log(`test_case.input: "${test_case.input}" \n result: ${test_case.ok}`))
        }


        // print report
        console.info(`Total Tests: ${total_tests} \n Failing Tests: ${failing_tests} \n Passing Tests: ${passing_tests}`);

    }

    return {
        tester: name,
        num_fail: failing_tests,
        num_success: passing_tests,
    }
}

const gen_tester: Tester = (cases: TestCase[], name: string, evaluator: Evaluator) => {
    return () => {
    const results = run_cases(cases, name, evaluator)
        return results
    }
}


// Functions
export {
    gen_tester,
    run_cases
}

// Interfaces and Types

// Interfaces and Types
export {
    Tester,
    TestCase,
    // Evaluator,
    LazyTestResults, Evaluator
}
