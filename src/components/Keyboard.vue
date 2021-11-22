<!--Keyboard.vue represents the lower keyboard / playing controls of a synth including the global volume / keyboard / pitch wheel / etc-->
<template>
  <div class="grid grid-cols-11">
    <div class="col-span-1"></div>
    <div class="keyboard col-span-4">
      <webaudio-keyboard
        v-on:change="$emit('keyTouch', $event)"
        keys="40"
        width="480"
        height="130"
      ></webaudio-keyboard>
    </div>
    <div class="col-span-5" id="effects">
      <div class="col-span-3">
        <h6>Compressor</h6>
        <div class="grid grid-cols-5">
          <webaudio-knob
            class=""
            v-model="compThreshold"
            v-on:input="$store.commit('updateCompThreshold', $event)"
            src="./src/assets/knobs/orange_knob.png"
            diameter="20"
            tooltip="%s"
            type="range"
            min="-100"
            max="0"
            value="-24"
            step="1"
          ></webaudio-knob>
          <webaudio-knob
            class=""
            v-model="compRatio"
            v-on:input="$store.commit('updateCompRatio', $event)"
            src="./src/assets/knobs/orange_knob.png"
            diameter="20"
            tooltip="%s"
            type="range"
            min="1"
            max="20"
            value="12"
            step="1"
          ></webaudio-knob>
          <webaudio-knob
            class=""
            v-model="compKnee"
            v-on:input="$store.commit('updateCompKnee', $event)"
            src="./src/assets/knobs/orange_knob.png"
            diameter="20"
            tooltip="%s"
            type="range"
            min="1"
            max="40"
            value="30"
            step="1"
          ></webaudio-knob>
          <webaudio-knob
            class=""
            v-model="compAttack"
            v-on:input="$store.commit('updateCompAttack', $event)"
            src="./src/assets/knobs/orange_knob.png"
            diameter="20"
            tooltip="%s"
            type="range"
            min="0"
            max="1"
            value=".003"
            step="0.001"
          ></webaudio-knob>
          <webaudio-knob
            class=""
            v-model="compRelease"
            v-on:input="$store.commit('updateCompRelease', $event)"
            src="./src/assets/knobs/orange_knob.png"
            diameter="20"
            tooltip="%s"
            type="range"
            min="0"
            max="1"
            value=".25"
            step="0.01"
          ></webaudio-knob>
          <label>Threshold</label>
          <label>Ratio</label>
          <label>Knee</label>
          <label>Attack</label>
          <label>Release</label>
        </div>
      </div>
      <div class="row"></div>
    </div>
    <div class="">
      <webaudio-knob
        v-model="reverbMix"
        v-on:input="$store.commit('updateReverbMix', $event)"
        src="./src/assets/knobs/orange_knob.png"
        diameter="20"
        tooltip="%s"
        type="range"
        min="0"
        max="1"
        value=".5"
        step="0.01"
      ></webaudio-knob>
      <h6>Reverb</h6>
      <webaudio-knob
        v-model="masterVolume"
        v-on:input="$store.commit('updateMasterVolume', $event)"
        src="./src/assets/knobs/orange_slider.png"
        sprites="30"
        tooltip="%s"
        type="range"
        min="0"
        max="1"
        value=".5"
        step="0.01"
      ></webaudio-knob>
      <h3>Volume</h3>
    </div>
    <div class="col-span-1"></div>
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
