import { ReactNode } from "react";
import { Visitor } from "../visitors/types.ts";
import { InlineLatexBlock, MarkdownBlock } from "./types.ts";

export class MarkdownBlockImpl implements MarkdownBlock {
    id: number | string;
    content: string;
    children: InlineLatexBlock[];
    type: "markdown";

    constructor(id: number | string, content: string, children: InlineLatexBlock[]) {
        this.id = id;
        this.content = content;
        this.children = children;
    }
    accept(visitor: Visitor): ReactNode {
        return visitor.visitMarkdownBlock(this);
    }
}   
