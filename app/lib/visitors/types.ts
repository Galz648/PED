import { ReactElement } from "react";
import { InlineLatexBlock, MarkdownBlock } from "../../lib/blocks/types.ts";

interface Visitor {
    visitLatexBlock(block: InlineLatexBlock): ReactElement;
    visitMarkdownBlock(block: MarkdownBlock): ReactElement;
}

export type { Visitor }; 
