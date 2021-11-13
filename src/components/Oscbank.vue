<!--Oscbank.vue represents the oscillator control section of the control rack-->
<template>
  <div class="col">
    <h5>Oscillator Bank</h5>
    <div class="row">
      <select
        v-model="range1"
        v-on:input="$store.commit('updateRange1', $event)"
        class="col"
      >
        <option value="2">2'</option>
        <option value="1">4'</option>
        <option value="0">8'</option>
        <option value="-1">16'</option>
        <option value="-2">32'</option>
        <option value="-3">LO</option>
      </select>
      <div class="col"></div>
      <select
        v-model="wavetable1"
        v-on:input="$store.commit('updateWavetable1', $event)"
        class="col"
      >
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="triangle">Triangle</option>
      </select>
    </div>
    <div class="row">
      <select
        v-model="range2"
        v-on:input="$store.commit('updateRange2', $event)"
        class="col"
      >
        <option value="2">2'</option>
        <option value="1">4'</option>
        <option value="0">8'</option>
        <option value="-1">16'</option>
        <option value="-2">32'</option>
        <option value="-3">LO</option>
      </select>
      <webaudio-knob
        v-model="detune2"
        v-on:input="$store.commit('updateDetune2', $event)"
        class="col"
        src="./src/assets/knobs/orange_knob.png"
        diameter="50"
        type="range"
        min="-7"
        value="0"
        max="7"
        step=".1"
      ></webaudio-knob>
      <select
        v-model="wavetable2"
        v-on:input="$store.commit('updateWavetable2', $event)"
        class="col"
      >
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="triangle">Triangle</option>
      </select>
    </div>
    <div class="row">
      <select
        v-model="range3"
        v-on:input="$store.commit('updateRange3', $event)"
        class="col"
      >
        <option value="2">2'</option>
        <option value="1">4'</option>
        <option value="0">8'</option>
        <option value="-1">16'</option>
        <option value="-2">32'</option>
        <option value="-3">LO</option>
      </select>
      <webaudio-knob
        v-model="detune3"
        v-on:input="$store.commit('updateDetune3', $event)"
        class="col"
        src="./src/assets/knobs/orange_knob.png"
        diameter="50"
        type="range"
        min="-7"
        value="0"
        max="7"
        step=".1"
      ></webaudio-knob>
      <select
        v-model="wavetable3"
        v-on:input="$store.commit('updateWavetable3', $event)"
        class="col"
      >
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="triangle">Triangle</option>
      </select>
    </div>
  </div>
</template>

<script>
import store from '../state.js'
export default {
  name: "Oscbank",
  props: {},
  data() {
    return {
      range1: "2'",
      range2: "2'",
      range3: "2'",
      wavetable1: "sine",
      wavetable2: "sine",
      wavetable3: "sine",
      detune1: 0,
      detune2: 0,
    };
  },
  computed: {},
  methods: {
    updateRange1(e){
      this.$store.commit('updateRange1', e);
    },
    updateRange2(e){
      this.$store.commit('updateRange2', e);
    },
    updateRange3(e){
      this.$store.commit('updateRange3', e);
    },
    updateWavetable1(e){
      this.$store.commit('updateWavetable1', e);
    },
    updateWavetable2(e){
      this.$store.commit('updateWavetable2', e);
    },
    updateWavetable3(e){
      this.$store.commit('updateWavetable3', e);
    },
    updateDetune1(e){
      this.$store.commit('updateDetune1', e);
    },
    updateDetune2(e){
      this.$store.commit('updateDetune2', e);
    },
  },
};
</script>
