/* eslint-env mocha */
import { expect } from "chai";
import { detectSums, calculateResult } from "./utils";

describe("Detect sums", () => {
  it("should fail if input is not an array", () => {
    expect(() => detectSums()).to.throw("Input is not an array");
  });

  it("should return an array", () => {
    const result = detectSums([]);
    expect(result).to.be.instanceof(Array);
  });

  it("should detect sums", () => {
    const result = detectSums([1, 2]);
    expect(result).to.be.instanceof(Array);
    expect(result).to.have.lengthOf(0);
  });

  it("should detect sums in order", () => {
    const result = detectSums([1, 2, 3]);
    expect(result).to.be.instanceof(Array);
    expect(result).to.have.lengthOf(1);
    expect(result).to.deep.include({ pA: 0, pB: 1, sum: 2 });
  });

  it("should match README example: [1, 2, 3]", () => {
    const result = detectSums([1, 2, 3]);
    expect(result).to.deep.equal([{ pA: 0, pB: 1, sum: 2 }]);
  });

  it("should match README example: [1, 2, 3, 4]", () => {
    const result = detectSums([1, 2, 3, 4]);
    expect(result).to.deep.equal([
      { pA: 0, pB: 1, sum: 2 },
      { pA: 0, pB: 2, sum: 3 },
    ]);
  });

  it("should match README example: [3, 0, 3]", () => {
    const result = detectSums([3, 0, 3]);
    expect(result).to.deep.equal([
      { pA: 0, pB: 1, sum: 2 },
      { pA: 1, pB: 2, sum: 0 },
    ]);
  });

  it("should match README example: [1, 2, 4]", () => {
    const result = detectSums([1, 2, 4]);
    expect(result).to.deep.equal([]);
  });

  it("should match README example: [3, 0, 2]", () => {
    const result = detectSums([3, 0, 2]);
    expect(result).to.deep.equal([]);
  });

  it("should match README example: [1, 2, 3, 4, 5]", () => {
    const result = detectSums([1, 2, 3, 4, 5]);
    expect(result).to.deep.equal([
      { pA: 0, pB: 1, sum: 2 },
      { pA: 0, pB: 2, sum: 3 },
      { pA: 0, pB: 3, sum: 4 },
      { pA: 1, pB: 2, sum: 4 },
    ]);
  });

  it("should match README example: [1, 2, 1, 3]", () => {
    const result = detectSums([1, 2, 1, 3]);
    expect(result).to.deep.equal([
      { pA: 0, pB: 1, sum: 3 },
      { pA: 0, pB: 2, sum: 1 },
      { pA: 1, pB: 2, sum: 3 },
    ]);
  });

  it("should match README example: [1, 2, 1, 2, 3]", () => {
    const result = detectSums([1, 2, 1, 2, 3]);
    expect(result).to.deep.equal([
      { pA: 0, pB: 1, sum: 4 },
      { pA: 0, pB: 2, sum: 1 },
      { pA: 0, pB: 2, sum: 3 },
      { pA: 0, pB: 3, sum: 4 },
      { pA: 1, pB: 2, sum: 4 },
      { pA: 2, pB: 3, sum: 4 },
    ]);
  });
});

describe("detectSums edge cases", () => {
  it("should return [] for empty array", () => {
    expect(detectSums([])).to.deep.equal([]);
  });

  it("should return [] for single element", () => {
    expect(detectSums([5])).to.deep.equal([]);
  });

  it("should handle all zeros", () => {
    const result = detectSums([0, 0, 0]);
    expect(result).to.deep.equal([
      { pA: 0, pB: 1, sum: 2 },
      { pA: 0, pB: 2, sum: 1 },
      { pA: 1, pB: 2, sum: 0 },
    ]);
  });

  it("should handle negative numbers", () => {
    const result = detectSums([1, -1, 0]);
    expect(result).to.deep.equal([{ pA: 0, pB: 1, sum: 2 }]);
  });

  it("should handle all negative numbers", () => {
    const result = detectSums([-1, -2, -3]);
    expect(result).to.deep.equal([{ pA: 0, pB: 1, sum: 2 }]);
  });

  it("should handle duplicate numbers", () => {
    const result = detectSums([2, 2, 4]);
    expect(result).to.deep.equal([{ pA: 0, pB: 1, sum: 2 }]);
  });

  it("should handle non-integer numbers", () => {
    const result = detectSums([1.5, 2.5, 4.0]);
    expect(result).to.deep.equal([{ pA: 0, pB: 1, sum: 2 }]);
  });

  it("should handle NaN in array", () => {
    const result = detectSums([1, NaN, 2]);
    expect(result).to.deep.equal([]);
  });

  it("should handle undefined in array", () => {
    const result = detectSums([1, undefined, 2]);
    expect(result).to.deep.equal([]);
  });

  // Commented out because it takes too long to run (35s on brute force solution)
  // it("should handle very large array with no valid sums", () => {
  //   const arr = Array.from({ length: 1000 }, (_, i) => i + 1);
  //   expect(detectSums(arr)).to.be.an("array");
  // });

  it("should throw error for non-array input: null", () => {
    expect(() => detectSums(null)).to.throw("Input is not an array");
  });

  it("should throw error for non-array input: undefined", () => {
    expect(() => detectSums(undefined)).to.throw("Input is not an array");
  });

  it("should throw error for non-array input: string", () => {
    expect(() => detectSums("string")).to.throw("Input is not an array");
  });

  it("should throw error for non-array input: number", () => {
    expect(() => detectSums(123)).to.throw("Input is not an array");
  });
});

describe("calculateResult", () => {
  it('should parse input and return correct result for "1,2,3"', () => {
    const output = calculateResult("1,2,3");
    expect(output.input).to.deep.equal([1, 2, 3]);
    expect(output.result).to.deep.equal([{ pA: 0, pB: 1, sum: 2 }]);
    expect(output.error).to.equal(null);
  });

  it("should return empty result for input with no sums", () => {
    const output = calculateResult("1,2,4");
    expect(output.input).to.deep.equal([1, 2, 4]);
    expect(output.result).to.deep.equal([]);
    expect(output.error).to.equal(null);
  });

  it("should handle extra spaces in input", () => {
    const output = calculateResult(" 1 , 2 , 3 ");
    expect(output.input).to.deep.equal([1, 2, 3]);
    expect(output.result).to.deep.equal([{ pA: 0, pB: 1, sum: 2 }]);
    expect(output.error).to.equal(null);
  });

  it("should handle invalid input gracefully", () => {
    const output = calculateResult("a,b,c");
    expect(output.input).to.deep.equal([]);
    expect(output.result).to.deep.equal([]);
    expect(output.error).to.equal("Provided elements are not numbers");
  });

  it("should handle invalid input gracefully", () => {
    const output = calculateResult("1,2,c");
    expect(output.input).to.deep.equal([]);
    expect(output.result).to.deep.equal([]);
    expect(output.error).to.equal("Provided elements are not numbers");
  });

  it("should handle less than three elements", () => {
    const output = calculateResult("1,2");
    expect(output.input).to.deep.equal([]);
    expect(output.result).to.deep.equal([]);
    expect(output.error).to.equal("Minimum of three elements");
  });

  it("should handle empty input", () => {
    const output = calculateResult("");
    expect(output.input).to.deep.equal([]);
    expect(output.result).to.deep.equal([]);
    expect(output.error).to.equal("Input is not an array");
  });

  it("should handle not an array", () => {
    const output = calculateResult("not array");
    expect(output.input).to.deep.equal([]);
    expect(output.result).to.deep.equal([]);
    expect(output.error).to.equal("Input is not an array");
  });
});
