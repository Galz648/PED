"use client"
import { FC } from 'react';
import { useObservable } from '../hooks/useObservable';
import { counterState } from '../services/CounterState';

interface CounterProps {
    name: string;
}

export const Counter: FC<CounterProps> = ({ name }) => {
    const count: number = useObservable(counterState.counter$, 0);

    const handleIncrement = (): void => {
        counterState.increment();
    };

    return (
        <div className="p-4 border rounded shadow-sm">
            <h3>{name}</h3>
            <p>Count: {count}</p>
            <button 
                onClick={handleIncrement}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Increment
            </button>
        </div>
    );
}; 
