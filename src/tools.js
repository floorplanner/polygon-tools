
export function ccw (a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
}

export function cross (a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

export function length (v) {
  return v.length === 3 ?
    Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]) :
    Math.sqrt(v[0]*v[0]+v[1]*v[1]);
}

export function normalize (v) {
  let len = length(v);
  return v.map(i => {
    return i / len;
  });
}

export function subtract (a, b) {
  return a.map((v, i) => {
    return v - b[i];
  });
}

/**
 * Polygon normal
 *
 * @param {Array} pts
 *
 * @return Polygon normal or null on failure
 */
export function normal (pts) {

  if (pts.length < 3) return null;

  let vs = pts.map(p => {
        return p.length === 3 ? p : [p[0], p[1], 0];
      }),
      [a, b, c] = vs,
      ba = subtract(b, a),
      ca = subtract(c, a),
      cr = normalize(cross(ba, ca));

  if (cr.some(v => isNaN(v))) {
    if (pts.length === 3) return null;
  } else {
    return cr;
  }

  // fallback to Newell's method
  let n = [0, 0, 0];
  vs.forEach((v, i) => {
    let w = vs[(i+1) % pts.length];
    n[0] = n[0] + (v[1] - w[1]) * (v[2] + w[2]);
    n[1] = n[1] + (v[2] - w[2]) * (v[0] + w[0]);
    n[2] = n[2] + (v[0] - w[0]) * (v[1] + w[1]);
  });

  return normalize(n);
}

/**
 * Tests wether the polygon winding is counter clockwise
 *
 * @param {Array} pts
 *
 * @return Boolean
 *
 * @throws Error
 */
export function is_ccw (pts) {
  let [a, b, c] = pts,
      r = ccw(a, b, c);

  if (r === 0) {
    let n = normal(pts);
    if (n === null) throw new Error('could not calculate normal');
    return n[2] > 0;
  } else {
    return r > 0;
  }
}

/**
 * Tests wether the polygon winding is clockwise
 *
 * @param {Array} pts
 *
 * @return Boolean
 *
 * @throws Error
 */
export function is_cw (pts) {
  return !is_ccw(pts);
}

export function polygon_bounds (pts) {
  let min = [ Number.MAX_VALUE,  Number.MAX_VALUE, 0],
      max = [-Number.MAX_VALUE, -Number.MAX_VALUE, 0];

  pts.forEach(p => {
    for (let i = 0; i < p.length; ++i) {
      min[i] = Math.min(min[i], p[i]);
      max[i] = Math.max(max[i], p[i]);
    }
  });

  return {
    xMin: min[0],
    yMin: min[1],
    zMin: min[2],
    xMax: max[0],
    yMax: max[1],
    zMax: max[2]
  };
}
