<!--Envelopes.vue represents the envelope control section of the control rack including both the filter and volume envelopes-->
<template>
  <div class="col-lg" id="envelopes">
    <div>
      <form class="row envelope">
        <h5>Filter</h5>
        <div class="col-lg">
          <label>A</label>
          <webaudio-slider
            v-model="filterA"
            v-on:input="$store.commit('updateFilterA', $event)"
            src="./src/assets/knobs/skinny-slider-back.png"
            knobsrc="./src/assets/knobs/orange_slider_knob.png"
            direction="vert"
            tooltip="%s ms"
            type="range"
            min="0"
            max="5000"
            value="20"
            step="1"
          ></webaudio-slider>
        </div>
        <div class="col-lg">
          <label>D</label>
          <webaudio-slider
            v-model="filterD"
            v-on:input="$store.commit('updateFilterD', $event)"
            src="./src/assets/knobs/skinny-slider-back.png"
            knobsrc="./src/assets/knobs/orange_slider_knob.png"
            direction="vert"
            tooltip="%s ms"
            type="range"
            min="0"
            max="10000"
            value="20"
            step="1"
          ></webaudio-slider>
        </div>
        <div class="col-lg">
          <label>S</label>
          <webaudio-slider
            v-model="filterS"
            v-on:input="$store.commit('updateFilterS', $event)"
            src="./src/assets/knobs/skinny-slider-back.png"
            knobsrc="./src/assets/knobs/orange_slider_knob.png"
            direction="vert"
            tooltip="%s ms"
            type="range"
            min="0"
            max="10000"
            value="20"
            step="1"
          ></webaudio-slider>
        </div>
        <div class="col-lg">
          <label>R</label>
          <webaudio-slider
            v-model="filterR"
            v-on:input="$store.commit('updateFilterR', $event)"
            src="./src/assets/knobs/skinny-slider-back.png"
            knobsrc="./src/assets/knobs/orange_slider_knob.png"
            direction="vert"
            tooltip="%s ms"
            type="range"
            min="0"
            max="5000"
            value="20"
            step="1"
          ></webaudio-slider>
        </div>
      </form>
      <form class="row envelope">
        <h5>Envelope</h5>
        <div class="col-lg">
          <label>A</label>
          <webaudio-slider
            v-model="envA"
            v-on:input="$store.commit('updateEnvA', $event)"
            src="./src/assets/knobs/skinny-slider-back.png"
            knobsrc="./src/assets/knobs/orange_slider_knob.png"
            direction="vert"
            tooltip="%s ms"
            type="range"
            min="0"
            max="5000"
            value="20"
            step="1"
          ></webaudio-slider>
        </div>
        <div class="col-lg">
          <label>D</label>
          <webaudio-slider
            v-model="envD"
            v-on:input="$store.commit('updateEnvD', $event)"
            src="./src/assets/knobs/skinny-slider-back.png"
            knobsrc="./src/assets/knobs/orange_slider_knob.png"
            direction="vert"
            tooltip="%s ms"
            type="range"
            min="0"
            max="10000"
            value="20"
            step="1"
          ></webaudio-slider>
        </div>
        <div class="col-lg">
          <label>S</label>
          <webaudio-slider
            v-model="envS"
            v-on:input="$store.commit('updateEnvS', $event)"
            src="./src/assets/knobs/skinny-slider-back.png"
            knobsrc="./src/assets/knobs/orange_slider_knob.png"
            direction="vert"
            tooltip="%s ms"
            type="range"
            min="0"
            max="1"
            value=".5"
            step=".01"
          ></webaudio-slider>
        </div>
        <div class="col-lg">
          <label>R</label>
          <webaudio-slider
            v-model="envR"
            v-on:input="$store.commit('updateEnvR', $event)"
            src="./src/assets/knobs/skinny-slider-back.png"
            knobsrc="./src/assets/knobs/orange_slider_knob.png"
            direction="vert"
            tooltip="%s ms"
            type="range"
            min="0"
            max="5000"
            value="20"
            step="1"
          ></webaudio-slider>
        </div>
      </form>
    </div>
  </div>
  <div class="col-lg-1"></div>
</template>

<script>
export default {
  name: "Envelopes",
  props: {},
  data() {
    return {
      filterA: 0,
      filterD: 0,
      filterS: 0,
      filterR: 0,
      envA: 0,
      envD: 0,
      envS: 0,
      envR: 0,
    };
  },
  computed: {},
  methods: {},
};
</script>
