// audio.js: the exhibit's spatial audio layer. Each pedestal gets its own
// short, quiet, looping sound, generated procedurally (see
// assets/pedestal-*.wav and the README's "Media optimisation" section: no
// recording equipment or licensed sound library was needed to make them).
// Playing them back with THREE.PositionalAudio, instead of an ordinary
// THREE.Audio, means their volume changes as you move around the exhibit,
// exactly the way a real audio guide, or a person's own two ears, would
// hear three different objects at three different distances.

import * as THREE from 'three';

const SOUND_FILES = {
  'clay-pot': '../assets/pedestal-clay.wav',
  'basket-ring': '../assets/pedestal-basket.wav',
  'jade-stone': '../assets/pedestal-jade.wav',
};

// TODO 1 and TODO 2: build one PositionalAudio per pedestal, and give each
// one the distance settings that decide how its volume falls off.
//
// setRefDistance(1.2): the distance (in this scene's own units, metres) at
// which the sound plays at its recorded volume.
// setRolloffFactor(1.5): how quickly it fades once you are further than
// that.
// setMaxDistance(10): how far the distance calculation is clamped.
// (All three verified directly against three.js r186's own source,
// src/audio/PositionalAudio.js.)
// setDistanceModel('inverse'): the Web Audio API's own default distance
// model (verified on MDN's PannerNode reference), which this lesson lets
// you compare live against 'linear' and 'exponential' with the select box
// in main.js.
//
// TODO 2: making each sound a child of its own pedestal's mesh, with
// mesh.add(sound), is what actually connects a sound to a position.
// THREE.Audio and its subclasses are Object3D instances: every frame,
// three.js reads a PositionalAudio's world position straight from its
// parent's matrixWorld (renderer.render() updates it automatically) and
// passes that to the underlying PannerNode, exactly the way a light or a
// camera inherits its parent's transform.
export function attachPedestalSounds(listener, items) {
  const loader = new THREE.AudioLoader();

  const entries = items.map((item) => {
    const sound = new THREE.PositionalAudio(listener);
    item.mesh.add(sound);
    return { id: item.data.id, sound };
  });

  // ready resolves once every sound has a decoded buffer, so main.js can
  // wait for it before enabling the "Start pedestal sounds" button: a click
  // before decoding finishes would otherwise call play() on a sound with no
  // buffer yet, and nothing would be heard.
  const ready = Promise.all(entries.map(({ id, sound }) => new Promise((resolve, reject) => {
    loader.load(
      SOUND_FILES[id],
      (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.6);
        sound.setRefDistance(1.2);
        sound.setRolloffFactor(1.5);
        sound.setMaxDistance(10);
        sound.setDistanceModel('inverse');
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

// play() and pause() are only safe to call once a buffer has been set
// (pedestalAudio.ready has resolved); main.js only enables the button that
// calls these once that promise resolves.
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
