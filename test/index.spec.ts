import {groupBy, makeEnumerable, experiment} from '../src/index';

test('groupBy', () => {
  const input = makeEnumerable([1, 2, 3, 4, 5]);
  const groupFn = (n: number): string => (n % 2 == 0 ? 'even' : 'odd');

  expect(groupBy(input, groupFn)).toEqual({even: [2, 4], odd: [1, 3, 5]});
  // expect(input.groupBy(groupFn)).toEqual({even: [2, 4], odd: [1, 3, 5]});
});

test('experiment', () => {
  const input = [1, 2, 3, 4];
  const e = experiment(input);
  const output = e.eachWithObject([], (r, i) => {
    // @ts-ignore
    r.push(i * 2);

    return r;
  });
  expect(output).toEqual([2, 4, 6, 8]);
});
