/**
 * @module vec
 */

/**
 * Cross product
 *
 * @param {Array} a First vector
 * @param {Array} b Second vector
 *
 * @return {Array}
 */
export function cross (a, b) {
  a = a.length === 2 ? [a[0], a[1], 0] : a;
  b = b.length === 2 ? [b[0], b[1], 0] : b;
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

/**
 * Length of vector
 *
 * @param {Array} v Vector
 *
 * @return {Number}
 */
export function length (v) {
  return Math.sqrt(v.slice(0,3).reduce((p, w, i) => {
    return p + w*w;
  }, 0));
}

/**
 * Normalize a vector
 *
 * @param {Array} v Vector
 *
 * @return {Array}
 */
export function normalize (v) {
  let len = length(v);
  return v.slice(0,3).map(i => i / len);
}

/**
 * Add
 *
 * @param {Array} a First vector
 * @param {Array} b Second vector
 *
 * @return {Array}
 */
export function add (a, b) {
  return a.slice(0,3).map((v, i) => v + b[i]);
}

/**
 * Subtract
 *
 * @param {Array} a First vector
 * @param {Array} b Second vector
 *
 * @return {Array}
 */
export function subtract (a, b) {
  return a.slice(0,3).map((v, i) => v - b[i]);
}

export var sub = subtract;
