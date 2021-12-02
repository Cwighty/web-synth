<!--App.vue represents the main starting page of the web synth, with a button to load up the synth-->
<template>
  <div v-if="!clicked" class="text-white p-20">
    <h1>Welcome to my Web Synth</h1>
    <p class="m-5" style="font-size: 30px">Designed using vue and the web audio api.</p>
    <h2>Hit the button below to load it up!</h2>
    <button
      v-on:click="c()"
      v-if="!clicked"
      class="
        m-5
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
  <div class="">
    <Synth class="m-20" v-if="clicked" />
  </div>
  </body>
  <footer>
  <h3>Check it out on Github</h3>
  <a href="https://github.com/Cwighty/web-synth">
  <img src="./assets/GitHub-Mark-64px.png">
  </a>
  </footer>
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
