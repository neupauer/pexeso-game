/**
 * Clamp number between two values.
 *
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/**
 * A utility for constructing `className` strings conditionally. Any falsy values are discarded!
 *
 * @param  {...string} classes
 *
 * @returns {string}
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
