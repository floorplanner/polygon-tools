import expect from 'expect.js';
import * as vec from '../src/vec';

describe('vec', () => {

  it('should add 2 vectors', () => {
    let a = [0, 0],
        b = [100, 0],
        c = vec.add(a, b);
    expect(c[0]).to.be(100);
  });

  it('should subtract 2 vectors', () => {
    let a = [0, 0],
        b = [100, 0],
        c = vec.sub(a, b);
    expect(c[0]).to.be(-100);
  });

  it('should normalize a vector', () => {
    let a = [100, 0],
        n = vec.normalize(a);
    expect(n[0]).to.be(1);
  });

  it('should get length of a vector', () => {
    let a = [100, 0],
        n = vec.length(a);
    expect(n).to.be(100);
  });

  it('should compute cross product', () => {
    let a = [0, -100],
        b = [100, 0],
        c = vec.normalize(vec.cross(a, b));
    expect(c[0]).to.be(0);
    expect(c[1]).to.be(0);
    expect(c[2]).to.be(1);
  });
});
