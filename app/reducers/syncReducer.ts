import { State } from "../types/state.ts";
import { Block } from "../lib/blocks/types.ts";
import { createMarkdownBlock, parse } from "../lib/parser/textEditorParser.ts";

export enum ActionType {
    UPDATE_EDITOR_CONTENT = "UPDATE_EDITOR_CONTENT",
    UPDATE_BLOCK = "UPDATE_BLOCK"
}

export interface EditorContentUpdateAction {
    type: ActionType.UPDATE_EDITOR_CONTENT;
    payload: {
        newContent: string;
    };
}

export interface RenderViewContentUpdateAction {
    type: ActionType.UPDATE_BLOCK;
    payload: {
        id: string;
        newContent: string;
        oldContent: string;
    };
}

export type Action = EditorContentUpdateAction | RenderViewContentUpdateAction;

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.UPDATE_EDITOR_CONTENT:
            console.log("update editor content")
            const { newContent: editorNewContent } = action.payload;
            // const blocks = parse(editorNewContent);
            // console.log("blocks", blocks)
            return {
                ...state,
                editorContent: editorNewContent,
                // blocks: blocks.map(block => createMarkdownBlock(block))
            };
        case ActionType.UPDATE_BLOCK:
            console.log("update block")
            // this consolidates the change made in the mathlive component with the state
            const { id, newContent: blockNewContent, oldContent } = action.payload;
            // a naive editing apporach: look for the exact string in the editorContent and replace it
            const editorContent = state.editorContent;
            const updatedContent = editorContent.replace(oldContent, blockNewContent);

            return {
                ...state,
                editorContent: updatedContent
            };
        default:
            return state;
    }
}; 
