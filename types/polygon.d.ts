export function ccw(a: any, b: any, c: any): number;
/**
 * Polygon normal (2d / 3d)
 *
 * @param {Array} pts Points of the polygon
 * @param {Boolean} [forceNewell=false] Whether to force Newell's method
 *
 * @return {Array} Polygon normal or null if the polygon is degenerate
 */
export function normal(pts: any[], forceNewell?: boolean): any[];
/**
 * Signed area of a polygon.
 * For 3d polygons a signed area can only be computed when the optional
 * polygon normal ```n``` is passed in.
 * @see http://stackoverflow.com/questions/12642256/python-find-area-of-polygon-from-xyz-coordinates
 *
 * @param {Array} pts Polygon points
 * @param {Array} [n=null] Optional polygon normal, needed to compute the signed area for 3d polygons
 *
 * @return {Number}
 */
export function area(pts: any[], n?: any[]): number;
/**
 * Polygon centroid (2d)
 *
 * @param {Array} pts
 *
 * @return {Array}
 */
export function centroid(pts: any[]): any[];
/**
 * Tests wether the polygon winding is counter clockwise
 *
 * @param {Array} pts
 * @param {Array} [n=null] Optional polygon normal, needed for 3d polygons
 *
 * @return {Boolean}
 */
export function is_ccw(pts: any[], n?: any[]): boolean;
/**
 * Tests wether the polygon winding is clockwise
 *
 * @param {Array} pts
 * @param {Array} [n=null] Optional polygon normal, needed for 3d polygons
 *
 * @return {Boolean}
 */
export function is_cw(pts: any[], n?: any[]): boolean;
/**
 * Polygon winding (2d only)
 *
 * @param {Array} pts
 * @param {Array} [n=null] Optional polygon normal, needed for 3d polygons
 *
 * @return {Number}
 */
export function winding(pts: any[], n?: any[]): number;
/**
 * Polygon bounds.
 * @typedef {Object} PolygonBounds
 * @property {Number} xMin
 * @property {Number} yMin
 * @property {Number} xMax
 * @property {Number} yMax
 */
/**
 * Polygon bounds
 *
 * @param {Array} pts
 *
 * @return {PolygonBounds}
 */
export function bounds(pts: any[]): PolygonBounds;
/**
 * Ensures CW winding
 *
 * @param {Array} pts
 * @param {Array} [n=null] Optional polygon normal, needed for 3d polygons
 *
 * @return {Array}
 */
export function ensure_cw(pts: any[], n?: any[]): any[];
/**
 * Ensures CCW winding
 *
 * @param {Array} pts
 * @param {Array} [n=null] Optional polygon normal, needed for 3d polygons
 *
 * @return {Array}
 */
export function ensure_ccw(pts: any[], n?: any[]): any[];
/**
 * Triangulates a polygon
 *
 * @param {Array} polygon
 * @param {Array.<Array>} holes
 *
 * @return triangles
 */
export function triangulate(polygon: any[], holes: Array<any[]>): any;
/**
 * Subtract polygons
 *
 * @param {Array} polygons
 *
 * @return {Array}
 */
export function subtract(...polygons: any[]): any[];
/**
 * Union of a set of polygons
 *
 * @param {Array} polygons
 *
 * @return {Array}
 */
export function union(...polygons: any[]): any[];
/**
 * Intersection of a set of polygons
 *
 * @param {Array} a First polygon
 * @param {Array} b Second polygon
 *
 * @return {Array}
 */
export function intersection(a: any[], b: any[]): any[];
export const WINDING_UNKNOWN: 0;
export const WINDING_CCW: 1;
export const WINDING_CW: 2;
/**
 * Polygon bounds.
 */
export type PolygonBounds = {
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
};
