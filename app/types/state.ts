import { Block } from "../lib/blocks/types.ts";

type State = {
    editorContent: string;
    blocks: Block[];
}

export type { State };
