<!--Oscbank.vue represents the oscillator control section of the control rack-->
<template>
  <div
    class="
      grid
      grid-cols-3
      gap-3
      justify-items-center
      bg-gray-800
      text-white
    "
    id="oscbank"
  >
    <h5 class="col-span-3 mb-1">Oscillator Bank</h5>
    <div class="col-span-3 grid grid-cols-3 justify-items-center">
      <h6 class="col-span-3 mb-2">Oscillator 1</h6>
      <select
        v-model="range1"
        v-on:input="$store.commit('updateRange1', $event)"
        class="text-black h-10 w-20 col-span-1"
      >
        <option value="2">2'</option>
        <option value="1">4'</option>
        <option value="0" selected>8'</option>
        <option value="-1">16'</option>
        <option value="-2">32'</option>
        <option value="-3">LO</option>
      </select>
      <div class="col-span"></div>
      <select
        v-model="wavetable1"
        v-on:input="$store.commit('updateWavetable1', $event)"
        class="text-black h-10 w-25 col-span-1"
      >
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="triangle">Triangle</option>
      </select>
    </div>
    <div class="col-span-3 grid grid-cols-3 justify-items-center">
      <h6 class="col-span-3 mb-2">Oscillator 2</h6>
      <select
        v-model="range2"
        v-on:input="$store.commit('updateRange2', $event)"
        class="text-black h-10 w-20 col-span-1"
      >
        <option value="2">2'</option>
        <option value="1">4'</option>
        <option value="0" selected>8'</option>
        <option value="-1">16'</option>
        <option value="-2">32'</option>
        <option value="-3">LO</option>
      </select>
      <webaudio-knob
        v-model="detune2"
        v-on:input="$store.commit('updateDetune2', $event)"
        class=""
        src="/src/assets/knobs/orange_knob.png"
        diameter="50"
        type="range"
        min="-16"
        value="0"
        max="16"
        step=".1"
      ></webaudio-knob>
      <select
        v-model="wavetable2"
        v-on:input="$store.commit('updateWavetable2', $event)"
        class="text-black h-10 w-25 col-span-1"
      >
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="triangle">Triangle</option>
      </select>
    </div>
    <div
      class="
        col-span-3
        grid
        grid-cols-3
        justify-items-center
      "
    >
      <h6 class="col-span-3 mb-2">Oscillator 3</h6>
      <select
        v-model="range3"
        v-on:input="$store.commit('updateRange3', $event)"
        class="text-black h-10 w-20 col-span-1"
      >
        <option value="2">2'</option>
        <option value="1">4'</option>
        <option value="0" selected>8'</option>
        <option value="-1">16'</option>
        <option value="-2">32'</option>
        <option value="-3">LO</option>
      </select>
      <webaudio-knob
        v-model="detune3"
        v-on:input="$store.commit('updateDetune3', $event)"
        class=""
        src="/src/assets/knobs/orange_knob.png"
        diameter="50"
        type="range"
        min="-16"
        value="0"
        max="16"
        step=".1"
      ></webaudio-knob>
      <select
        v-model="wavetable3"
        v-on:input="$store.commit('updateWavetable3', $event)"
        class="text-black h-10 w-25 col-span-1"
      >
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="triangle">Triangle</option>
      </select>
    </div>
    <div class="col-span-3 grid grid-cols-3 justify-items-center gap-7">
      <h6 class="m-1">Range</h6>
      <h6 class="m-1">Detune</h6>
      <h6 class="m-1">Wave</h6>
    </div>
  </div>
</template>

<script>
import store from "../state.js";
export default {
  name: "Oscbank",
  props: {},
  data() {
    return {
      range1: 0,
      range2: 0,
      range3: 0,
      wavetable1: "sine",
      wavetable2: "sine",
      wavetable3: "sine",
      detune1: 0,
      detune2: 0,
    };
  },
  computed: {},
  methods: {
    updateRange1(e) {
      this.$store.commit("updateRange1", e);
    },
    updateRange2(e) {
      this.$store.commit("updateRange2", e);
    },
    updateRange3(e) {
      this.$store.commit("updateRange3", e);
    },
    updateWavetable1(e) {
      this.$store.commit("updateWavetable1", e);
    },
    updateWavetable2(e) {
      this.$store.commit("updateWavetable2", e);
    },
    updateWavetable3(e) {
      this.$store.commit("updateWavetable3", e);
    },
    updateDetune1(e) {
      this.$store.commit("updateDetune1", e);
    },
    updateDetune2(e) {
      this.$store.commit("updateDetune2", e);
    },
  },
};
</script>
