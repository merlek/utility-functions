/**
 * Removes the first element of an array.
 * @param xs - an array
 * @returns A copy of the `xs` array with the first element removed
 */
export function dropFirst<T>(xs: T[]): T[] {
  return xs.slice(1);
}
/**
 * Removes the last element of an array.
 * @param xs - an array
 * @returns A copy of the `xs` array with the last element removed
 */
export function dropLast<T>(xs: T[]): T[] {
  return xs.slice(0, xs.length - 1);
}
/**
 * An identity function.
 * @param x - an object
 * @returns `x`
 */
export function id<T>(x: T): T {
  return x;
}
/**
 * Returns a function that returns the original function argument.
 * @param x - an object
 * @returns (_) => `x`
 */
export function keep<T>(x: T): (_: any) => T {
  return (_: any) => x;
}
/**
 * Apply a function to each element of an array.
 * @param f - a function that takes a value
 * @returns A function that will call `f` on each element of an array
 */
export function map<S, T>(f: (x: S) => T): (xs: S[]) => T[] {
  return (xs: S[]) => xs.map(f);
}
/**
 * Apply a function to each element of an array with an index.
 * @param f - a function that takes a value and returns function on an index
 * @returns A function that will call `f` on each element of an array
 */
export function mapi<S, T>(f: (x: S) => (i: number) => T): (xs: S[]) => T[] {
  return (xs: S[]) => xs.map((value: S, index: number) => f(value)(index));
}
/**
 * Apply a function to the nth element of an array.
 * @param n - the element to apply the function to
 * @returns A mapping function that will apply a function to the `n` element of an array
 */
export function adjust<S, T>(
  n: number
): (f: (x: S) => T) => (xs: S[]) => Array<S | T> {
  return (f: (x: S) => T) => (xs: S[]) =>
    mapi((x: S) => (i: number) => (i === n ? f(x) : x))(xs);
}
/**
 * Creates a new object with the properties of one object merged into another.
 * @param base - the base object that provides default values
 * @returns A function that receives another object, `other`, for the property merge.
 * The properties of `other` will overwrite the properties of `obj` in the new object.
 */
export function merge(base: any): (other: any) => any;
export function merge(base: any[]): (other: any[]) => any[];
export function merge(base: any): (other: any) => any {
  const root = Array.isArray(base) ? [] : {};
  return (other: any) => Object.assign(root, base, other);
}
/**
 * A modulus function that handles negative values, e.g. mod(2)(1) === 1 && mod(2)(-1) === 1.
 * @param n - the divsor, e.g. mod(n)(x) === x mod n
 * @returns A function that receives the dividend for the modulus calcution
 */
export function mod(n: number): (x: number) => number {
  return (y: number) => ((y % n) + n) % n;
}
/**
 * Create an object with the specified key.
 * @param key - the value for the object key
 * @returns A function that recieves a `value` and returns an object of { `key`: `value` }
 */
export function objOf<V>(
  key: string
): (
  v: V
) => {
  [x: string]: V;
} {
  return (v: V) => ({ [key]: v });
}
/**
 * Applies a set of functions to an argument.
 * @param fns - multiple function arguments
 * @returns A function that will apply `fns` to an argument
 */
export function pipe<V>(...fns: Array<(x: V) => V>): (x: V) => V {
  return (x: V) => [...fns].reduce((acc, f) => f(acc), x);
}
/**
 * Creates a function to return an object's property value
 * @param key - the key of the property to return
 * @returns A function that will return the property's value for a received object
 */
export function prop<T>(key: string | number): (o: { [x: string]: T }) => T {
  return (o: { [x: string]: T }) => o[key];
}
/**
 * Creates an array of integers from `n` to `m`.
 * Ex: range(0)(2) === [0, 1]
 * @param n - the lower bound for the range
 * @returns A function that receives the upper bound (exclusive) for the range
 */
export function range(n: number): (m: number) => number[] {
  return (m: number) =>
    Array.apply(null, Array(m - n)).map((_: any, i: number) => n + i);
}
/**
 * Creates an array with a value `c` repeated `n` times.
 * @param c - the value to repeat
 * @returns A function that receives `n` to repeat value `c`
 */
export function repeat<T>(c: T): (n: number) => T[] {
  return (n: number) => map(keep(c))(range(0)(n));
}
/**
 * Returns a random integer from `min` to `max` (exclusive)
 * @param min - the minimum value
 * @param max - the maxmimum value
 * @returns A random value between `min` and `max`
 */
// tslint:disable-next-line: unified-signatures
export function randomInt(min: number, max: number): number;
/**
 * Returns a random integer from 0 to `max` (exclusive)
 * @param max - the maxmimum value
 * @returns A random value between 0 and `max`
 */
export function randomInt(max: number): number;

export function randomInt(a: number, b?: number): number {
  let max = a;
  let min = 0;
  if (b !== undefined) {
    max = b;
    min = a;
  }
  return Math.floor(Math.random() * max) + min;
}
/**
 * Returns a random number from `min` to `max` (exclusive)
 * @param min - the minimum value
 * @returns A function that receives `max`
 */
export function random(min: number): (max: number) => number;
/**
 * Returns a random element from an array
 * @param array - the array value
 * @returns A random element from `array`
 */
export function random<T>(array: T[]): T;
export function random<T>(param1: T[] | number) {
  if (Array.isArray(param1)) {
    return param1[randomInt(0, param1.length)];
  } else if (typeof param1 === 'number') {
    return (max: number) => Math.random() * max + param1;
  }
  throw Error('Incompatible parameter type: ' + typeof param1);
}
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
export function spec<F extends (v: any) => any>(fnObj: {
  [p: string]: F;
}): (
  x: any
) => {
  [x: string]: any;
} {
  return (x: any) =>
    Object.keys(fnObj)
      .map(key => objOf<F>(key)(fnObj[key](x)))
      .reduce((acc, obj) => Object.assign(acc, obj));
}
/**
 * Maps a value `x` from an input range to an output range
 * @param x - the value to map
 * @returns A function that receives an input range and then an output range
 */
export function mapRange(
  x: number,
  i_start: number,
  i_end: number,
  o_start: number,
  o_end: number
): number {
  return ((x - i_start) * (o_end - o_start)) / (i_end - i_start) + o_start;
}
/**
 * Shuffles array in place. ES6 version
 * @param {Array} a - items An array containing the items.
 */
export function shuffle(a: any[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
