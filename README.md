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
   ```console
   vite
   ```


# TODOs:
   * support standalone symbols as valid grammer
   * add error handling to parse - DONE
   * append to the parser incrementally - IN PROGRESS
   * create integration level tests for the parser combinators
   * create listeners for changes in the UI represented through state, and applying the state on the DOM. / come up with an architecture to handle elements in javascript - IN PROGRESS
   * connect basic new parser (parser combinator) to UI - DONE
   * append to the parser incrementally
   * remove all TODconsole
   
   * refactoring code to be more functional
   * could be cool to have an abillity to turn off some of the features, have this be a modular equation editor






