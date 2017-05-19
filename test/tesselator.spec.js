import fs from 'fs';
import expect from 'expect.js';
import * as tess from '../src/tesselator';


let POLYGONS = [[[136.5,-55.5],[976.5,-55.5],[976.5,630.5],[136.5,630.5]]];
let HOLES = [[[462,321],[563,321],[563,226],[462,226]]];

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
});
