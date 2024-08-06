import { ParseError } from "./types"

export type Ok<T> = { ok: true, value: T }
export type Err<E> = { ok: false, value: E }
export type Result<T, E> = Ok<T> | Err<E>

export function ok<T>(value: T): Ok<T> {
    return { ok: true, value }
}

export function error<E extends ParseError>(value: E): Err<E> {
    return { ok: false, value }
}

// // TODO: determine the function signatures of the onOk and onError functions
// Kepping this for possible future use
// export function match<T, E>(result: Result<T, E>, onOk: (result: Ok<T>) => T, onError: (err: Err<E>) => any): T | E { 
//     if (result.ok) {
//         return onOk(result)
//     } else {
//         return onError(result)
//     }
// }
