import Tesselator from './tesselator';
import * as p from './polygon';

function to_triangles (data) {
  let result = [];
  for (let i = 0; i < data.length; i += 3) {
    result.push([data[i], data[i+1], data[i+2]]);
  }
  return result;
}

export var polygon = p;

/**
 * Triangulates a polygon
 *
 * @param {Array} polygon
 * @param {Array.<Array>} holes
 *
 * @return triangles
 */
export function triangulate (polygon, holes) {
  if (!polygon || polygon.length < 3 || !holes || holes.length < 1)
    return polygon;

  let bounds = p.bounds(polygon);

  holes = holes.filter(hole => {
    let b = p.bounds(hole),
        out = b.xMin > bounds.xMax ||
              b.yMin > bounds.yMax ||
              b.xMax < bounds.xMin ||
              b.yMax < bounds.yMin;
    return !out;
  });

  if (holes.length === 0) return polygon;

  let tesselator = new Tesselator(2);

  return tesselator
    .triangles([polygon], holes)
    .map(to_triangles)
    .reduce((p, v) => {
      return p.concat(v);
    }, []);
}
