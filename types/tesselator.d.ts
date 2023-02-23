/**
 * Runs the tesselator
 * @see http://www.glprogramming.com/red/chapter11.html
 *
 * @param {TesselatorOptions} [options=TesselatorOptions] Options
 *
 * @returns {Array}
 */
export function run(options?: TesselatorOptions): any[];
export const GL_LINE_LOOP: any;
export const GL_TRIANGLES: any;
export const GL_TRIANGLE_STRIP: any;
export const GL_TRIANGLE_FAN: any;
export const GLU_TESS_WINDING_ODD: any;
export const GLU_TESS_WINDING_NONZERO: any;
export const GLU_TESS_WINDING_POSITIVE: any;
export const GLU_TESS_WINDING_NEGATIVE: any;
export const GLU_TESS_WINDING_ABS_GEQ_TWO: any;
export namespace DEFAULT_OPTIONS {
    export const polygons: any[];
    export const holes: any[];
    export { GLU_TESS_WINDING_POSITIVE as windingRule };
    export const boundaryOnly: boolean;
    export const normal: any;
    export const autoWinding: boolean;
}
export class Tesselator {
    constructor(vsize?: number);
    _vsize: number;
    _current: any[];
    _out: any[];
    _primitiveType: number;
    start(polygons: any, holes: any): void;
    run(options?: {
        polygons: any[];
        holes: any[];
        windingRule: any;
        boundaryOnly: boolean;
        normal: any;
        autoWinding: boolean;
    }): any[];
    _begin(type: any): void;
    _end_fan(): void;
    _end_strip(): void;
    _end(): void;
    _vertex(v: any): void;
    _edge(): void;
    _error(errno: any): void;
    _combine(v: any, data: any, w: any): any[];
}
/**
 * Tesselator options.
 */
export type TesselatorOptions = {
    /**
     * Array of polygons
     */
    polygons?: any[];
    /**
     * Array of holes
     */
    holes?: any[];
    /**
     * Vertex size to use
     */
    vertexSize?: number;
    /**
     * Winding rule
     */
    windingRule?: number;
    /**
     * Whether to output boundaries only
     */
    boundaryOnly?: boolean;
    /**
     * Normal
     */
    normal?: any[];
    /**
     * Whether to automatically set the correct winding on polygons
     */
    autoWinding?: boolean;
};
