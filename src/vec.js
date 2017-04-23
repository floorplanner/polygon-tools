export function cross (a, b) {
  a = a.length === 2 ? [a[0], a[1], 0] : a;
  b = b.length === 2 ? [b[0], b[1], 0] : b;
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

export function length (v) {
  return Math.sqrt(v.reduce((p, w, i) => {
    return p + w*w;
  }, 0));
}

export function normalize (v) {
  let len = length(v);
  return v.map(i => i / len);
}

export function add (a, b) {
  return a.map((v, i) => v + b[i]);
}

export function subtract (a, b) {
  return a.map((v, i) => v - b[i]);
}

export var sub = subtract;
