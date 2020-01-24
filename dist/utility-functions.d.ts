/**
 * Removes the first element of an array.
 * @param xs - an array
 * @returns A copy of the `xs` array with the first element removed
 */
export declare function dropFirst<T>(xs: T[]): T[];
/**
 * Removes the last element of an array.
 * @param xs - an array
 * @returns A copy of the `xs` array with the last element removed
 */
export declare function dropLast<T>(xs: T[]): T[];
/**
 * An identity function.
 * @param x - an object
 * @returns `x`
 */
export declare function id<T>(x: T): T;
/**
 * Returns a function that returns the original function argument.
 * @param x - an object
 * @returns (_) => `x`
 */
export declare function keep<T>(x: T): (_: any) => T;
/**
 * Apply a function to each element of an array.
 * @param f - a function that takes a value
 * @returns A function that will call `f` on each element of an array
 */
export declare function map<S, T>(f: (x: S) => T): (xs: S[]) => T[];
/**
 * Apply a function to each element of an array with an index.
 * @param f - a function that takes a value and returns function on an index
 * @returns A function that will call `f` on each element of an array
 */
export declare function mapi<S, T>(f: (x: S) => (i: number) => T): (xs: S[]) => T[];
/**
 * Apply a function to the nth element of an array.
 * @param n - the element to apply the function to
 * @returns A mapping function that will apply a function to the `n` element of an array
 */
export declare function adjust<S, T>(n: number): (f: (x: S) => T) => (xs: S[]) => Array<S | T>;
/**
 * Creates a new object with the properties of one object merged into another.
 * @param base - the base object that provides default values
 * @returns A function that receives another object, `other`, for the property merge.
 * The properties of `other` will overwrite the properties of `obj` in the new object.
 */
export declare function merge(base: any): (other: any) => any;
export declare function merge(base: any[]): (other: any[]) => any[];
/**
 * A modulus function that handles negative values, e.g. mod(2)(1) === 1 && mod(2)(-1) === 1.
 * @param n - the divsor, e.g. mod(n)(x) === x mod n
 * @returns A function that receives the dividend for the modulus calcution
 */
export declare function mod(n: number): (x: number) => number;
/**
 * Create an object with the specified key.
 * @param key - the value for the object key
 * @returns A function that recieves a `value` and returns an object of { `key`: `value` }
 */
export declare function objOf<V>(key: string): (v: V) => {
    [x: string]: V;
};
/**
 * Applies a set of functions to an argument.
 * @param fns - multiple function arguments
 * @returns A function that will apply `fns` to an argument
 */
export declare function pipe<V>(...fns: Array<(x: V) => V>): (x: V) => V;
/**
 * Creates a function to return an object's property value
 * @param key - the key of the property to return
 * @returns A function that will return the property's value for a received object
 */
export declare function prop<T>(key: string | number): (o: {
    [x: string]: T;
}) => T;
/**
 * Creates an array of integers from `n` to `m`.
 * Ex: range(0)(2) === [0, 1]
 * @param n - the lower bound for the range
 * @returns A function that receives the upper bound (exclusive) for the range
 */
export declare function range(n: number): (m: number) => number[];
/**
 * Creates an array with a value `c` repeated `n` times.
 * @param c - the value to repeat
 * @returns A function that receives `n` to repeat value `c`
 */
export declare function repeat<T>(c: T): (n: number) => T[];
/**
 * Returns a random integer from `min` to `max` (exclusive)
 * @param min - the minimum value
 * @returns A function that receives `max`
 */
export declare function randomInt(min: number): (max: number) => number;
/**
 * Returns a random number from `min` to `max` (exclusive)
 * @param min - the minimum value
 * @returns A function that receives `max`
 */
export declare function random(min: number): (max: number) => number;
/**
 * Returns a random element from an array
 * @param array - the array value
 * @returns A random element from `array`
 */
export declare function random<T>(array: T[]): T;
/**
 * Create an object from a mapping of functions
 *
 * Ex:
 *
 * const fnObj = {
 *    addOne: (x) => x + 1,
 *    minusOne: (x) => x - 1
 * };
 *
 * const x = 1;
 *
 * spec(fObj)(x) === { addOne: 2, minusOne: 0 }
 *
 * @param fnObj - a mapping of functions
 * @returns A function that receives an object to which the functions are applied
 */
export declare function spec<F extends (v: any) => any>(fnObj: {
    [p: string]: F;
}): (x: any) => {
    [x: string]: any;
};
/**
 * Maps a value `x` from an input range to an output range
 * @param x - the value to map
 * @returns A function that receives an input range and then an output range
 */
export declare const mapRange: (x: number) => (i_start: number, i_end: number) => (o_start: number, o_end: number) => number;
//# sourceMappingURL=utility-functions.d.ts.map