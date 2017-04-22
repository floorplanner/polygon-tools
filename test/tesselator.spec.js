import fs from 'fs';
import expect from 'expect.js';
import {triangulate} from '../src/index';

const POLYGON = [
  [0, 0],
  [100, 0],
  [100, 100],
  [0, 100]
];

const HOLE = [
  [30, 30],
  [30, 70],
  [70, 70],
  [70, 30]
];

const HOLE_2 = [
  [-10, 50],
  [-10, 80],
  [190, 80],
  [190, 50]
];

function random_color (alpha=1) {
  let r = Math.round(Math.random() * 0xff),
      g = Math.round(Math.random() * 0xff),
      b = Math.round(Math.random() * 0xff);
  return `rgba(${r},${g},${b},${alpha})`
}

function render_polygon (ctx, polygon, fill=null) {

  let [x, y] = polygon[0];

  ctx.beginPath();
  ctx.fillStyle = fill || random_color();
  ctx.strokeStyle = 'rgba(0,0,0,1)';

  ctx.moveTo(x, y);

  for (let i = 1; i < polygon.length; ++i) {
    let [x, y] = polygon[i];
    ctx.lineTo(x, y);
  }

  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function render (outfile, triangles) {
  let Canvas = require('canvas'),
      canvas = new Canvas(640, 480),
      ctx = canvas.getContext('2d');

  triangles.forEach(triangle => {
    render_polygon(ctx, triangle)
  });

  fs.writeFileSync(outfile, canvas.toBuffer());
}

describe('tesselator', () => {

  beforeEach(() => {
  });

  it('should drill holes in a polygon', () => {
    let result = triangulate(POLYGON, [HOLE, HOLE_2]);

    try {
      console.time('\n    triangulate');
      render('triangles.png', result);
      console.timeEnd('\n    triangulate');
      console.log('\n')
    } catch (e) {
      console.log('\n    NOTE: to render a visualization: npm i canvas\n');
    }
  });

});
