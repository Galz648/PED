import type { State } from "../types/state.ts"
import type { Block, BlockType } from "../types/block.ts"

export enum ActionType {
    UPDATE_BLOCK = "UPDATE_BLOCK",
    UPDATE_EDITOR_CONTENT = "UPDATE_EDITOR_CONTENT",
}
interface Action {
    type: ActionType
    payload: any;
}

function contentToBlocks(text: string): Block[] {
    return text.split(/(\$\$.*?\$\$)/s).map((part, index) => {
        const type: BlockType = part.startsWith('$$') && part.endsWith('$$') ? 'latex' : 'markdown';
        const content = part.replace(/^\$\$|\$\$$/g, '');
        return { id: index, type, content };
    }).filter(block => block.content.trim());
}

function reducer(state: State, action: Action) {

    switch (action.type) {
        case "UPDATE_BLOCK": {
            const { id, newContent } = action.payload;

            const updatedBlocks = state.blocks.map(block =>
                block.id === id ? { ...block, content: newContent } : block
            );

            const updatedEditorContent = updatedBlocks.map(block => block.content).join("\n");

            return {
                ...state,
                blocks: updatedBlocks,
                editorContent: updatedEditorContent
            };
        }
        case "UPDATE_EDITOR_CONTENT": {
            const { newContent } = action.payload;
            return {
                ...state,
                blocks: contentToBlocks(newContent),
                editorContent: newContent
            };
        }
        default:
            return state;
    }
}

export { reducer, type Action };
