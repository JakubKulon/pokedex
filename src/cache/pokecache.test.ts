import { expect, test } from "vitest";
import { Cache } from "./pokecache.js";

test("basic cache functionality", async () => {
  const cache = new Cache(300);
  //test if u are able to get data before expiration
  cache.add("test-key", "test-value");

  const result = cache.get("test-key");

  expect(result).toBe("test-value");

  //test if expiration works
  await new Promise((resolve) => setTimeout(resolve, 600));

  const expired = cache.get("test-key");

  expect(expired).toBe(undefined);

  cache.stopReapLoop();
});
