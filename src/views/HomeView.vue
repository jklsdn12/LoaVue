<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <b-button variant="primary">Button</b-button>


  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/YearPicker.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
