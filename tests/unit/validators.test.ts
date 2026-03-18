import { describe, it, expect } from "vitest";
import { validators } from "../../src/shared/utils/validators";

describe("validators.email", () => {
  it("accepts valid email", () => expect(validators.email("a@b.com")).toBeNull());
  it("rejects invalid email", () => expect(validators.email("notanemail")).not.toBeNull());
});

describe("validators.required", () => {
  it("accepts non-empty string", () => expect(validators.required("hello")).toBeNull());
  it("rejects empty string", () => expect(validators.required("")).not.toBeNull());
  it("rejects null", () => expect(validators.required(null)).not.toBeNull());
});

describe("validators.latitude", () => {
  it("accepts valid lat", () => expect(validators.latitude(10.7769)).toBeNull());
  it("rejects > 90", () => expect(validators.latitude(91)).not.toBeNull());
  it("rejects < -90", () => expect(validators.latitude(-91)).not.toBeNull());
});
