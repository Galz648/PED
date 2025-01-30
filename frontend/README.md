# Mathlive Editor
The Mathlive Editor is a web-based tool for editing LaTeX content. It combines the Monaco Editor for text editing and Mathlive for rendering LaTeX math. Key features include syntax highlighting, LaTeX language support, snippet management, and real-time content updates. Users can directly edit math equations using Mathlive, allowing for intuitive and interactive manipulation of mathematical expressions.

## How to Run

To start the development server, use the following command:

```
npm run dev
```

## Eslint

To run eslint, use the following command:
```
npm run lint
```

## Known Bugs:
### Markdown-React Render Issue

* Using `$$$$` for LaTeX causes the next line to move into the mathlive element when the entire content is deleted from the mathlive element or when the entire text is deleted from the mathlive block.

### Monaco Editor issue
* frac shortcut doesn't work properly


## Possible Errors
### remark-math

```
export type ToOptions = {
    /**
     * Whether to support math (text) with a single dollar (default: `true`).
     *
     * Single dollars work in Pandoc and many other places, but often interfere
     * with “normal” dollars in text.
     * If you turn this off, you can still use two or more dollars for text math.
     */
    singleDollarTextMath?: boolean | null | undefined;
};
```
