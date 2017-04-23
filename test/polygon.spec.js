import * as polygon from '../src/polygon';
import expect from 'expect.js';

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

  it('should calculate polygon centroid', () => {
    let a = [0, 0],
        b = [100, 0],
        c = [100, 100],
        d = [0, 100],
        cn = polygon.centroid([a, b, c, d]);
    expect(cn[0]).to.be(50);
    expect(cn[1]).to.be(50);
  });
});
