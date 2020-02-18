/*
 * # Existing ES2015 equivalents
 *
 * | Ruby Enumerable | Javascript |
 * |-----------------|------------|
 * | all             | every      |
 * | any             | some       |
 * | count           | size       |
 * | detect          | find       |
 * | drop            |            |
 * | dropWhile       |            |
 * | eachWithIndex   | forEach    |
 * | eachWithObject  |            |
 * | first           |            |
 * | findIndex       |            |
 * | groupBy         |            |
 * | include         |            |
 * | inject          |            |
 * | map             | map        |
 * | none            |            |
 * | one             |            |
 * | partition       |            |
 * | reject          |            |
 * | reverseEach     |            |
 * | select          |            |
 * | take            |            |
 * | takeWhile       |            |
 * | toA             |            |
 *
 */

// const ALIASES = {
//   collect: 'map',
//   entries: 'toA',
//   find: 'detect',
//   findAll: 'select',
//   member: 'include',
//   reduce: 'inject',
// };

export function incr(a: number): number {
  return a + 1;
}

export function eachWithObject<T, U>(
  e: Enumerable<T>,
  obj: U,
  fn: (obj: U, member: T) => U,
): U {
  const boundFn = (mbr: T) => fn(obj, mbr);

  // FIXME:
  //
  // error TS2345: Argument of type '(mbr: T) => U' is not assignable to
  // parameter of type 'T'.  '(mbr: T) => U' is assignable to the constraint of
  // type 'T', but 'T' could be instantiated with a different subtype of
  // constraint '{}'.
  //
  // @ts-ignore
  e.each(boundFn);

  return obj;
}

export function map<T, U>(e: Enumerable<T>, fn: (member: T) => U): U[] {
  return eachWithObject(e, [], (r: U[], member: T) => {
    r.push(fn(member));
    return r;
  });
}

export function select<T>(
  e: Enumerable<T>,
  fn: (member: T) => boolean,
): Enumerable<T> {
  const n = emptyClone(e);
  return eachWithObject(e, n, (r: Enumerable<T>, member: T) => {
    if (fn(member)) r.push(member);
    return r;
  });
}

export function reject<T>(
  e: Enumerable<T>,
  fn: (member: T) => boolean,
): Enumerable<T> {
  const reverseFn = (member: T) => !fn(member);
  return select(e, reverseFn);
}

export function partition<T>(
  e: Enumerable<T>,
  fn: (member: T) => boolean,
): [Enumerable<T>, Enumerable<T>] {
  const trueArray = emptyClone(e);
  const falsArray = emptyClone(e);
  const partitionItem = (mbr: T) => {
    if (fn(mbr)) trueArray.push(mbr);
    else falsArray.push(mbr);
  };

  // FIXME
  // @ts-ignore
  e.each(partitionItem);

  return [trueArray, falsArray];
}

export function all<T>(e: Enumerable<T>, fn: (member: T) => boolean): boolean {
  return e.every(fn);
}

export function any<T>(e: Enumerable<T>, fn: (member: T) => boolean): boolean {
  return e.some(fn);
}

export function none<T>(e: Enumerable<T>, fn: (member: T) => boolean): boolean {
  return !e.some(fn);
}

export function groupBy<T>(e: Enumerable<T>, fn: (member: T) => string) {
  return eachWithObject(e, {}, (r, member) => {
    const key = fn(member)
    if (!r[key]) r[key] = [];
    r[key].push(member)
    return r;
  });
}

function emptyClone<T>(e: Enumerable<T>): Enumerable<T> {
  const n = Object.assign({}, e);
  n.length = 0;
  return n;
}

interface Enumerable<T> extends Array<T> {
  each: (member: T) => any;
}
