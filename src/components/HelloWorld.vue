<template>
  <h1>{{ msg }}</h1>
  <button @click="message += message">count is: {{ message }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <p v-if="show()">{{message}}</p>
  <input v-model="message"/>
  <ul>
    <li v-for="n in number" v-bind:key="n"> {{n}} </li>
  </ul>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0,
      message: "1",
      items: [
        {description: "hi", id: 1},
      ],
    }
  },
  computed:
  {
      number(){
          return Number(this.message);
      }
  },
  methods:
  {
    show(){
      if (this.message == "true")
      {
        return true;
      }
      else{
        return false;
      }
    }
  }
}
</script>
