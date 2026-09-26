# Scene graph

```text
Scene
├── Lighting rig
│   ├── Ambient light
│   └── Directional light
├── Room shell (floor, walls)
├── Exhibit stand: clay pot
│   └── Clay pot mesh
├── Exhibit stand: woven basket ring
│   └── Basket mesh
├── Exhibit stand: jade stone
│   └── Jade stone mesh (rotates on its own axis)
└── Camera rig (visitor viewpoint)
```

## Entity notes

| Entity | Parent | Purpose |
| --- | --- | --- |
| Room shell | Scene | Floor and walls; gives the space visible bounds |
| Exhibit stand: clay pot | Scene | Groups the stand and its object so both move together if repositioned |
| Jade stone mesh | Exhibit stand: jade stone | The only entity with its own animation; rotating the stand would also rotate a label, so the mesh alone spins |
| Camera rig | Scene | Fixed starting position; only rotates in response to the visitor's input |
