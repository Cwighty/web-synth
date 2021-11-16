<!--Keyboard.vue represents the lower keyboard / playing controls of a synth including the global volume / keyboard / pitch wheel / etc-->
<template>
  <div class="col-lg-1"></div>
  <div class="col-lg-5 keyboard">
    <webaudio-keyboard keys="40" width="300" height="100"></webaudio-keyboard>
  </div>
  <div class="col-lg-3" id="effects">
    <h5>Effects</h5>
    <div class="row">
      <h6>Compressor</h6>
      <webaudio-knob
        class="col-lg-1"
        v-model="compThreshold"
        v-on:input="$store.commit('updateCompThreshold', $event)"
        src="./src/assets/knobs/orange_knob.png"
        diameter="20"
        type="range"
        min="0"
        max="1"
        value=".5"
        step="0.01"
      ></webaudio-knob>
      <webaudio-knob
        class="col-lg-1"
        v-model="compRatio"
        v-on:input="$store.commit('updateCompRatio', $event)"
        src="./src/assets/knobs/orange_knob.png"
        diameter="20"
        type="range"
        min="0"
        max="1"
        value=".5"
        step="0.01"
      ></webaudio-knob>
      <webaudio-knob
        class="col-lg-1"
        v-model="compKnee"
        v-on:input="$store.commit('updateCompKnee', $event)"
        src="./src/assets/knobs/orange_knob.png"
        diameter="20"
        type="range"
        min="0"
        max="1"
        value=".5"
        step="0.01"
      ></webaudio-knob>
      <webaudio-knob
        class="col-lg-1"
        v-model="compAttack"
        v-on:input="$store.commit('updateCompAttack', $event)"
        src="./src/assets/knobs/orange_knob.png"
        diameter="20"
        type="range"
        min="0"
        max="1"
        value=".5"
        step="0.01"
      ></webaudio-knob>
      <webaudio-knob
        class="col-lg-1"
        v-model="compRelease"
        v-on:input="$store.commit('updateCompRelease', $event)"
        src="./src/assets/knobs/orange_knob.png"
        diameter="20"
        type="range"
        min="0"
        max="1"
        value=".5"
        step="0.01"
      ></webaudio-knob>
      <webaudio-knob
        class="col-lg-1"
        v-model="compGain"
        v-on:input="$store.commit('updateCompGain', $event)"
        src="./src/assets/knobs/orange_knob.png"
        diameter="20"
        type="range"
        min="0"
        max="1"
        value=".5"
        step="0.01"
      ></webaudio-knob>
    </div>
    <div class="row">
      <h6>Reverb</h6>
      <webaudio-knob
        v-model="reverbMix"
        v-on:input="$store.commit('updateReverbMix', $event)"
        src="./src/assets/knobs/orange_knob.png"
        diameter="20"
        type="range"
        min="0"
        max="1"
        value=".5"
        step="0.01"
      ></webaudio-knob>
    </div>
  </div>
  <div class="col-lg-1">
    <h3>Volume</h3>
    <webaudio-knob
      v-model="masterVolume"
      v-on:input="$store.commit('updateMasterVolume', $event)"
      src="./src/assets/knobs/orange_slider.png"
      sprites="30"
      type="range"
      min="0"
      max="1"
      value=".5"
      step="0.01"
    ></webaudio-knob>
  </div>
  <div class="col-lg-1"></div>
</template>

<script>
export default {
  name: "Keyboard",
  props: {},
  data() {
    return {
      count: 0,
    };
  },
  computed: {},
  methods: {},
};
</script>
