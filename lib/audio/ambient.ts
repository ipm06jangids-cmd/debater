"use client";

import { Howl } from "howler";

let ambient: Howl | null = null;

export function startAmbient() {
  if (ambient) return;
  ambient = new Howl({
    src: ["/audio/ambient-pad.mp3"],
    loop: true,
    volume: 0.18,
    html5: true,
  });
  ambient.play();
}

export function stopAmbient() {
  ambient?.stop();
  ambient?.unload();
  ambient = null;
}
