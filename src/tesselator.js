import {GluTesselator, gluEnum, windingRule, primitiveType} from 'libtess';
import {is_ccw, is_cw} from './polygon';

export const {
  GL_LINE_LOOP,
  GL_TRIANGLES,
  GL_TRIANGLE_STRIP,
  GL_TRIANGLE_FAN
} = primitiveType;

export const {
  GLU_TESS_WINDING_ODD,
  GLU_TESS_WINDING_NONZERO,
  GLU_TESS_WINDING_POSITIVE,
  GLU_TESS_WINDING_NEGATIVE,
  GLU_TESS_WINDING_ABS_GEQ_TWO
} = windingRule;

export class Tesselator extends GluTesselator {

  constructor (vsize=2) {
    super();

    this._vsize = vsize;
    this._current = [];
    this._out = [];
    this._primitiveType = 0;

    this.gluTessCallback(gluEnum.GLU_TESS_VERTEX_DATA, this._vertex);
    this.gluTessCallback(gluEnum.GLU_TESS_BEGIN, this._begin);
    this.gluTessCallback(gluEnum.GLU_TESS_END, this._end);
    this.gluTessCallback(gluEnum.GLU_TESS_ERROR, this._error);
    this.gluTessCallback(gluEnum.GLU_TESS_COMBINE, this._combine);
    this.gluTessCallback(gluEnum.GLU_TESS_EDGE_FLAG, this._edge);
  }

  start (polygons, holes, auto_winding=true) {
    this._current = [];
    this._out = [];

    this.gluTessBeginPolygon();

    for (let poly of polygons) {
      if (auto_winding && is_cw(poly)) poly.reverse();
      this.gluTessBeginContour();
      for (let v of poly) {
        this.gluTessVertex(v, v);
      }
      this.gluTessEndContour();
    }

    for (let poly of holes) {
      if (auto_winding && is_ccw(poly)) poly.reverse();
      this.gluTessBeginContour();
      for (let v of poly) {
        this.gluTessVertex(v, v);
      }
      this.gluTessEndContour();
    }

    this.gluTessEndPolygon();
  }

  outlines (polygons, holes=[], auto_winding=true) {

    this.gluTessNormal(0, 0, 1);
    this.gluTessProperty(gluEnum.GLU_TESS_BOUNDARY_ONLY, true);
    this.gluTessProperty(gluEnum.GLU_TESS_WINDING_RULE, windingRule.GLU_TESS_WINDING_POSITIVE);

    this.start(polygons, holes, auto_winding);

    return this._out;
  }

  intersection (polygons, holes=[]) {

    this.gluTessNormal(0, 0, 1);
    this.gluTessProperty(gluEnum.GLU_TESS_BOUNDARY_ONLY, true);
    this.gluTessProperty(gluEnum.GLU_TESS_WINDING_RULE, windingRule.GLU_TESS_WINDING_ABS_GEQ_TWO);

    this.start(polygons, holes, false);

    return this._out;
  }

  triangles (polygons, holes=[], auto_winding=true) {

    this.gluTessNormal(0, 0, 1);
    this.gluTessProperty(gluEnum.GLU_TESS_WINDING_RULE, windingRule.GLU_TESS_WINDING_POSITIVE);

    this.start(polygons, holes, auto_winding);

    return this._out;
  }

  _begin (type) {
    this._primitiveType = type;
    this._current = [];
  }

  _end_fan () {
    let c = this._current.shift(),
        p1 = this._current.shift();
    while (this._current.length) {
      let p2 = this._current.shift();
      this._out.push(c, p1, p2);
      p1 = p2;
    }
  }

  _end_strip () {
    let p1 = this._current.shift(),
        p2 = this._current.shift();
    while (this._current.length) {
      let p3 = this._current.shift();
      this._out.push(p1, p2, p3);
      p1 = p2;
      p2 = p3;
    }
  }

  _end () {
    switch (this._primitiveType) {
      case GL_TRIANGLE_FAN:
        this._end_fan();
        break;
      case GL_TRIANGLE_STRIP:
        this._end_strip();
        break;
      case GL_TRIANGLES:
      case GL_LINE_LOOP:
      default:
        this._out.push(this._current);
        break;
    }
  }
  _vertex (v) {
    this._current.push(v);
  }
  _edge () {}
  _error (errno) { console.error('error number: ' + errno); }
  _combine (v, data, w) {
    let r = new Array(this._vsize);
    for (var i = 0; i < this._vsize; ++i) {
      r[i] = data[0][i] * w[0] + data[1][i] * w[1] + data[2][i] * w[2] + data[3][i] * w[3];
    }
    return r;
  }
}
