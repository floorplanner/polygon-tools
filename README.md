## polygon-tools

Polygon tools.

![alt tag](https://content.screencast.com/users/TimKnip/folders/Jing/media/501cc1bd-f6ef-43bc-adf5-fc7d9b6ae4f9/2017-04-22_1525.png)

### install

    npm i @floorplanner/polygon-tools


### triangulation

```javascript

import {triangulate} from '@floorplanner/polygon-tools';

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
    return p.push(v[0], v[1]);
  }, []);
});

tris.forEach(triangle => {
  mask.beginFill(0xff0000);
  mask.drawPolygon(triangle);
});

sprite.mask = mask;

```
