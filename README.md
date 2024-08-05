# Components:
* Lexer - turns the input string into a series of tokens
* Grammer Validator - determines if the "mathematical expression" is valid
* Editor - 
* http-server - used in the command line to watch for change done in public files, serving the updated file.

# TODO:
* shorten the feedback loop - connect text editor with the engine (IN PROGRESS)
* Visualize the grammer validator grammer given an input string (next)
* 2 types of hot reloading, one for the state, and one for the code

## How to Run

1. **First terminal**: Start the TypeScript compiler in watch mode for `index.ts` and `watch.ts` and output to the `public` folder:
   ```sh
   vite
   ```


# TODOs:
   * change the type of 
   * support standalone symbols as valid grammer
   * add error handling to parse
   * append to the parser incrementally
   * create listeners for changes in the UI represented through state, and applying the state on the DOM. / come up with an architecture to handle elements in javascript
   * connect basic new parser (parser combinator) to UI - DONE
   
   * remove all TODOs
   * better logging of the parser in action
   * refactoring code to be more functional







