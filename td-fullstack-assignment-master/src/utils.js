/**
 * Detects sums in an array of numbers. Optimised to O(n^2) time complexity.
 * @param {number[]} array - The array of numbers to detect sums in.
 * @returns {Object[]} An array of objects with the indices of the numbers that sum to the target number.
 * @throws {Error} If the input is not an array or if the elements are not numbers.
 */
export const detectSums = (array) => {
  if (!Array.isArray(array)) {
    throw new Error("Input is not an array");
  }
  if (array.some((i) => isNaN(i))) {
    throw new Error("Provided elements are not numbers");
  }

  const results = [];

  // valueMap is a map of values to their indices. Map is faster for large datasets.
  const valueMap = new Map();

  // addToValueMap is a helper function to add a value index to the valueMap
  const addToValueMap = (value, index) => {
    (valueMap.get(value) || valueMap.set(value, []).get(value)).push(index);
  };

  // map the array
  array.forEach((value, index) => addToValueMap(value, index));

  for (let i = 0; i < array.length; i++) {
    // iterate from i + 1 to avoid duplicates
    for (let j = i + 1; j < array.length; j++) {
      const sum = array[i] + array[j];
      // Skip if sum not in array
      if (!valueMap.has(sum)) continue;

      const sumIndices = valueMap.get(sum);
      // for each sum, index i and j that not equal to the sum index are creating a pair.
      for (const sumIdx of sumIndices.filter(
        (sumIdx) => sumIdx !== i && sumIdx !== j
      )) {
        results.push({ pA: i, pB: j, sum: sumIdx });
      }
    }
  }
  return results;
};

/**
 * Detects sums in an array of numbers using brute force - O(n^3) time complexity.
 * @param {number[]} array - The array of numbers to detect sums in.
 * @returns {Object[]} An array of objects with the indices of the numbers that sum to the target number.
 * @throws {Error} If the input is not an array or if the elements are not numbers.
 */
export const detectSumsBruteForce = (array) => {
  if (!Array.isArray(array)) {
    throw new Error("Input is not an array");
  }
  if (array.some((i) => isNaN(i))) {
    throw new Error("Provided elements are not numbers");
  }

  const results = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      // indices must be different
      if (i === j) continue;
      for (let k = 0; k < array.length; k++) {
        // indices must be different
        if (k === i || k === j) continue;
        if (array[i] + array[j] === array[k]) {
          // Only add one combination per sum (pA, pB, sum index),
          // and only for i < j to avoid duplicates in different order
          if (
            i < j &&
            !results.some((r) => r.pA === i && r.pB === j && r.sum === k)
          ) {
            results.push({ pA: i, pB: j, sum: k });
          }
        }
      }
    }
  }
  return results;
};

/**
 * Detects sums in provided input and returns the result.
 * @param {string} input - The input to detect sums in.
 * @returns {Object} An object with the input, result, and error.
 */
export function calculateResult(input) {
  let error = null;
  const array = input.split(",");

  // Note:Not moving this check to detectSums because it should return an empty array in this case
  if (array.length < 3) {
    return {
      input: [],
      result: [],
      error: "Minimum of three elements",
    };
  }

  const parsedInput = array.map((i) => parseInt(i.trim(), 10));

  let result = [];
  try {
    result = detectSums(parsedInput);
  } catch (e) {
    error = e.message;
  }
  return { input: parsedInput, result, error };
}
