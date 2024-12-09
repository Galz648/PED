import { BehaviorSubject, Observable } from 'rxjs';

class CounterState {
    private counterSubject: BehaviorSubject<number>;
    public counter$: Observable<number>;

    constructor() {
        this.counterSubject = new BehaviorSubject<number>(0);
        this.counter$ = this.counterSubject.asObservable();
    }

    increment(): void {
        this.counterSubject.next(this.counterSubject.value + 1);
    }

    reset(): void {
        this.counterSubject.next(0);
    }
}

export const counterState = new CounterState(); 
