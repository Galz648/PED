import { State } from "../types/state.ts";
import { Block } from "../lib/blocks/types.ts";
import { parseEditor } from "../lib/editorParser.ts";

export enum ActionType {
    UPDATE_EDITOR_CONTENT = "UPDATE_EDITOR_CONTENT",
    UPDATE_BLOCK = "UPDATE_BLOCK"
}

export interface Action {
    type: ActionType;
    payload: any;
}

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.UPDATE_EDITOR_CONTENT:
            const newContent = action.payload.newContent;
            const blocks = parseEditor(newContent);
            return {
                ...state,
                editorContent: newContent,
                blocks: blocks
            };
        case ActionType.UPDATE_BLOCK:
            console.log("update block - not implemented")
            // const { id, newContent: blockContent } = action.payload;
            // const updatedBlocks = state.blocks.map((block: Block) =>
            //     block.id === id ? { ...block, content: blockContent } : block
            // );
            // return {
            //     ...state,
            //     blocks: updatedBlocks
            // };
        default:
            return state;
    }
}; 
