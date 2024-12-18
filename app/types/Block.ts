type BlockType = 'markdown' | 'latex';

interface Block {
    id: string;
    type: BlockType;
    content: string;
}

export type { Block, BlockType };
