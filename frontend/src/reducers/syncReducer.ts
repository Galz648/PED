import { State } from "../types/state.ts";

export enum ActionType {
    UPDATE_EDITOR_CONTENT = "UPDATE_EDITOR_CONTENT",
    UPDATE_BLOCK_CONTENT = "UPDATE_BLOCK_CONTENT"
}

export interface EditorContentUpdateAction {
    type: ActionType.UPDATE_EDITOR_CONTENT;
    payload: {
        newContent: string;
    };
}

export interface RenderViewContentUpdateAction {
    type: ActionType.UPDATE_BLOCK_CONTENT;
    payload: {
        newContent: string;
        oldContent: string;
    };
}

export type Action = EditorContentUpdateAction | RenderViewContentUpdateAction;

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.UPDATE_EDITOR_CONTENT:
            console.log("update editor content");
            return {
                ...state,
                editorContent: action.payload.newContent
            };
        case ActionType.UPDATE_BLOCK_CONTENT:
            // TODO: change implementation to an immutable update
            return replaceEditorContent(state, action);
        default:
            return state;
    }
};

export const replaceEditorContent = (state: State, action: RenderViewContentUpdateAction): State => {
    const { newContent, oldContent } = action.payload;
    const editorContent = state.editorContent;
    const updatedContent = editorContent.replace(oldContent, newContent);
    return {
        ...state,
        editorContent: updatedContent
    };
}
