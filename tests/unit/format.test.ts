import { describe, it, expect } from "vitest";
import { formatAge, formatDistance } from "../../src/shared/utils/format";

describe("formatAge", () => {
  it("handles < 1 month", () => expect(formatAge(0)).toBe("< 1 month"));
  it("handles months only", () => expect(formatAge(3)).toBe("3 months"));
  it("handles 1 year exactly", () => expect(formatAge(12)).toBe("1 year"));
  it("handles years and months", () => expect(formatAge(14)).toBe("1y 2m"));
  it("handles 2 years", () => expect(formatAge(24)).toBe("2 years"));
});

describe("formatDistance", () => {
  it("rounds to 1 decimal", () => expect(formatDistance(1.834)).toBe("1.8 km"));
  it("handles whole numbers", () => expect(formatDistance(30)).toBe("30.0 km"));
});
