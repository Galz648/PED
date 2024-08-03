import { Tuple } from "./types.js";
// Helper function to log test results
export function assertEqual(actual: any, expected: any, message: string): void { //TODO: move to utils
    if (actual === expected) {
        console.log(`✔️  ${message}`);
    } else {
        console.error(`❌  ${message}`);
        console.error(`   Expected: ${expected}, but got: ${actual}`);
    }
}


export function my_includes(l: any[], item: any) { //TODO: change name
    let is_equal = false;
    l.forEach((i) => {
        if (i === item) {
            is_equal = true
        }
    })

    return is_equal;
}

export function reverse(arr: any[]) {
    const reversed: any[] = [];
    for (let step = -1; step > -arr.length + 1; step--)
        reversed.push(arr[step])

    return reversed
}


export function head(str: string): Tuple<string, string>[] { // TODO: consider changing the name 
    // Get the first character and the rest of the string

    if (str.length === 0) {
        return [];
    }

    const head = str[0];
    const rest = str.slice(1);
    return [[head, rest]];
}
