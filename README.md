## polygon-tools

Polygon tools.

![alt tag](https://content.screencast.com/users/TimKnip/folders/Jing/media/501cc1bd-f6ef-43bc-adf5-fc7d9b6ae4f9/2017-04-22_1525.png)

### install

    npm i polygon-tools

### polygon

Summary of polygon methods:

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

### use with PIXI

Assuming we have the triangles and a texture:

```javascript

let sprite = new PIXI.Sprite(texture);
let mask = new PIXI.Graphics();

// create paths
let tris = triangles.map(tri => {
  return tri.reduce((p, v) => {
    return p.push(v[0], v[1]);
  }, []);
});

tris.forEach(triangle => {
  mask.beginFill(0xff0000);
  mask.drawPolygon(triangle);
});

sprite.mask = mask;

```
