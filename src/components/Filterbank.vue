<!--Filterbank.vue represents the filter control section of the control rack-->
<template>
  <div class="col-lg-1" id="filterbank">
    <h5>Filter</h5>
    <label class="row"
      >Cutoff
      <webaudio-knob
        v-model="cutoff"
        v-on:input="$store.commit('updateCutoff', $event)"
        src="./src/assets/knobs/orange_knob.png"
        tooltip="%s hz"
        log="1"
        diameter="50"
        type="range"
        min="20"
        max="20000"
        value="0"
        step="1"
      ></webaudio-knob>
    </label>
    <label class="row"
      >Emphasis
      <webaudio-knob
        v-model="emphasis"
        v-on:input="$store.commit('updateEmphasis', $event)"
        src="./src/assets/knobs/orange_knob.png"
        log="1"
        tooltip="%s"
        diameter="50"
        type="range"
        min="0.01"
        max="500"
        value="0.01"
        step=".01"
      ></webaudio-knob>
    </label>
    <label class="row"
      >Q
      <webaudio-knob
        v-model="q"
        v-on:input="$store.commit('updateQ', $event)"
        src="./src/assets/knobs/orange_knob.png"
        tooltip="%s q"
        diameter="50"
        type="range"
        min="0.01"
        max="20"
        value="0.01"
        step=".01"
      ></webaudio-knob>
    </label>
  </div>
</template>

<script>
export default {
  name: "Filterbank",
  props: {},
  data() {
    return {
      cutoff: 20000,
      emphasis: 1.0,
      q: 0.01,
    };
  },
  computed: {},
  methods: {},
};
</script>
