import { GrammerValidator } from "./grammer_validator.js";
import { Lexer, TOKENS } from "./lexer.js";
import { my_includes } from "./utils.js";
import { basic_bin_op, parse } from "./parsers.js";

document.addEventListener("DOMContentLoaded", () => {

    // TODO: these could be moved to a function
    let textarea = document.getElementById("editor")! as HTMLTextAreaElement;
    const ce_div = document.getElementById('compiled_expression')! as HTMLDivElement;
    const token_display_div = document.getElementById('token_display')! as HTMLDivElement;

    const display_elements_dont_exist = !textarea || !ce_div || !token_display_div;
    if (display_elements_dont_exist) {
        throw Error("something went wrong, html elements are missing.")
    }

    set_textarea_value(); // make sure to run after the elements are defined and loaded

    textarea.addEventListener('input', () => { // the function implementation should move to a function
        const expr = textarea.value;
        ce_div.innerText = expr;

        try {
            const result = parse(basic_bin_op, expr);
            const is_valid = result.length > 0 && result[0][1] === ""; // TODO: encapsulate the logic of the evaluating a result in a function
            if (is_valid == true) {
                textarea.style.backgroundColor = 'darkgreen'; // Change the background color to dark green
            } else {
                textarea.style.backgroundColor = 'darkred'; // Change the background color to dark red
            }
        } catch (e) {
            console.error(e)
            textarea.style.backgroundColor = 'darkred'; // Change the background color to dark red
        }

    });

    console.log("this should recompile!!")
});

function onload() {
    // set the content of the text area to the session storage value if it exists
    set_textarea_value();

}

function set_textarea_value() {
    const textarea = document.getElementById("editor")! as HTMLTextAreaElement;
    if (sessionStorage.getItem('input_text')) {
        textarea.value = sessionStorage.getItem('input_text') as string;
    } else {
        textarea.value = "";
    }
}   
