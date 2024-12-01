let blockElementMap: Map<number, HTMLElement> = new Map();

interface Block {
    type: 'markdown' | 'latex';
    content: string;
}

/**
 * Creates a markdown block from the given content
 */
function createMarkdownBlock(content: string): Block {
    return {
        type: 'markdown',
        content: content.trim()
    };
}

/**
 * Creates a latex block from the given content
 */
function createLatexBlock(content: string): Block {
    return {
        type: 'latex',
        content: content.trim()
    };
}

interface BlockIndices {
    start: number;
    end: number;
    type: 'markdown' | 'latex';
}

/**
 * Finds all latex block indices in the text
 */
function findLatexBlockIndices(text: string): BlockIndices[] {
    const indices: BlockIndices[] = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
        const latexStart = text.indexOf('$$', currentIndex);
        if (latexStart === -1) break;

        const latexEnd = text.indexOf('$$', latexStart + 2);
        if (latexEnd === -1) break;

        indices.push({
            start: latexStart + 2, // Skip the opening $$
            end: latexEnd,
            type: 'latex'
        });

        currentIndex = latexEnd + 2;
    }

    return indices;
}

/**
 * Creates markdown block indices for the spaces between latex blocks
 */
function createAllBlockIndices(text: string, latexIndices: BlockIndices[]): BlockIndices[] {
    const allIndices: BlockIndices[] = [];
    let currentIndex = 0;

    for (const latex of latexIndices) {
        // Add markdown block before latex if exists
        if (currentIndex < latex.start - 2) {
            allIndices.push({
                start: currentIndex,
                end: latex.start - 2,
                type: 'markdown'
            });
        }

        allIndices.push(latex);
        currentIndex = latex.end + 2;
    }

    // Add final markdown block if exists
    if (currentIndex < text.length) {
        allIndices.push({
            start: currentIndex,
            end: text.length,
            type: 'markdown'
        });
    }

    return allIndices;
}

/**
 * Creates blocks from the block indices
 */
function createBlocksFromIndices(text: string, indices: BlockIndices[]): Block[] {
    return indices.map(index => {
        const content = text.slice(index.start, index.end);
        return index.type === 'latex'
            ? createLatexBlock(content)
            : createMarkdownBlock(content);
    });
}

/**
 * Parses content into alternating blocks of markdown and latex
 */
function parseContent(rawText: string): Block[] {
    const latexIndices = findLatexBlockIndices(rawText);
    const allBlockIndices = createAllBlockIndices(rawText, latexIndices);
    return createBlocksFromIndices(rawText, allBlockIndices);
}
/**
 * Example usage:
 * 
 * const text = "Here is some markdown text with a latex equation: $\\frac{1}{2}$ and more text";
 * const blocks = parseContent(text);
 * 
 * // blocks will be an array of Block objects:
 * // [
 * //   { type: "markdown", content: "Here is some markdown text with a latex equation: " },
 * //   { type: "latex", content: "\\frac{1}{2}" },
 * //   { type: "markdown", content: " and more text" }
 * // ]
 * 
 * // Each block represents either markdown or latex content, making it easy to
 * // process and render different content types appropriately
 */

/**
 * Creates HTML element configurations from blocks, preserving the original order
 * @param blocks Array of Block objects containing markdown and latex content
 * @returns Array of element configurations ready to be rendered
 */
interface ElementConfig {
    type: 'div' | 'math-field';
    className: string;
    content: string;
    index: number; // Track original position
}

function createElementConfigs(blocks: Block[]): ElementConfig[] {
    return blocks.map((block, index) => {
        if (block.type === 'markdown') {
            return {
                type: 'div',
                className: 'markdown-block',
                content: block.content,
                index
            };
        } else {
            return {
                type: 'math-field',
                className: 'latex-block',
                content: block.content,
                index
            };
        }
    });
}

/**
 * Renders element configurations to actual DOM elements in the original order
 * @param configs Array of element configurations
 * @returns DocumentFragment containing the rendered HTML elements
 */
function renderElements(configs: ElementConfig[]): DocumentFragment {
    const fragment = document.createDocumentFragment();

    // Sort configs by original index before rendering
    const orderedConfigs = [...configs].sort((a, b) => a.index - b.index);

    orderedConfigs.forEach(config => {
        const element = document.createElement(config.type);
        element.className = config.className;
        element.textContent = config.content;
        fragment.appendChild(element);
    });

    return fragment;
}


function createBlockIndexElementMap(configs: ElementConfig[]): Map<number, HTMLElement> {
    const map = new Map<number, HTMLElement>();

    configs.forEach(config => {
        const element = document.createElement(config.type);
        element.className = config.className;
        element.textContent = config.content;
        map.set(config.index, element);
    });

    return map;
}
export function textToHtmlFragment(text: string): DocumentFragment {

    const blocks = parseContent(text);
    const configs = createElementConfigs(blocks);
    blockElementMap = createBlockIndexElementMap(configs);
    const fragment = renderElements(configs);
    return fragment;
}
