import { unified, type Plugin } from 'unified';
import remarkParse from 'remark-parse';
import rehypeReact from 'rehype-react';
import * as prod from 'react/jsx-runtime';
import rehypeParse from 'rehype-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { Compatible } from 'vfile';
// import { visit } from 'unist-util-visit';

export function replaceInlineMathWithMathLive(): Plugin {
  console.log("replaceInlineMathWithMathLive")
  return function attacher() {
    console.log("attacher")
    return (tree) => {
      console.log("tree", tree)
      visit(tree, 'inlineMath', (node) => {
        console.log("node", node)
        // Transform inlineMath nodes to math-live components
        node.type = 'element';
        node.tagName = 'math-field';
        node.children = [
          {
            type: 'text',
            value: node.value,
          },
        ];

        // Remove unnecessary data properties
        delete node.data;
        delete node.value;
      });
    };

    // return (tree) => {
    //   console.log("tree", tree)
    //   visit(tree, 'inlineMath', (node) => {
    //     console.log("node", node)
    //     // Transform inlineMath nodes to math-live components
    //     node.type = 'element';
    //     node.tagName = 'math-field';
    //     node.children = [
    //       {
    //         type: 'text',
    //         value: node.value,
    //       },
    //     ];

    //     // Remove unnecessary data properties
    //     delete node.data;
    //     delete node.value;
    //   });
    // };

  };
}


function visit(node, type, callback) {
  if (node.type === type) {
    callback(node);
  }
  if (node.children) {
    for (const child of node.children) {
      visit(child, type, callback);
    }
  }
}

// Unified pipeline
async function processMarkdown(markdown: Compatible | undefined) {
  const production = {Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs}

  const file = await unified()
    .use(remarkParse) // Parse Markdown
    .use(remarkMath)
    .use(remarkRehype) // Convert Markdown to HTML AST
    // .use(rehypeParse, { fragment: true })
    // .use(rehypeReact, production)
    // .use(rehypeStringify) // Convert HTML AST to string
  .parse(markdown)
    // .process(markdown);
  return file
}

// Example Markdown
const markdown = `This is a paragraph with inline LaTeX: $E = mc^2$. Another inline LaTeX: $a^2 + b^2 = c^2$.`;

processMarkdown(markdown).then((output) => {
  console.log("output", output)
  // pretty print
  // console.log(JSON.stringify(output, null, 2))
  // replace <code ... <code/> tag with math-live
  // const replaced = output.toString().replace(/\\$/g, '<math-field>');
  // replace open code tag with math-live
  const replaced = output.toString().replace(/<code /g, '<math-field ');
  // replace close code tag with math-live
  const replaced2 = replaced.toString().replace(/<\/code>/g, '</math-field>');
  console.log(replaced2)
});
