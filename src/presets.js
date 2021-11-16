// Presets.js contains an object representing an array of presets that contain all the control values of the synth
export let presets = [
    {
        name: "default",
        settings: {
            baseTuning: 440,
            osc1Range: 0,
            osc2Range: 0,
            osc3Range: 0,
            osc2Detune: 0,
            osc3Detune: 0,
            osc1Wave: "sine",
            osc2Wave: "sine",
            osc3Wave: "sine",
            osc1Gain: 0.5,
            osc2Gain: 0.01,
            osc3Gain: 0.01,
            filterCutoff: 20000,
            filterGain: 0.01,
            filterQ: 0,
            filterEnv: [0, 1, 1, 0],
            volumeEnv: [0, 10, 1, 400],
            masterVolume: 0.5,
            masterReverb: 0.5,
        }
    }
];


