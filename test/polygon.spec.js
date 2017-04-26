import fs from 'fs';
import expect from 'expect.js';
import * as polygon from '../src/polygon';

const OUT = './test/out';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

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

function render (outfile, polygons) {
  let Canvas = require('canvas'),
      canvas = new Canvas(640, 480),
      ctx = canvas.getContext('2d');

  polygons.forEach(polygon => {
    render_polygon(ctx, polygon)
  });

  fs.writeFileSync(`${OUT}/${outfile}`, canvas.toBuffer());
}

describe('polygon', () => {

  it('ccw should be positive', () => {
    let a = [0, 0],
        b = [100, 0],
        c = [100, 100];
    expect(polygon.ccw(a, b, c)).to.be.above(0);
  });

  it('ccw should be negative', () => {
    let a = [0, 0],
        b = [100, 0],
        c = [100, 100];
    expect(polygon.ccw(c, b, a)).to.be.below(0);
  });

  it('ccw should be zero', () => {
    let a = [0, 0],
        b = [100, 0],
        c = [200, 0];
    expect(polygon.ccw(a, b, c)).to.be(0);
  });

  it('is_ccw should be true', () => {
    let a = [0, 0],
        b = [100, 0],
        c = [100, 100];
    expect(polygon.is_ccw([a, b, c])).to.be(true);
  });

  it('is_ccw should be false', () => {
    let a = [0, 0],
        b = [100, 0],
        c = [100, 100];
    expect(polygon.is_ccw([c, b, a])).to.be(false);
  });

  it('should calculate polygon normal', () => {
    let a = [0, 0],
        b = [100, 0],
        c = [200, 0],
        d = [200, 100],
        n = polygon.normal([a, b, d]);
    expect(n[0]).to.be(0);
    expect(n[1]).to.be(0);
    expect(n[2]).to.be(1);
  });

  it('should calculate polygon area (2d)', () => {
    let a = [0, 0],
        b = [100, 0],
        c = [100, 100],
        d = [0, 100],
        area = polygon.area([a, b, c, d]);
    expect(area).to.be(10000);
  });

  it('should calculate polygon area (3d)', () => {
    let poly = [
          [0, 0, 0],
          [100, 0, 0],
          [100, 100, 0],
          [0, 100, 0]];
    expect(polygon.area(poly)).to.be(10000);
    poly.reverse();
    expect(polygon.area(poly)).to.be(10000);
    poly = [
      [0, 0, 0],
      [100, 0, 0],
      [100, 0, 100],
      [0, 0, 100]
    ];
    expect(polygon.area(poly)).to.be(10000);
    poly.reverse();
    expect(polygon.area(poly)).to.be(10000);
  });

  it('should calculate polygon area using a normal (3d)', () => {
    let poly = [
          [0, 0, 0],
          [100, 0, 0],
          [100, 100, 0],
          [0, 100, 0]];
    expect(polygon.area(poly, [0,0,1])).to.be(10000);
    poly.reverse();
    expect(polygon.area(poly, [0,0,1])).to.be(-10000);
    poly = [
      [0, 0, 0],
      [100, 0, 0],
      [100, 0, 100],
      [0, 0, 100]
    ];
    expect(polygon.area(poly, [0, -1, 0])).to.be(10000);
    poly.reverse();
    expect(polygon.area(poly, [0, -1, 0])).to.be(-10000);
  });

  it('should calculate polygon centroid', () => {
    let a = [0, 0],
        b = [100, 0],
        c = [100, 100],
        d = [0, 100],
        cn = polygon.centroid([a, b, c, d]);
    expect(cn[0]).to.be(50);
    expect(cn[1]).to.be(50);
  });

  it('union', () => {
    let a = [[0, 0],
             [100, 0],
             [100, 100],
             [0, 100]],
        b = [[50, 50],
             [150, 50],
             [150, 150],
             [50, 150]];
    let result = polygon.union(a, b);
    try {
      render('union.png', result);
    } catch (e) {
      console.log('\n    NOTE: to render a visualization: npm i canvas\n');
    }
  });

  it('subtract', () => {
    let a = [[0, 0],
             [100, 0],
             [100, 100],
             [0, 100]],
        b = [[50, 50],
             [150, 50],
             [150, 150],
             [50, 150]];
    let result = polygon.subtract(a, b);
    expect(result.length).to.be(1);
    try {
      render('subtract.png', result);
    } catch (e) {
      console.log('\n    NOTE: to render a visualization: npm i canvas\n');
    }
  });

  it('intersection', () => {
    let a = [[0, 0],
             [100, 0],
             [100, 100],
             [0, 100]],
        b = [[50, 50],
             [150, 50],
             [150, 150],
             [50, 150]];
    let result = polygon.intersection(a, b);
    expect(result.length).to.be(1);
    try {
      render('intersection.png', result);
    } catch (e) {
      console.log('\n    NOTE: to render a visualization: npm i canvas\n');
    }
  });

  it('intersection noop', () => {
    let a = [[0, 0],
             [100, 0],
             [100, 100],
             [0, 100]],
        b = [[150, 50],
             [250, 50],
             [250, 150],
             [150, 150]];
    let result = polygon.intersection(a, b);
    expect(result.length).to.be(0);
  });

  it('triangulate', () => {
    console.time('\n    triangulation took');
    let result = polygon.triangulate(POLYGON, [HOLE, HOLE_2]);
    console.timeEnd('\n    triangulation took');
    console.log('\n')

    try {
      render('triangles.png', result);
    } catch (e) {
      console.log('\n    NOTE: to render a visualization: npm i canvas\n');
    }
  });
});
