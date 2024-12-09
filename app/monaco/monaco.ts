import * as monaco from 'monaco-editor';
import { registerLatexLanguage} from './LaTeX/syntax_highlight.ts'; 
import { registerLatexSnippets } from './LaTeX/snippets.ts'; 

const containerElement = document.getElementById('container') as HTMLElement

// Register the LaTeX language with Monaco
(function setup() {
  registerLatexLanguage();
  // registerLatexSnippets();
})();

// Initialize the Monaco Editor with LaTeX support
const editor = monaco.editor.create(containerElement, {
  fontSize: 25,
  value: `Here is markdown $$\\frac{1}{2}$$ and more text`,
  language: 'latex',
  theme: 'vs-dark'
});
