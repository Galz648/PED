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



type Tester = (cases: TestCase[], name: string) => TestResults


type Evaluator = (_case: TestCase) => Result<any, any> // TODO: provide specific types

function run_cases(test_cases: TestCase[], name: string, evaluator: Evaluator): TestResults {
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

function gen_tester(cases: TestCase[], name: string, evaluator: Evaluator): Tester {
    const results = run_cases(cases, name, evaluator)
    const tester = () => {
        return results
    }
    return tester
}


// Functions
export {
    gen_tester,
    run_cases
}

// Interfaces and Types

export {
    Tester,
    TestCase,
    Evaluator
}
