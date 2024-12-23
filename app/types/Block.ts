type BlockType = 'markdown' | 'latex';

interface Block {
    id: number;
    type: BlockType;
    content: string;
}

export type { Block, BlockType };
