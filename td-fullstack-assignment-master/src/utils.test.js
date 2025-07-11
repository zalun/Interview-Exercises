/* eslint-env mocha */
import { expect } from "chai";
import { detectSums } from "./utils";

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
