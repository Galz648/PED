import { BehaviorSubject, Observable } from 'rxjs';
import { Block, BlockType } from '../types/Block.js';

class EditorState {
    private contentSubject = new BehaviorSubject<string>('');
    private blocksSubject = new BehaviorSubject<Block[]>([]);

    public content$ = this.contentSubject.asObservable();
    public blocks$ = this.blocksSubject.asObservable();

    public updateContent(content: string): void {
        this.contentSubject.next(content);
        this.blocksSubject.next(this.parseContent(content));
    }
    private parseContent(text: string): Block[] {
        return text.split(/(\$\$.*?\$\$)/s).map(part => {
            const type: BlockType = part.startsWith('$$') && part.endsWith('$$') ? 'latex' : 'markdown';
            const content = part.replace(/^\$\$|\$\$$/g, '');
            return { type, content };
        }).filter(block => block.content.trim());
    }
}

export const editorState = new EditorState(); 
