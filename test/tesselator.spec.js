import fs from 'fs';
import expect from 'expect.js';
import * as tess from '../src/tesselator';
import * as poly from '../src/polygon';

let POLYGONS = [[[136.5,-55.5],[976.5,-55.5],[976.5,630.5],[136.5,630.5]]];
let HOLES = [[[462,321],[563,321],[563,226],[462,226]]];

let SPLIT_WALL = [[
  [17.150735294117652,161.45220588235293],
  [130.97426470588238,161.45220588235296],
  [866.5808823529412,161.45220588235293],
  [866.5808823529416,806.8382352941177],
  [17.150735294117652,806.8382352941176]]];

let L_SHAPE = [[
  [221.19485294117632,573.6764705882355],
  [558.9705882352944,573.6764705882357],
  [558.9705882352938,231.76470588235296],
  [866.5808823529411,231.76470588235293],
  [866.5808823529409,806.8382352941176],
  [221.19485294117618,806.8382352941176]]];

function cycle_polygon (p, i=0) {
  let res = p.slice(i);
  for (let j = 0; j < i; ++j) {
    res.push(p[j]);
  }
  return res;
}

describe('tesselator', () => {

  it ('options.autoWinding', () => {
    let options = {
      polygons: POLYGONS.slice(),
      holes: HOLES.slice()
    };

    let triangles = tess.run(options);

    expect(triangles[0].length).to.be(8);

    options.polygons = POLYGONS.map(p => {
      p.reverse();
      return p;
    });

    triangles = tess.run(options);

    expect(triangles[0].length).to.be(8);
  });

  it ('should output triangles for the split wall case', () => {
    let options = {
      polygons: SPLIT_WALL
    };

    let triangles = tess.run(options);

    expect(triangles[0].length).to.be(3);
  });

  it ('should output triangles for the L-shape case', () => {
    let options = {
      polygons: L_SHAPE
    };

    let triangles = tess.run(options);

    expect(triangles[0].length).to.be(4);
  });

  it ('should output triangles for another L-shape case', () => {
    let poly = [
      [0, 0],
      [100, 0],
      [100, 200],
      [200, 200],
      [200, 300],
      [100, 300],
      [0, 300]
    ];

    for (let i = 0; i < poly.length; ++i) {
      let p = cycle_polygon(poly, i);

      let options = {
        polygons: [poly]
      };

      let triangles = tess.run(options);

      expect(triangles[0].length).to.be(5);
    }

    poly.reverse();

    for (let i = 0; i < poly.length; ++i) {
      let p = cycle_polygon(poly, i);

      let options = {
        polygons: [poly]
      };

      let triangles = tess.run(options);

      expect(triangles[0].length).to.be(5);
    }

  });
});