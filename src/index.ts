import { GrammerValidator } from "./grammer_validator.js";
import { Lexer } from "./lexer.js";
document.addEventListener("DOMContentLoaded", () => {
    const lexer = new Lexer();
    const gv = new GrammerValidator(lexer)

    let textarea = document.getElementById("editor")! as HTMLTextAreaElement;
    const ce_div = document.getElementById('compiled_expression')! as HTMLDivElement;
    const token_display_div = document.getElementById('token_display')! as HTMLDivElement;

    if ((!textarea || !ce_div || !token_display_div)) {
        throw Error("something went wrong, html elements are missing.")
    }


    textarea.addEventListener('input', () => {
        const expr = textarea.value;
        ce_div.innerText = expr;


        gv.lexer.reset_state()
        // tokenize expression
        gv.lexer.lex(expr)

        // set the tokens display
        token_display_div.innerText = String(gv.lexer.get_tokens())

        const is_valid = gv.validate();
        console.log(`${expr}: ${is_valid}`)

        if (is_valid) {
            textarea.style.backgroundColor = 'darkblue'; // Change the background color to dark green
        } else {
            textarea.style.backgroundColor = 'darkred'; // Change the background color to dark red
        }
    });

    console.log("this should recompile!!")
});

