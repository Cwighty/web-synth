<template>
  <div class="col-1"></div>
  <div class="col-1">
    <h5>Global Controls</h5>
  </div>
  <Oscbank />
  <Mixerbank />
  <Filterbank />
  <Envelopes />
</template>

<script>
import Oscbank from "./Oscbank.vue";
import Mixerbank from "./Mixerbank.vue";
import Filterbank from "./Filterbank.vue";
import Envelopes from "./Envelopes.vue";

export default {
  components: { Oscbank, Mixerbank, Filterbank, Envelopes },
  name: "Rack",
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
