// audio.js: the exhibit's spatial audio layer. Each pedestal gets its own
// short, quiet, looping sound, generated procedurally (see
// assets/pedestal-*.wav). Playing them back with THREE.PositionalAudio,
// instead of an ordinary THREE.Audio, means their volume changes as you
// move around the exhibit, exactly the way a real audio guide, or a
// person's own two ears, would hear three different objects at three
// different distances.

import * as THREE from 'three';

const SOUND_FILES = {
  'clay-pot': '../assets/pedestal-clay.wav',
  'basket-ring': '../assets/pedestal-basket.wav',
  'jade-stone': '../assets/pedestal-jade.wav',
};

export function attachPedestalSounds(listener, items) {
  const loader = new THREE.AudioLoader();

  const entries = items.map((item) => {
    const sound = new THREE.PositionalAudio(listener);

    // TODO 2: make this sound a child of its own pedestal's mesh, with
    // `item.mesh.add(sound)`. THREE.Audio and its subclasses are Object3D
    // instances: every frame, three.js reads a PositionalAudio's world
    // position straight from its parent's matrixWorld and passes that to
    // the underlying PannerNode, exactly the way a light or a camera
    // inherits its parent's transform. Without this line, every sound stays
    // at the scene's origin instead of at its own pedestal.

    return { id: item.data.id, sound };
  });

  const ready = Promise.all(entries.map(({ id, sound }) => new Promise((resolve, reject) => {
    loader.load(
      SOUND_FILES[id],
      (buffer) => {
        // TODO 1: configure this sound from the loaded buffer.
        // sound.setBuffer(buffer);
        // sound.setLoop(true);
        // sound.setVolume(0.6);
        // sound.setRefDistance(1.2);    -- the distance (metres) at which it plays at full recorded volume
        // sound.setRolloffFactor(1.5);  -- how quickly it fades beyond that
        // sound.setMaxDistance(10);     -- how far the distance calculation is clamped
        // sound.setDistanceModel('inverse'); -- the Web Audio API's own default distance model
        // (All verified directly against three.js r186's own source,
        // src/audio/PositionalAudio.js, and MDN's PannerNode reference.)
        // Call resolve() last, once every setter above has run.
        resolve();
      },
      undefined,
      reject,
    );
  })));

  return { entries, ready };
}

export function setDistanceModel(pedestalAudio, model) {
  for (const { sound } of pedestalAudio.entries) sound.setDistanceModel(model);
}

export function playAll(pedestalAudio) {
  for (const { sound } of pedestalAudio.entries) {
    if (sound.buffer && !sound.isPlaying) sound.play();
  }
}

export function pauseAll(pedestalAudio) {
  for (const { sound } of pedestalAudio.entries) {
    if (sound.isPlaying) sound.pause();
  }
}

export function isAnyPlaying(pedestalAudio) {
  return pedestalAudio.entries.some(({ sound }) => sound.isPlaying);
}
