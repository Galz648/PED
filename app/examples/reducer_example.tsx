"use client"
import React, { useReducer, useEffect } from 'react';
import type { Block } from "../types/block"
interface State {
    editorContent: string,
    blocks: Block[]
}

const initialState: State = {
    editorContent: "markdown $$ foo bar $$ some more markdown $$ foo bar $$",
    blocks: [
    ]
};

interface Action {
    type: ActionType;
    payload: any;
}

type ActionType = "UPDATE_BLOCK" | "UPDATE_EDITOR_CONTENT";
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

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);


    // create the blocks on editor load
    useEffect(() => {
        dispatch({ type: "UPDATE_EDITOR_CONTENT", payload: { newContent: state.editorContent } });
    }, []);

    const handleBlockChange = (id, newContent) => {
        dispatch({ type: "UPDATE_BLOCK", payload: { id, newContent } });
    };

    const handleContentChange = (newContent: string) => {
        dispatch({ type: "UPDATE_EDITOR_CONTENT", payload: { newContent } });
    };

    return (
        <div style={{ display: "flex" }}>
            {/* Editor Side */}
            <textarea onChange={(e) => handleContentChange(e.target.value)}
                value={state.editorContent}
                readOnly
                style={{ flex: 1, height: "200px", marginRight: "10px" }}
            />

            {/* Rendered Blocks */}
            <div style={{ flex: 1 }}>
                {state.blocks.map(block => (
                    <div key={block.id} style={{ marginBottom: "10px" }}>
                        <input
                            value={block.content}
                            onChange={e => handleBlockChange(block.id, e.target.value)}
                            style={{ width: "100%" }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
type BlockType = 'latex' | 'markdown';
function contentToBlocks(newContent: any) {
    return newContent.split(/(\$\$.*?\$\$)/s).map((part, index) => {
        const type: BlockType = part.startsWith('$$') && part.endsWith('$$') ? 'latex' : 'markdown';
        const content = part.replace(/^\$\$|\$\$$/g, '');
        return { id: index.toString(), type, content };
    }).filter(block => block.content.trim());
}

