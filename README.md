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
   tsc -w index.ts watch.ts --outDir ./public/
   ```
2. Run the `http-server` to serve the up to date code from the public folder:
   ```sh
   node ./public/watch.js
   ```


# TODOs:
* create a clean setup of the repo, to create examples in different branches - low priority
* split the index script into a watch-client file that handle the communication with the wss (websocket server)
* put all javascript compiled files in the dist folder.
* add live reloading (cold reload) (file change) (tsc reloads the files) --> ws message --> document reload
* add hot reloading (learn about the cache and implment it) (file change) --> ws message --> 
* 






