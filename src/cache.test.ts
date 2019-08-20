import { Cache } from "./cache";

describe("Cache", () => {
  it("should return same group", () => {
    const cache = new Cache();

    const empty = {};
    expect(cache.get(empty)).toBe(cache.get(empty));

    const root = {
      root: document.body
    };
    expect(cache.get(root)).toBe(cache.get(root));

    const defaults = {
      rootMargin: "0px"
    };
    expect(cache.get({})).toBe(cache.get(defaults));
    expect(cache.get(defaults)).toBe(cache.get({}));
  });

  it("should return different group", () => {
    const cache = new Cache();

    const empty = {};
    expect(cache.get(empty)).not.toBe(cache.get({ root: document.body }));
    expect(cache.get(empty)).not.toBe(cache.get({ rootMargin: "1px" }));
    expect(cache.get(empty)).not.toBe(cache.get({ threshold: 1 }));
  });
});
