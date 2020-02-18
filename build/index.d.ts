export declare function incr(a: number): number;
export declare function eachWithObject<T, U>(e: Enumerable<T>, obj: U, fn: (obj: U, member: T) => U): U;
export declare function map<T, U>(e: Enumerable<T>, fn: (member: T) => U): U[];
export declare function select<T>(e: Enumerable<T>, fn: (member: T) => boolean): Enumerable<T>;
export declare function reject<T>(e: Enumerable<T>, fn: (member: T) => boolean): T[];
interface Enumerable<T> extends Array<T> {
    each: (member: T) => any;
}
export {};
