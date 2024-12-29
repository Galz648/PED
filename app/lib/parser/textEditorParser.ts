import { InlineLatexBlockImpl } from "../blocks/latexBlock.ts";
import { InlineLatexBlock, MarkdownBlock } from "../blocks/types.ts";
import { MarkdownBlockImpl } from "../blocks/MdBlock.ts";
import { v4 as uuidv4 } from 'uuid';

let currentId = 0;

function generateId(): number {
    return currentId++;
}

function extractLatexBlocks(text: string): { [key: number]: InlineLatexBlock } {
    const children: { [key: number]: InlineLatexBlock } = {};
    const latexRegex = /(\$.*?\$|\\\(.*?\\\)|\\\[.*?\\\])/g;
    let match;

    while ((match = latexRegex.exec(text)) !== null) {
        const latexContent = match[0];
        if (latexContent.trim() !== '') {
            const id = generateId();
            children[id] = new InlineLatexBlockImpl(id, latexContent);
        }
    }

    return children;
}

function createMarkdownBlock(content: string, latexBlocks: { [key: number]: InlineLatexBlock }): MarkdownBlock {
    const updatedContent = content.replace(/(\$.*?\$|\\\(.*?\\\)|\\\[.*?\\\])/g, (match) => {
        const block = Object.values(latexBlocks).find(block => block.content === match.trim());
        return block ? `{${block.id}}` : match;
    });

    // Assign a unique UUID to the MarkdownBlock
    return new MarkdownBlockImpl(uuidv4(), updatedContent, Object.values(latexBlocks));
}

function splitIntoParagraphs(text: string): string[] {
    return text.split('\n\n').filter(paragraph => paragraph.trim() !== '');
}

export function parse(input: string): MarkdownBlock[] {
    currentId = 0; // Reset ID counter
    const paragraphs = splitIntoParagraphs(input);

    return paragraphs.map(paragraph => {
        const latexBlocks = extractLatexBlocks(paragraph);
        return createMarkdownBlock(paragraph, latexBlocks);
    });
}

// Example usage when running the file directly
if (require.main === module) {
    const example = `Here is a paragraph with some inline math $x^2 + y^2 = r^2$ and another formula \\(E = mc^2\\).

This is another paragraph that contains a complex formula \\[\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}\\].`;

    const result = parse(example);
    console.log('Input:');
    console.log(example);
    console.log('\nParsed Result:');
    console.log(JSON.stringify(result, null, 2));
} 
