<!--App.vue represents the main starting page of the web synth, with a button to load up the synth-->
<template>
  <h1 v-if="!clicked">Welcome to my Web Synth</h1>
  <h2 v-if="!clicked">Hit the button below to load it up!</h2>
  <button v-on:click="c()" v-if="!clicked">Load Synth</button>
  <Synth v-if="clicked"/>
</template>

<script>
import Synth from './components/Synth.vue'

export default {
  name: 'App',
  components: {
    Synth,
  },
  data(){
    return{
      clicked: false,
    }
  },
  methods:{
    c(){
        this.clicked = true;
    },
  }
}
</script>
