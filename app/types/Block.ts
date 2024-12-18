type BlockType = 'markdown' | 'latex';

interface Block {
    id: string;
    type: BlockType;
    content: string;
    html: HTMLElement;
}

export type { Block, BlockType };
