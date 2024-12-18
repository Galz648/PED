
type BlockType = 'markdown' | 'latex';

interface Block {
    type: BlockType;
    content: string;
}

export type { Block, BlockType };
