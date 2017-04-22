## polygon-tools

Polygon tools.

![alt tag](https://content.screencast.com/users/TimKnip/folders/Jing/media/501cc1bd-f6ef-43bc-adf5-fc7d9b6ae4f9/2017-04-22_1525.png)

### triangulation

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

### use with PIXI

Assuming we have the triangles and a texture:

```javascript

let sprite = new PIXI.Sprite(texture);
let mask = new PIXI.Graphics();

// create paths
let tris = triangles.map(tri => {
  return tri.reduce((p, v) => {
    return p.concat([v.x, v.y]);
  }, []);
});

tris.forEach(triangle => {
  mask.beginFill(0xff0000);
  mask.drawPolygon(triangle);
});

sprite.mask = mask;

```

### TODO

-  use points like ```[0, 0]``` instead of ```{x:0, y:0}```
