// Helper function to log test results
export function assertEqual(actual: any, expected: any, message: string): void { //TODO: move to utils
    if (actual === expected) {
        console.log(`✔️  ${message}`);
    } else {
        console.error(`❌  ${message}`);
        console.error(`   Expected: ${expected}, but got: ${actual}`);
    }
}


export function my_includes(l: any[], item: any) { //TODO: move to utils
    let is_equal = false;
    l.forEach((i) => {
        if (i === item) {
            is_equal = true
        }
    })

    return is_equal;
}
