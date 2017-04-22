import Tesselator from './tesselator';

function to_array (polygon) {
  return polygon.map(v => [v.x, v.y]);
}

function to_points (polygon) {
  return polygon.map(v => {
    return {x: v[0], y: v[1]};
  });
}

function to_triangles (data) {
  let result = [];
  for (let i = 0; i < data.length; i += 3) {
    result.push([data[i], data[i+1], data[i+2]]);
  }
  return result;
}

export function triangulate (polygon, holes) {
  if (!polygon || polygon.length < 3) return polygon;
  if (!holes || holes.length === 0) return polygon;

  let tesselator = new Tesselator(2),
      poly = to_array(polygon),
      aholes = holes.map(to_array);

  return tesselator
    .triangles([poly], aholes)
    .map(to_points)
    .map(to_triangles)
    .reduce((p, v) => {
      return p.concat(v);
    }, []);
}
