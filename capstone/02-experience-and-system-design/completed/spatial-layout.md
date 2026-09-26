# Spatial layout

## Starting viewpoint

The visitor starts facing the centre of the room, at a height and distance that shows all three exhibited objects at once, without needing to turn immediately.

## Floor plan (ASCII, top-down)

```
        [north wall]
   +-------------------+
   |                   |
   |   (pot)  (basket)  |
   |                   |
   |      (jade)        |
   |                   |
   +---------[visitor start, facing north]
```

## Distances and sightlines

| From | To | Approximate distance | Can they see it from the start? |
| --- | --- | --- | --- |
| Visitor start | Clay pot | 3 m | Yes |
| Visitor start | Woven basket | 3.5 m | Yes |
| Visitor start | Jade stone | 4 m | Yes, at a smaller apparent size |

## Interaction equivalents

| Interaction | Pointer/touch version | Keyboard or button version |
| --- | --- | --- |
| Look around | Drag the view | "Turn left" / "Turn right" buttons; arrow keys once the scene is focused |
| Select an object | Click or tap it in the 3D view | A "Select: [object name]" button, one per object |
| Pause the turning jade stone | (none — it turns on its own until paused) | "Pause animation" button, `aria-pressed` |
