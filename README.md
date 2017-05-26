## polygon-tools

Polygon tools.

![alt tag](https://content.screencast.com/users/TimKnip/folders/Jing/media/501cc1bd-f6ef-43bc-adf5-fc7d9b6ae4f9/2017-04-22_1525.png)

### install

    npm i polygon-tools

## browser

The minified code is availabe through S3:

    https://fpcdn.s3.amazonaws.com/apps/polygon-tools/0.4.3/polygon-tools.min.js

### build

Build minified javascript for use in browser:

    npm run build

The library is exposed as ```PolygonTools```.

```javascript

var polygon = [
  [0, 0],
  [100, 0],
  [100, 100],
  [0, 100]
];

var area = PolygonTools.polygon.area(polygon);

```

### documentation

Documentation is available [here](https://floorplanner.github.io/polygon-tools/).

### examples

-  [Union](https://jsfiddle.net/timknip/2tjkuvvj/)
-  [Subtract](https://jsfiddle.net/timknip/jz7do1fy/)
-  [Intersection](https://jsfiddle.net/timknip/fqh3d0t1/)
-  [Triangulate](https://jsfiddle.net/timknip/hs2adah7/)
-  [Tesselator](https://jsfiddle.net/timknip/4Lv0wd3q/)
-  [Polygon Winding](https://jsfiddle.net/timknip/yuqa3o40/)

### polygon

Summary of polygon methods:

-  ```area(pts)```
-  ```normal(pts)```
-  ```centroid(pts)```
-  ```winding(pts)```
-  ```is_cw(pts)```
-  ```is_ccw(pts)```

```javascript

import {polygon} from 'polygon-tools';

const POLYGON = [
  [0, 0],
  [100, 0],
  [100, 100],
  [0, 100]
];

// Signed area - 2D only
let area = polygon.area(POLYGON);

// Polygon normal - both 2D and 3D polygons
let normal = polygon.normal(POLYGON);

// Polygon centroid - 2D only
let centroid = polygon.centroid(POLYGON);

// Polygon winding - 2D only
let winding = polygon.winding(POLYGON);
// result is one of:
const {WINDING_CW, WINDING_CCW, WINDING_UNKNOWN} = polygon;

// test for WINDING_CW
polygon.is_cw(POLYGON);

// test for WINDING_CCW
polygon.is_ccw(POLYGON);

```

### boolean operations

-  ```union (...polygons)```
-  ```subtract (...polygons)```
-  ```intersection (a, b)```

```javascript

import {polygon} from 'polygon-tools';

const POLY_A = [
  [0, 0],
  [100, 0],
  [100, 100],
  [0, 100]
];

const POLY_B = [
  [50, 50],
  [150, 50],
  [150, 150],
  [50, 150]
];

// union(polyA, polyB, polyN, ...)
let union = polygon.union(POLY_A, POLY_B);

// subtract(polyA, polyB, polyN, ...)
// NOTE: poly B..N are subtracted from A
let subtract = polygon.subtract(POLY_A, POLY_B);

// intersection(polyA, polyB)
let intersection = polygon.intersection(POLY_A, POLY_B);
```

### triangulation

-  ```triangulate(polygon, holes)```

```javascript

import {polygon} from 'polygon-tools';

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

// returns an array of triangles
let triangles = polygon.triangulate(POLYGON, [HOLE]);

```

### using the tesselator

Instead of the convenience methods above, the tesselator
can also be used directly. Different vertex sizes can be used so vertex
attributes like UVs and normals are correctly interpolated.

```javascript

import {tesselator} from 'polygon-tools';

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

let options = {
  polygons: [POLYGON],
  holes: [HOLE],
  vertexSize: 2,
  windingRule: tesselator.GLU_TESS_WINDING_POSITIVE,
  boundaryOnly: false,
  normal: null,
  autoWinding: true
};

let triangles = tesselator.run(options);

```

### use with PIXI

Suppose we want a textured polygon with holes. In such cases we cannot
use ```polygon.subtract``` because any interior hole is returned as another
polygon. To create polygons with holes we need use triangulation.

Assuming we have the triangles (see above) and some texture:

```javascript

let sprite = new PIXI.Sprite(texture);
let mask = new PIXI.Graphics();

// create paths
let paths = triangles.map(tri => {
  return tri.reduce((p, v) => {
    return p.push(v[0], v[1]);
  }, []);
});

paths.forEach(path => {
  mask.beginFill(0xff0000);
  mask.drawPolygon(path);
});

sprite.mask = mask;
sprite.addChild(mask);

```
