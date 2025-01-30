import { describe, it, expect } from 'vitest';
// TODO: change relative paths to absolute paths
import { reducer, ActionType, EditorContentUpdateAction, RenderViewContentUpdateAction, Action } from './syncReducer';
import { State } from "../types/state"

describe('syncReducer', () => {
    it('should update editor content', () => {
        const initialState: State = { editorContent: 'Initial content' };
        const action: EditorContentUpdateAction = {
            type: ActionType.UPDATE_EDITOR_CONTENT,
            payload: {
                newContent: 'Updated content'
            }
        };
        const newState = reducer(initialState, action);
        expect(newState.editorContent).toBe('Updated content');
    });

    it('should replace block content', () => {
        const initialState: State = { editorContent: 'Initial content with old content' };
        const action: RenderViewContentUpdateAction = {
            type: ActionType.UPDATE_BLOCK_CONTENT,
            payload: {
                newContent: 'new content',
                oldContent: 'old content'
            }
        };
        const newState = reducer(initialState, action);
        expect(newState.editorContent).toBe('Initial content with new content');
    });

    it('should return the same state for unknown action type', () => {
        const initialState: State = { editorContent: 'Initial content' };
        const action = { type: 'UNKNOWN_ACTION' } as unknown as Action;
        const newState = reducer(initialState, action);
        expect(newState).toBe(initialState);
    });
});
