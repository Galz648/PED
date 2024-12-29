import React, { ReactElement } from "react";
import { InlineLatexBlock, MarkdownBlock } from "../../lib/blocks/types.ts";
import { Visitor } from "./types.ts";

export class RenderVisitor implements Visitor {
    visitLatexBlock(block: InlineLatexBlock): ReactElement {
        return <div>Latex Block: {block.content}</div>;
    }

    visitMarkdownBlock(block: MarkdownBlock): ReactElement {
        // visit the children of the block
        const renderedChildren: any[] = [];
        if (block.children) {
            for (const child of block.children) {
                renderedChildren.push(child.accept(this));
            }
        }
        return <div>Markdown Block
            children: {renderedChildren}
        </div>;

    }
} 
