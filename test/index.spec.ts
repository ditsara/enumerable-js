import { incr } from "../src/index";

test("Incr 4 == 5", () => {
  expect(incr(4)).toBe(5);
});
