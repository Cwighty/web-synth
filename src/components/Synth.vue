<template>
  <body>
    <div class="container bg-dark text-light">
      <div class="row">
        <p>{{ preset.settings.osc1Wave }}</p>
      </div>
      <div class="row">
        <Rack />
      </div>
      <div class="row">
        <Keyboard />
      </div>
    </div>
  </body>
</template>

<script>
import store from "../state";
import Keyboard from "./Keyboard.vue";
import Rack from "./Rack.vue";
import { presets } from "../presets";
import { keys } from "../keys";

let audioContext = new (window.AudioContext || window.webkitAudioContext)();

function frequencyFromNoteNumber(note) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

function Voice(note, velocity) {
  let synthSettings = store.state.synthSettings;
  let now = audioContext.currentTime;

  this.masterVolume = new GainNode(audioContext);
  this.masterVolume.gain.linearRampToValueAtTime(synthSettings.masterVolume, now);
  // this.masterVolume.gain.linearRampToValueAtTime(0.5, 1);

  // Set up oscilators
  this.osc1 = audioContext.createOscillator();
  this.osc1.frequency.value = frequencyFromNoteNumber(note);
  this.osc1.type = synthSettings.osc1Wave;

  this.osc1Gain = new GainNode(audioContext);
  this.osc1Gain.gain.linearRampToValueAtTime(synthSettings.osc1Gain, now);
  this.osc1.connect(this.osc1Gain);

  this.osc2 = audioContext.createOscillator();
  this.osc2.frequency.value = frequencyFromNoteNumber(note);
  this.osc2.type = synthSettings.osc2Wave;

  this.osc2Gain = new GainNode(audioContext);
  this.osc2Gain.gain.linearRampToValueAtTime(synthSettings.osc2Gain, now);
  // this.osc2Gain.gain.value = 0.5;
  this.osc2.connect(this.osc2Gain);

  this.osc3 = audioContext.createOscillator();
  this.osc3.frequency.value = frequencyFromNoteNumber(note);
  this.osc3.type = synthSettings.osc3Wave;

  this.osc3Gain = new GainNode(audioContext);
  this.osc3Gain.gain.linearRampToValueAtTime(synthSettings.osc3Gain, now);
  // this.osc3Gain.gain.value = 0.5;
  this.osc3.connect(this.osc3Gain);

  this.filter1 = new BiquadFilterNode(audioContext);
  // this.filter1.frequency.value = synthSettings.filterCutoff;
  this.filter1.frequency.linearRampToValueAtTime(synthSettings.filterCutoff, now);
  this.filter1.Q.linearRampToValueAtTime(synthSettings.filterQ, now);
  this.filter1.type = "lowpass";
  this.filter1.gain.value = 0.5;//synthSettings.filterGain;

  this.osc1Gain.connect(this.filter1);
  this.osc2Gain.connect(this.filter1);
  this.osc3Gain.connect(this.filter1);

  this.volumeEnv = new GainNode(audioContext);
  this.filter1.connect(this.volumeEnv);


  //this.volumeEnv.gain.value = 0.01;
  //this.volumeEnv.gain.setValueAtTime( 0.0, now );
  this.volumeEnv.gain.linearRampToValueAtTime(1.0, 2);
  this.volumeEnv.gain.setTargetAtTime(0.99, 2, 1);

  this.volumeEnv.connect(this.masterVolume);
  this.masterVolume.connect(audioContext.destination);

  this.osc1.start(0);
  this.osc2.start(0);
  this.osc3.start(0);
}
Voice.prototype.noteOff = function () {
  var now = audioContext.currentTime;

  this.volumeEnv.gain.cancelScheduledValues(now);
  this.volumeEnv.gain.setValueAtTime(this.volumeEnv.gain.value, now);
  this.volumeEnv.gain.setTargetAtTime(0.0, now, 1);

  this.osc1.stop(now + 3);
  this.osc2.stop(now + 3);
  this.osc3.stop(now + 3);
};

export default {
  components: { Keyboard, Rack },
  name: "Synth",
  props: {
    msg: String,
  },
  data() {
    return {
      voices: [],
      preset: presets[0],
    };
  },
  computed: {},
  methods: {
    triggerOn(note, velocity) {
      this.voices[note] = new Voice(note, velocity);
    },
    triggerOff(note) {
      if (note != null) {
        this.voices[note].noteOff();
        this.voices[note] = null;
      }
    },
    keyDown(e) {
      let note = keys[e.keyCode];
      if (note) {
        this.triggerOn(note);
      }
    },
    keyUp(e) {
      let note = keys[e.keyCode];
      if (note) {
        this.triggerOff(note);
      }
    },
  },
  mounted() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    try {
      audioContext = new AudioContext();
    } catch (e) {
      alert("The Web Audio API is apparently not supported in this browser.");
    }

    window.addEventListener("keydown", this.keyDown, false);
    window.addEventListener("keyup", this.keyUp, false);
  },
};
</script>
