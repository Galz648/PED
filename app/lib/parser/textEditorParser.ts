import { MarkdownBlock } from "../blocks/types.ts";
import { v4 as uuidv4 } from 'uuid';

let currentId = 0;

function generateId(): number {
    return currentId++;
}

class MarkdownBlockImpl implements MarkdownBlock {
    id: string;
    type: 'markdown';
    content: string;

    constructor(content: string) {
        this.id = uuidv4();
        this.type = 'markdown';
        this.content = content;
    }
}

export function createMarkdownBlock(content: string): MarkdownBlock {
    // Assign a unique UUID to the MarkdownBlock
    return {
        id: uuidv4(),
        type: 'markdown',
        content: content,
    };
}

function splitIntoParagraphs(text: string): string[] {
    return text.split('\n\n').filter(paragraph => paragraph.trim() !== '');
}

export function parse(input: string): string[] {
    // TODO: consider removing - not used atm
    currentId = 0; // Reset ID counter
    const paragraphs = splitIntoParagraphs(input);

    return paragraphs
}

