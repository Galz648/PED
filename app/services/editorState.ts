import { BehaviorSubject } from "rxjs";
import { Block, BlockType } from "../types/Block.ts";
import { marked } from "marked";

class EditorState {
    private contentSubject = new BehaviorSubject<string>('');
    private blocksSubject = new BehaviorSubject<Block[]>([]);

    public content$ = this.contentSubject.asObservable();
    public blocks$ = this.blocksSubject.asObservable();
    // TODO: make function private, use the updateContent function to update the content and blocks subjects
    // TODO: should probably be static
    public blocksToHtml(blocks: Block[]): HTMLElement[] {
        return blocks.map((block) => {
            const htmlBlock = document.createElement('div');
            if (block.type === 'markdown') {
                htmlBlock.innerHTML = marked(block.content).toString();
            } else if (block.type === 'latex') {
                htmlBlock.innerHTML = block.content;
            }
            return htmlBlock;
        });
    }
    
    public updateContent(content: string): void {
        /* 
            Update the content and blocks subjects.
            The content subject is updated with the new content.
            The blocks subject is updated with the parsed content.
        */
        // this.contentSubject.next(content);
        // this.blocksSubject.next(this.parseContent(content));
    }
// TODO: make function private, use the updateContent function to update the content and blocks subjects
    public parseContent(text: string): Block[] {
        return text.split(/(\$\$.*?\$\$)/s).map((part, index) => {
            const type: BlockType = part.startsWith('$$') && part.endsWith('$$') ? 'latex' : 'markdown';
            const content = part.replace(/^\$\$|\$\$$/g, '');
            return { id: index.toString(), type, content };
        }).filter(block => block.content.trim());
    }
}

export const editorState = new EditorState();
