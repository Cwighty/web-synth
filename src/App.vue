<!--App.vue represents the main starting page of the web synth, with a button to load up the synth-->
<template>
  <div class="text-white">
    <h1 v-if="!clicked">Welcome to my Web Synth</h1>
    <h2 v-if="!clicked">Hit the button below to load it up!</h2>
    <button
      v-on:click="c()"
      v-if="!clicked"
      class="
        p-2
        pl-5
        pr-5
        transition-colors
        duration-700
        transform
        bg-blue-500
        hover:bg-blue-800
        text-gray-100 text-lg
        rounded-lg
        focus:border-4
        border-blue-100
      "
    >
      Load Synth
    </button>
  </div>
  <body>
  <Synth class="m-20" v-if="clicked" />
  </body>
</template>

<script>
import Synth from "./components/Synth.vue";

export default {
  name: "App",
  components: {
    Synth,
  },
  data() {
    return {
      clicked: false,
    };
  },
  methods: {
    c() {
      this.clicked = true;
    },
  },
};
</script>
