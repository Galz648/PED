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
        // remove the surrounding latex tags ($$ $$)
        const content = part.replace(/^\$\$|\$\$$/g, '');
        return { id: index, type, content };
    })
    .filter(block => block.content.trim());
}

function blocksToContent(blocks: Block[]): string {

    // return blocks.map(block => block.content).join("\n");
    // add the surrounding latex tags ($$ $$) to latex blocks
    return blocks.map(block =>
        block.type === 'latex' ? `$$ ${block.content} $$` : block.content
    ).join("\n");
}

function updateBlock(state: State, id: number, newContent: string): State {
    const updatedBlocks = state.blocks.map(block =>
        block.id === id ? { ...block, content: newContent } : block
    );
    const updatedEditorContent = blocksToContent(updatedBlocks);
    return { ...state, blocks: updatedBlocks, editorContent: updatedEditorContent };
}

function reducer(state: State, action: Action) {
    console.log(action)
    switch (action.type) {
        case ActionType.UPDATE_BLOCK: {
            // id and new content inside the block
            const { id, newContent } = action.payload;
            return updateBlock(state, id, newContent);
        }
        case ActionType.UPDATE_EDITOR_CONTENT: {
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
