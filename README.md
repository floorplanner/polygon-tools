### polygon-tools

Polygon tools.

## triangulation

```javascript

import {triangulate} from '@floorplanner/polygon-tools';

const POLYGON = [
  {x: 0, y: 0},
  {x: 100, y: 0},
  {x: 100, y: 100},
  {x: 0, y: 100}
];

const HOLE = [
  {x: 30, y: 30},
  {x: 30, y: 70},
  {x: 70, y: 70},
  {x: 70, y: 30}
];

// returns an array of triangles
let triangles = triangulate(POLYGON, [HOLE]);

```
