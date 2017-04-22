
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

export function normal (pts) {

  let vs = pts.map(p => {
        return p.length === 3 ? p : [p[0], p[1], 0];
      }),
      [a, b, c] = vs,
      ba = subtract(b, a),
      ca = subtract(c, a),
      cr = normalize(cross(ba, ca));

  if (cr.some(v => isNaN(v))) {
  } else {
    return cr;
  }

  let n = [0, 0, 0];
  vs.forEach((v, i) => {
    let w = vs[(i+1) % pts.length];
    n[0] = n[0] + (v[1] - w[1]) * (v[2] + w[2]);
    n[1] = n[1] + (v[2] - w[2]) * (v[0] + w[0]);
    n[2] = n[2] + (v[0] - w[0]) * (v[1] + w[1]);
  });

  return normalize(n);
}

export function is_ccw (pts) {
  let [a, b, c] = pts,
      r = ccw(a, b, c);

  if (r === 0) {
    let n = normal(pts);
    return n[2] > 0;
  } else {
    return r > 0;
  }
}

export function is_cw (pts) {
  return !is_ccw(pts);
}
