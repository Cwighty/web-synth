<!--Oscbank.vue represents the oscillator volume mixer section of the control rack-->
<template>
  <div class="grid grid-rows-1 bg-gray-800 text-white justify-items-center" id="mixerbank">
  <h5 class="">Mixer</h5>
    <div class="row-span-1">
      <webaudio-knob
        v-model="osc1mix"
        v-on:input="$store.commit('updateOscMix1', $event)"
        src="./src/assets/knobs/orange_slider.png"
        class=""
        sprites="30"
        type="range"
        min="0.0001"
        max="1"
        value=".5"
        step="0.001"
        log="1"
        tooltip="%s"
        width=150
        height=50
      ></webaudio-knob>
    </div>
    <div class="row-span-1">
      <webaudio-knob
        v-model="osc2mix"
        v-on:input="$store.commit('updateOscMix2', $event)"
        src="./src/assets/knobs/orange_slider.png"
        sprites="30"
        type="range"
        min="0.0001"
        max="1"
        value=".001"
        step="0.001"
        log="1"
        tooltip="%s"
        width=150
        height=50
      ></webaudio-knob>
    </div>
    <div class="row-span-1">
      <webaudio-knob
        v-model="osc3mix"
        v-on:input="$store.commit('updateOscMix3', $event)"
        src="./src/assets/knobs/orange_slider.png"
        sprites="30"
        type="range"
        min="0.0001"
        max="1"
        value=".001"
        step="0.001"
        log="1"
        tooltip="%s"
        width=150
        height=50
      ></webaudio-knob>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mixerbank",
  props: {},
  data() {
    return {
      osc1mix: 0.5,
      osc2mix: 0.01,
      osc3mix: 0.01,
    };
  },
  computed: {},
  methods: {},
};
</script>
