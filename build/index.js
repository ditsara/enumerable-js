'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
function incr(a) {
    return a + 1;
}
function eachWithObject(e, obj, fn) {
    var boundFn = function (mbr) { return fn(obj, mbr); };
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
function map(e, fn) {
    return eachWithObject(e, [], function (r, member) {
        r.push(fn(member));
        return r;
    });
}
function select(e, fn) {
    var n = Object.assign({}, e);
    n.length = 0;
    return eachWithObject(e, n, function (r, member) {
        if (fn(member))
            r.push(member);
        return r;
    });
}
function reject(e, fn) {
    var reverseFn = function (member) { return !fn(member); };
    return select(e, reverseFn);
}

exports.eachWithObject = eachWithObject;
exports.incr = incr;
exports.map = map;
exports.reject = reject;
exports.select = select;
//# sourceMappingURL=index.js.map
