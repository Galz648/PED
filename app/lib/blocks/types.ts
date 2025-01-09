import { Visitor } from "../../lib/visitors/types.ts";
import { ReactNode } from "react";


export type BlockType = 'latex' | 'markdown';


export interface Block {
    id: string;
    type: BlockType;
    content: string;

}

export interface InlineLatexBlock extends Block {
    type: 'latex';
}

export interface MarkdownBlock extends Block {
    type: 'markdown';
} 
