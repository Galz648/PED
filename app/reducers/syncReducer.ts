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
            return updateBlock(state, action);
        default:
            return state;
    }
}; 

// TODO: the name of the function doesn't reflect the functionality of the function
export const updateBlock = (state: State, action: RenderViewContentUpdateAction): State => {
    const { newContent, oldContent } = action.payload;
    const editorContent = state.editorContent;
    const updatedContent = editorContent.replace(oldContent, newContent);
    return {
        ...state,
        editorContent: updatedContent
    };
}
