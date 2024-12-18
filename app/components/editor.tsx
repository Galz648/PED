import React, { useEffect } from 'react';
import { editorState } from '../services/EditorState.ts';
import { marked } from 'marked';
// import { MathField } from 'mathlive';

export const BlockView: React.FC<{ content: string; type: 'markdown' | 'latex' }> = ({ content, type }) => (
    <div className={`block ${type}-block`}>
        {type === 'latex' ? (
            // <MathField>{content}</MathField>
            <div>{content}</div>
        ) : (
            <div dangerouslySetInnerHTML={{ __html: marked.parse(content) }} />
        )}
    </div>
);

export const PreviewPane: React.FC = () => {
    // const [blocks, setBlocks] = React.useState(editorState.blocks$.getValue());

    // useEffect(() => {
    //     const sub = editorState.blocks$.subscribe(setBlocks);
    //     return () => sub.unsubscribe();
    // }, []);

    // return (
    //     <div className="preview-pane">
    //         {blocks.map((block, i) => (
    //             <BlockView key={i} {...block} />
    //         ))}
    //     </div>
    // );

    return <div>PreviewPane</div>;
};


