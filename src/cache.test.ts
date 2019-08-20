import { Cache } from "./cache";

describe("Cache", () => {
  it("should return same group", () => {
    const cache = new Cache();
    expect(cache.get({})).toBe(cache.get({}));
    expect(cache.get({ root: document.body })).toBe(
      cache.get({ root: document.body })
    );
    expect(cache.get({})).toBe(cache.get({ rootMargin: "0px" }));
    expect(cache.get({ rootMargin: "0px" })).toBe(cache.get({}));
    expect(cache.get({ threshold: [0, 1] })).toBe(
      cache.get({ threshold: [0, 1] })
    );
    expect(cache.get({ threshold: [0] })).toBe(cache.get({ threshold: 0 }));
  });

  it("should return different group", () => {
    const cache = new Cache();
    expect(cache.get({})).not.toBe(cache.get({ root: document.body }));
    expect(cache.get({})).not.toBe(cache.get({ rootMargin: "1px" }));
    expect(cache.get({})).not.toBe(cache.get({ threshold: 1 }));
    expect(cache.get({ threshold: [0] })).not.toBe(
      cache.get({ threshold: [1] })
    );
  });
});
