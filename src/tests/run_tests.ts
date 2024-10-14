


// add the tests that you want to run here

import { parser_tester } from "./test_parsers";
import { LazyTestResults, Tester } from "./test_utils";


const testers_to_run: LazyTestResults[] = [
    parser_tester
];



(function run_testers() {
    const results = parser_tester()
    // throw Error("func not implemented")
})()
