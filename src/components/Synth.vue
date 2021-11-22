<!--Syhtn.vue is the highest level synth component containing all the audio logic for the synth as well.-->
<template> 
    <div class="grid  grid-cols-5 bg-gray-800 text-white">
      <div class="col-span-5">
        <h1>WEB SYNTH</h1>
      </div>
      <div class="col-span-5">
        <Rack v-on:audioReset="resetAudio()" />
      </div>
      <div class="col-span-5">
        <Keyboard v-on:keyTouch="console.log($event)" />
      </div>
    </div>
</template>

<script>
import store from "../state";
import Keyboard from "./Keyboard.vue";
import Rack from "./Rack.vue";
import { presets } from "../presets";
import { keys } from "../keys";

//let audioContext = new (window.AudioContext || window.webkitAudioContext)();

function frequencyFromNoteNumber(note, range) {
  // Calculates a oscillator frequency based on midi note number and octave range
  let baseTuning = store.state.synthSettings.baseTuning;
  let freq = baseTuning * Math.pow(2.0, (note - 69) / 12) * Math.pow(2, range);
  console.log(freq);
  return freq;
}

function Voice(note, velocity, audioContext, outputNode) {
  // A voice is created for each note that is played (polyphony)
  // Each voice consists of the whole audio path from the oscillators, through filters, envelopes, etc...
  // This is the main audio path logic
  this.audioContext = audioContext;
  let now = audioContext.currentTime;
  let synthSettings = store.state.synthSettings;

  // Set up oscilators
  this.osc1 = audioContext.createOscillator();
  this.osc1.frequency.value = frequencyFromNoteNumber(
    note,
    synthSettings.osc1Range
  );
  this.osc1.type = synthSettings.osc1Wave;

  this.osc1Gain = new GainNode(audioContext);
  this.osc1Gain.gain.linearRampToValueAtTime(synthSettings.osc1Gain, now);
  this.osc1.connect(this.osc1Gain);

  this.osc2 = audioContext.createOscillator();
  this.osc2.frequency.value = frequencyFromNoteNumber(
    note,
    synthSettings.osc2Range
  );
  this.osc2.type = synthSettings.osc2Wave;
  this.osc2.detune.value = synthSettings.osc2Detune;

  this.osc2Gain = new GainNode(audioContext);
  this.osc2Gain.gain.linearRampToValueAtTime(synthSettings.osc2Gain, now);
  this.osc2.connect(this.osc2Gain);

  this.osc3 = audioContext.createOscillator();
  this.osc3.frequency.value = frequencyFromNoteNumber(
    note,
    synthSettings.osc3Range
  );
  this.osc3.type = synthSettings.osc3Wave;
  this.osc3.detune.value = synthSettings.osc3Detune;

  this.osc3Gain = new GainNode(audioContext);
  this.osc3Gain.gain.linearRampToValueAtTime(synthSettings.osc3Gain, now);
  this.osc3.connect(this.osc3Gain);

  // Set up filters
  this.filter1 = new BiquadFilterNode(audioContext);
  this.filter1.frequency.linearRampToValueAtTime(
    synthSettings.filterCutoff,
    now
  );
  this.filter1.Q.linearRampToValueAtTime(synthSettings.filterQ, now);
  this.filter1.type = "lowpass";
  this.filter1.gain.value = 0.5; //synthSettings.filterGain;

  // Route oscillators through the filter
  this.osc1Gain.connect(this.filter1);
  this.osc2Gain.connect(this.filter1);
  this.osc3Gain.connect(this.filter1);

  // Envelope Controls and Routing
  this.volumeEnv = new GainNode(audioContext);
  this.filter1.connect(this.volumeEnv);
  let attack = synthSettings.volumeEnv[0] / 1000;
  let decay = synthSettings.volumeEnv[1] / 1000;
  let sustain = synthSettings.volumeEnv[2];
  let release = synthSettings.volumeEnv[3] / 1000;

  this.volumeEnv.gain.cancelScheduledValues(now);
  this.volumeEnv.gain.setValueAtTime(0.0, now);
  this.volumeEnv.gain.linearRampToValueAtTime(1.0, now + attack);
  this.volumeEnv.gain.linearRampToValueAtTime(sustain, now + attack + decay);
  this.volumeEnv.gain.linearRampToValueAtTime(
    0,
    now + attack + decay + release
  );

  this.volumeEnv.connect(outputNode);

  // Start the oscillators
  this.osc1.start(0);
  this.osc2.start(0);
  this.osc3.start(0);
}
Voice.prototype.noteOff = function () {
  // Note off triggers when a key is lifted, it starts the release of each voice
  // and stops the oscillators for that voice
  var now = this.audioContext.currentTime;
  let synthSettings = store.state.synthSettings;

  this.volumeEnv.gain.cancelScheduledValues(now);
  this.volumeEnv.gain.linearRampToValueAtTime(
    0,
    now + synthSettings.volumeEnv[3] / 1000
  );

  this.osc1.stop(now + synthSettings.volumeEnv[3]);
  this.osc2.stop(now + synthSettings.volumeEnv[3]);
  this.osc3.stop(now + synthSettings.volumeEnv[3]);
};

export default {
  components: { Keyboard, Rack },
  name: "Synth",
  props: {
    msg: String,
  },
  data() {
    return {
      audioContext: null,
      masterChainNode: null,
      voices: [],
      preset: presets[0],
    };
  },
  computed: {},
  methods: {
    triggerOn(note, velocity) {
      // Method for starting a new voice and adding it to the array of current voices
      this.voices[note] = new Voice(
        note,
        velocity,
        this.audioContext,
        this.masterChainNode
      );
    },
    triggerOff(note) {
      // Triggers on the release of a note, cleans up the voice and deletes it from the current voices
      if (note != null) {
        this.voices[note].noteOff();
        delete this.voices[note];
      }
    },
    resetAudio() {
      for (var i = 0; i < 255; i++) {
        if (this.voices[i] != null) {
          console.log("reseting");
          this.voices[note].osc1.stop(now);
          this.voices[note].osc2.stop(now);
          this.voices[note].osc3.stop(now);
        }
      }
      delete this.voices;
    },
    keyDown(e) {
      // Triggers a new voice based on keyboard stroke
      if (e.repeat) {
        return;
      }
      let note = keys[e.keyCode];
      if (note) {
        this.triggerOn(note);
      }
    },
    keyUp(e) {
      // Triggers off a voice based on keyboard stroke
      let note = keys[e.keyCode];
      if (note) {
        this.triggerOff(note);
      }
    },
    stateSubscribe(mutation, state) {
      // This method is called for every change to the synth state
      // Used to update voices with new synth values
      let value = mutation.payload.target.value;
      if (mutation.type == "updateMasterVolume") {
        console.log(value);
        this.masterVolume.gain.value = value;
      }
      if (mutation.type == "updateDetune2") {
        for (var i = 0; i < 255; i++) {
          if (this.voices[i] != null) {
            console.log(this.voices[i]);
            this.voices[i].osc2.detune.value = value;
          }
        }
      }
      if (mutation.type == "updateDetune3") {
        for (var i = 0; i < 255; i++) {
          if (this.voices[i] != null) {
            console.log(this.voices[i]);
            this.voices[i].osc3.detune.value = value;
          }
        }
      }
      if (mutation.type == "updateOscMix1") {
        for (var i = 0; i < 255; i++) {
          if (this.voices[i] != null) {
            console.log(this.voices[i]);
            this.voices[i].osc1Gain.gain.value = value;
          }
        }
      }
      if (mutation.type == "updateOscMix2") {
        for (var i = 0; i < 255; i++) {
          if (this.voices[i] != null) {
            console.log(this.voices[i]);
            this.voices[i].osc2Gain.gain.value = value;
          }
        }
      }
      if (mutation.type == "updateOscMix3") {
        for (var i = 0; i < 255; i++) {
          if (this.voices[i] != null) {
            console.log(this.voices[i]);
            this.voices[i].osc3Gain.gain.value = value;
          }
        }
      }
      if (mutation.type == "updateCutoff") {
        for (var i = 0; i < 255; i++) {
          if (this.voices[i] != null) {
            console.log(this.voices[i]);
            this.voices[i].filter1.frequency.value = value;
          }
        }
      }
      if (mutation.type == "updateEmphasis") {
        for (var i = 0; i < 255; i++) {
          if (this.voices[i] != null) {
            console.log(this.voices[i]);
            this.voices[i].filter1.gain.value = value;
          }
        }
      }
      if (mutation.type == "updateQ") {
        for (var i = 0; i < 255; i++) {
          if (this.voices[i] != null) {
            console.log(this.voices[i]);
            this.voices[i].filter1.Q.value = value;
          }
        }
      }
      if (mutation.type == "updateFilterA") {
        for (var i = 0; i < 255; i++) {
          if (this.voices[i] != null) {
            console.log(this.voices[i]);
            //this.voices[i].filter1.Q.value = value;
          }
        }
      }
      if (mutation.type == "updateFilterD") {
        for (var i = 0; i < 255; i++) {
          if (this.voices[i] != null) {
            console.log(this.voices[i]);
            //this.voices[i].filter1.Q.value = value;
          }
        }
      }
      if (mutation.type == "updateFilterS") {
        for (var i = 0; i < 255; i++) {
          if (this.voices[i] != null) {
            console.log(this.voices[i]);
            //this.voices[i].filter1.Q.value = value;
          }
        }
      }
      if (mutation.type == "updateFilterR") {
        for (var i = 0; i < 255; i++) {
          if (this.voices[i] != null) {
            console.log(this.voices[i]);
            //this.voices[i].filter1.Q.value = value;
          }
        }
      }
      if (mutation.type == "updateEnvA") {
        for (var i = 0; i < 255; i++) {
          if (this.voices[i] != null) {
            console.log(this.voices[i]);
            //this.voices[i].filter1.Q.value = value;
          }
        }
      }
      if (mutation.type == "updateEnvD") {
        for (var i = 0; i < 255; i++) {
          if (this.voices[i] != null) {
            console.log(this.voices[i]);
            //this.voices[i].filter1.Q.value = value;
          }
        }
      }
      if (mutation.type == "updateEnvS") {
        for (var i = 0; i < 255; i++) {
          if (this.voices[i] != null) {
            console.log(this.voices[i]);
            //this.voices[i].filter1.Q.value = value;
          }
        }
      }
      if (mutation.type == "updateEnvR") {
        for (var i = 0; i < 255; i++) {
          if (this.voices[i] != null) {
            console.log(this.voices[i]);
            //this.voices[i].filter1.Q.value = value;
          }
        }
      }
      if (mutation.type == "updateReverbMix")
      {
        console.log(value);
        this.reverbMix.gain.value = value;
      }
      if (mutation.type == "updateCompThreshold")
      {
        console.log(value);
        this.compressor.threshold.value = value;
      }
      if (mutation.type == "updateCompKnee")
      {
        console.log(value);
        this.compressor.knee.value = value;
      }
      if (mutation.type == "updateCompRatio")
      {
        console.log(value);
        this.compressor.ratio.value = value;
      }
      if (mutation.type == "updateCompAttack")
      {
        console.log(value);
        this.compressor.attack.value = value;
      }
      if (mutation.type == "updateCompRelease")
      {
        console.log(value);
        this.compressor.release.value = value;
      }
    },
  },
  async mounted() {
    // Inital set up on app mount
    this.audioContext = window.AudioContext || window.webkitAudioContext;
    try {
      this.audioContext = new AudioContext();
    } catch (e) {
      alert("The Web Audio API is apparently not supported in this browser.");
    }

    window.addEventListener("keydown", this.keyDown, false);
    window.addEventListener("keyup", this.keyUp, false);

    store.subscribe((mutation, state) => {
      this.stateSubscribe(mutation, state);
    });

    let synthSettings = store.state.synthSettings;

    // Set up Master chain
    this.masterVolume = new GainNode(this.audioContext);
    this.masterVolume.gain.value = synthSettings.masterVolume;
    this.masterVolume.connect(this.audioContext.destination);

    // Reverb
    this.reverbMix = new GainNode(this.audioContext);
    this.reverbMix.gain.value = synthSettings.masterReverb;
    this.reverbMix.connect(this.masterVolume)

    this.createReverb = async (audioContext)=> {
    let convolver = audioContext.createConvolver();

    // load impulse response from file
    let response     = await fetch("../src/assets/reverb/StNicolaesChurch.wav");
    let arraybuffer  = await response.arrayBuffer();
    convolver.buffer = await audioContext.decodeAudioData(arraybuffer);

    return convolver;
}
    this.reverb = await this.createReverb(this.audioContext);
    this.reverb.connect(this.reverbMix);

    // Compressor
    this.compressor = new DynamicsCompressorNode(this.audioContext);
    this.compressor.threshold.value = synthSettings.compressor.threshold;
    this.compressor.knee.value = synthSettings.compressor.knee;
    this.compressor.ratio.value = synthSettings.compressor.ratio;
    this.compressor.attack.value = synthSettings.compressor.attack;
    this.compressor.release.value = synthSettings.compressor.release;
    this.compressor.connect(this.masterVolume);


    this.masterChainNode = new GainNode(this.audioContext);
    this.masterChainNode.gain.value = 0.99;
    this.masterChainNode.connect(this.compressor);
    this.masterChainNode.connect(this.masterVolume);
  },
};
</script>
