/**
 * Detects sums in an array of numbers.
 * @param {number[]} array - The array of numbers to detect sums in.
 * @returns {Object[]} An array of objects with the indices of the numbers that sum to the target number.
 */
export const detectSums = (array) => {
  if (!Array.isArray(array)) {
    throw new Error("Input is not an array");
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
  const parsedInput = input.split(",").map((i) => parseInt(i.trim(), 10));
  let error = null;
  let result = "";
  try {
    result = detectSums(parsedInput);
  } catch (e) {
    error = e.message;
  }
  return { input: parsedInput, result, error };
}
