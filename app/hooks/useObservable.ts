"use client"
import { Observable } from 'rxjs';
import { useState, useEffect } from 'react';

export function useObservable<T>(observable: Observable<T>, initialValue: T): T {
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        const subscription = observable.subscribe(setValue);
        return () => subscription.unsubscribe();
    }, [observable]);

    return value;
} 
