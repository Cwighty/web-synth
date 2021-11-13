<!--Keyboard.vue represents the lower keyboard / playing controls of a synth including the global volume / keyboard / pitch wheel / etc-->
<template>
  <div class="col-1"></div>
  <div class="col-5 keyboard">
    <webaudio-keyboard keys="40"></webaudio-keyboard>
  </div>
  <div class="col-3" id="effects">
    <h5>Effects</h5>
  </div>
  <div class="col-2">
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
