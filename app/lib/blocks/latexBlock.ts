import { ReactNode } from "react";
import { InlineLatexBlock } from "./types.ts";
import { Visitor } from "../visitors/types.ts";

export class InlineLatexBlockImpl implements InlineLatexBlock {
    id: number;
    content: string;
    
    constructor(id: number, content: string) {
        this.id = id;
        this.content = content;
    }
    type: "latex";
    accept(visitor: Visitor): ReactNode {
        return visitor.visitLatexBlock(this);
    }
}
