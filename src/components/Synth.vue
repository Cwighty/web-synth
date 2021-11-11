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
import Keyboard from "./Keyboard.vue";
import Rack from "./Rack.vue";
import { presets } from "../presets";
import {keys} from '../keys';

let audioContext = new (window.AudioContext || window.webkitAudioContext)();

function frequencyFromNoteNumber( note ) {
	return 440 * Math.pow(2,(note-69)/12);
}

function Voice(note, velocity) {
  this.osc1 = audioContext.createOscillator();
  this.osc1.frequency.value = frequencyFromNoteNumber(note);

  this.osc1Gain = new GainNode(audioContext);
  this.osc1Gain.gain.value = 0.5;
  this.osc1.connect(this.osc1Gain);
  this.osc1Gain.connect(audioContext.destination);

  this.osc2 = audioContext.createOscillator();
  this.osc2.frequency.value = frequencyFromNoteNumber(note);

  this.osc2Gain = new GainNode(audioContext);
  this.osc2Gain.gain.value = 0.5;
  this.osc2.connect(this.osc2Gain);
  this.osc2Gain.connect(audioContext.destination);

  this.osc1.start(0);
  this.osc2.start(0);
}
Voice.prototype.noteOff = function() {
	var now =  audioContext.currentTime;
	this.osc1.stop(0);
  this.osc2.stop(0);
}

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
      this.voices[note]= new Voice(note, velocity);
    },
    triggerOff(note)
    {
      if (note != null)
      {
        this.voices[note].noteOff();
        this.voices[note] = null;
      }
    },
    keyDown(e){
      let note = keys[e.keyCode];
      if (note){
        this.triggerOn(note);
      }
    },
    keyUp(e){
      let note = keys[e.keyCode];
      if (note){
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

    window.addEventListener('keydown', this.keyDown, false);
    window.addEventListener('keyup', this.keyUp, false);

  },
};
</script>
