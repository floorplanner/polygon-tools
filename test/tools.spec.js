import {ccw, length, normal, normalize, is_ccw, is_cw} from '../src/tools';
import expect from 'expect.js';

describe('tools', () => {

  it('ccw should be positive', () => {
    let a = [0, 0],
        b = [100, 0],
        c = [100, 100];
    expect(ccw(a, b, c)).to.be.above(0);
  });

  it('ccw should be negative', () => {
    let a = [0, 0],
        b = [100, 0],
        c = [100, 100];
    expect(ccw(c, b, a)).to.be.below(0);
  });

  it('ccw should be zero', () => {
    let a = [0, 0],
        b = [100, 0],
        c = [200, 0];
    expect(ccw(a, b, c)).to.be(0);
  });

  it('is_ccw should be true', () => {
    let a = [0, 0],
        b = [100, 0],
        c = [100, 100];
    expect(is_ccw([a, b, c])).to.be(true);
  });

  it('is_ccw should be false', () => {
    let a = [0, 0],
        b = [100, 0],
        c = [100, 100];
    expect(is_ccw([c, b, a])).to.be(false);
  });

  it('length should be 100', () => {
    expect(length([100,0])).to.be(100);
  });

  it('should normalize a vector', () => {
    let v = normalize([100, 0, 0]);
    expect(v[0]).to.be(1);
    expect(v[1]).to.be(0);
    expect(v[2]).to.be(0);
  });

  it('should calculate polygon normal', () => {
    let a = [0, 0],
        b = [100, 0],
        c = [200, 0],
        d = [200, 100],
        n = normal([a, b, d]);
    expect(n[0]).to.be(0);
    expect(n[1]).to.be(0);
    expect(n[2]).to.be(1);
  });
});
