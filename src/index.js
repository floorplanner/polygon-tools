import * as tess from './tesselator';
import * as p from './polygon';

export var polygon = p;
export var tesselator = tess;

if (window !== undefined) {
  window.PolygonTools = {
    polygon: p,
    tesselator: tess,
    version: window.polygon_tools_version || '',
    build: window.polygon_tools_rev || ''
  };
}
