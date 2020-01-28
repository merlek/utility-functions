import {
  adjust,
  dropFirst,
  dropLast,
  id,
  keep,
  map,
  mapi,
  mapRange,
  merge,
  mod,
  objOf,
  pipe,
  prop,
  random,
  randomInt,
  range,
  repeat,
  spec,
  shuffle
} from '../src/utility-functions';

describe('utility-functions', () => {
  const array: number[] = [1, 2, 3, 4];
  const obj = {
    cat: 'cat',
    dog: 'dog'
  };
  const addOne = (x: number) => x + 1;
  const minusOne = (x: number) => x - 1;
  const addI = (x: number) => (i: number) => x + i;

  afterAll(() => {
    expect(array).toEqual([1, 2, 3, 4]);
    expect(obj).toEqual({
      cat: 'cat',
      dog: 'dog'
    });
  });

  it('dropFirst removes first element of array', () => {
    expect(dropFirst(array)).toEqual([2, 3, 4]);
  });

  it('dropLast removes last element of array', () => {
    expect(dropLast(array)).toEqual([1, 2, 3]);
  });

  it('id returns the same object', () => {
    expect(id(array)).toBe(array);
  });

  it('keep returns the first object after the second call', () => {
    expect(keep(array)(false)).toBe(array);
  });

  it('map a function over each member of an array', () => {
    expect(map(addOne)(array)).toEqual([2, 3, 4, 5]);
  });

  it('map a function over each member of an array with an index', () => {
    expect(mapi(addI)(array)).toEqual([1, 3, 5, 7]);
  });

  it('adjust the nth element of an array', () => {
    expect(adjust<number, number>(1)(addOne)(array)).toEqual([1, 3, 3, 4]);
  });

  it('merge two objects', () => {
    expect(merge(obj)({ dog: 'puppy' })).toEqual({ cat: 'cat', dog: 'puppy' });
  });

  it('merge two arrays', () => {
    expect(merge(array)([0])).toEqual([0, 2, 3, 4]);
  });

  it('mod two numbers', () => {
    expect(mod(2)(1)).toBe(1);
  });

  it('mod with a negative dividenc', () => {
    expect(mod(2)(-1)).toBe(1);
  });

  it('objOf creates a key value object', () => {
    expect(objOf('key')('value')).toEqual({ key: 'value' });
  });

  it('pipe applies multiple functions to a value', () => {
    expect(pipe(addOne, addOne, addOne)(1)).toBe(4);
  });

  it('prop creates a function to retreive a property value', () => {
    expect(prop('cat')(obj)).toBe('cat');
  });

  it('range creates an array of intergers from n to m', () => {
    expect(range(1)(5)).toEqual([1, 2, 3, 4]);
    expect(range(0)(100).length).toBe(100);
  });

  it('repeat creates an array with a value repeated n times', () => {
    expect(repeat('a')(3)).toEqual(['a', 'a', 'a']);
  });

  it('repeat creates an array with a value repeated n times', () => {
    expect(repeat('a')(3)).toEqual(['a', 'a', 'a']);
  });

  it('randomInt returns a random integer value between min and max', () => {
    const min = 0;
    const max = 10;
    for (let i = 0; i < 100; i++) {
      const result = randomInt(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThan(max);
      expect(Number.isInteger(result)).toBeTrue();
    }
  });

  it('random returns a random number between min and max', () => {
    const min = 0;
    const max = 10;
    let allIntegers = true;
    for (let i = 0; i < 100; i++) {
      const result = random(min)(max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThan(max);
      allIntegers = allIntegers && Number.isInteger(result);
    }
    expect(allIntegers).toBeFalse();
  });

  it('random returns a random element of an array', () => {
    const values = ['cat', 'dog', 'fish'];
    const testArray = [...values];
    for (let i = 0; i < 100; i++) {
      const result = random(testArray);
      expect(testArray.includes(result)).toBeTrue();
      expect(testArray).toEqual(values);
    }
  });

  it('spec returns an object from a mapping of functions', () => {
    expect(
      spec({
        a: addOne,
        b: minusOne
      })(1)
    ).toEqual({ a: 2, b: 0 });
  });

  it('mapRange maps a value from one range to another', () => {
    expect(mapRange(2, 1, 3, 2, 4)).toBe(3);
  });

  it('shuffle shuffles an array in place', () => {
    const shuffled = shuffle([...array]);
    expect(shuffled).not.toEqual(array);
    expect(shuffled.sort()).toEqual([...array].sort());
  });
});
