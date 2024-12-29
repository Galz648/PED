import { Visitor } from "../../lib/visitors/types.ts";
import { ReactNode } from "react";


export type BlockType = 'latex' | 'markdown';


export interface Block {
    // TODO: consider keeping this as a single type
    id: number | string;
    type: BlockType;
    content: string;
    children?: Block[];
    accept(visitor: Visitor): ReactNode;
}

export interface InlineLatexBlock extends Block {
    type: 'latex';
}

export interface MarkdownBlock extends Block {
    type: 'markdown';
    children: InlineLatexBlock[];
} 
