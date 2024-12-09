"use client"
import { FC } from 'react';
import { Counter } from './Counter';
import { counterState } from '../services/CounterState';

export const CounterContainer: FC = () => {
    const handleReset = (): void => {
        counterState.reset();
    };

    return (
        <div className="p-6">
            <div className="space-y-4">
                <Counter name="Counter 1" />
                <Counter name="Counter 2" />
                <button 
                    onClick={handleReset}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                >
                    Reset All
                </button>
            </div>
        </div>
    );
}; 
