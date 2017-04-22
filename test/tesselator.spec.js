import fs from 'fs';
import {triangulate} from '../src/index';
let expect = require('expect.js');

const POLYGON = [
  {x: 0, y: 0},
  {x: 100, y: 0},
  {x: 100, y: 100},
  {x: 0, y: 100}
];

const HOLE = [
  {x: 30, y: 30},
  {x: 30, y: 70},
  {x: 70, y: 70},
  {x: 70, y: 30}
];

const HOLE_2 = [
  {x: 80, y: 50},
  {x: 80, y: 80},
  {x: 190, y: 80},
  {x: 190, y: 50}
];

function random_color (alpha=1) {
  let r = Math.round(Math.random() * 0xff),
      g = Math.round(Math.random() * 0xff),
      b = Math.round(Math.random() * 0xff);
  return `rgba(${r},${g},${b},${alpha})`
}

function render_polygon (ctx, polygon, fill=null) {

  let {x, y} = polygon[0];

  ctx.beginPath();
  ctx.fillStyle = fill || random_color();
  ctx.strokeStyle = 'rgba(0,0,0,1)';

  ctx.moveTo(x, y);

  for (let i = 1; i < polygon.length; ++i) {
    let {x, y} = polygon[i];
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

  it('should drill a hole', () => {
    let result = triangulate(POLYGON, [HOLE, HOLE_2]);

    try {
      render('triangles.png', result);
    } catch (e) {
      console.log('to get a visual: npm i canvas');
    }
  });

});
