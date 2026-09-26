# API sketch

No server is used for Stage 3's prototype: the front end reads local JSON files, the same pattern as `data/catalog.json` in My XR Camp.

| Name | What it needs | What it returns |
| --- | --- | --- |
| `loadRoom(roomId)` | A room identifier | The room's data, with its `objectIds` resolved into full exhibit-object records |
| `loadExhibitObject(id)` | An object identifier | One exhibit object's full record |
| `getObjectsInRoom(roomId)` | A room identifier | An array of exhibit objects, in display order |
