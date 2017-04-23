
export const WINDING_UNKNOWN = 0;
export const WINDING_CCW = 1;
export const WINDING_CW = 2;

export function ccw (a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
}

function cross (a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

function length (v) {
  return v.length === 3 ?
    Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]) :
    Math.sqrt(v[0]*v[0]+v[1]*v[1]);
}

function normalize (v) {
  let len = length(v);
  return v.map(i => {
    return i / len;
  });
}

function subtract (a, b) {
  return a.map((v, i) => {
    return v - b[i];
  });
}

/**
 * Polygon normal (2d / 3d)
 *
 * @param {Array} pts
 *
 * @return Polygon normal or null if the polygon is degenerate
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

  n = normalize(n);

  return n.some(v => isNaN(n)) ? null : n;
}

/**
 * Signed area of a polygon (2d)
 *
 * @param {Array} pts
 *
 * @return {Number}
 */
export function area (pts) {
  return pts.reduce((a, p, i) => {
    let pn = pts[i+1] || pts[0];
    return a + p[0] * pn[1] - pn[0] * p[1];
  }, 0) / 2;
}

/**
 * Polygon centroid (2d)
 *
 * @param {Array} pts
 *
 * @return {Array}
 */
export function centroid (pts) {
  let [x, y] = pts.reduce(([x,y], p, i) => {
      let pn = pts[i+1] || pts[0],
          c = p[0] * pn[1] - pn[0] * p[1];
      return [x + (p[0] + pn[0]) * c, y + (p[1] + pn[1]) * c];
  }, [0, 0]);

  let ar = area(pts);
  if (x !== 0) {
      x = x / (Math.abs(ar) * 6);
  }
  if (y !== 0 ) {
      y = y / (Math.abs(ar) * 6);
  }

  if (ar < 0) {
      x = -x;
      y = -y;
  }
  return [x, y];
}

/**
 * Tests wether the polygon winding is counter clockwise
 *
 * @param {Array} pts
 *
 * @return {Boolean}
 */
export function is_ccw (pts) {
  return area(pts) > 0;
}

/**
 * Tests wether the polygon winding is clockwise
 *
 * @param {Array} pts
 *
 * @return {Boolean}
 */
export function is_cw (pts) {
  return area(pts) < 0;
}

/**
 * Polygon winding
 *
 * @param {Array} pts
 *
 * @return {Number}
 */
export function winding (pts) {
  let a = area(pts);
  if (a < 0) return WINDING_CW;
  if (a > 0) return WINDING_CCW;
  return WINDING_UNKNOWN;
}

export function bounds (pts) {
  let min = [ Number.MAX_VALUE,  Number.MAX_VALUE],
      max = [-Number.MAX_VALUE, -Number.MAX_VALUE];

  pts.forEach(p => {
    for (let i = 0; i < p.length; ++i) {
      min[i] = Math.min(min[i], p[i]);
      max[i] = Math.max(max[i], p[i]);
    }
  });

  return {
    xMin: min[0],
    yMin: min[1],
    xMax: max[0],
    yMax: max[1]
  };
}
