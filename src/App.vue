<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
  import Header from "@/layout/Header";
  import Footer from "@/layout/Footer";
  export default {
    components: {Header, Footer},
    computed: {
      user(){
        return this.$store.state.user;
      }
    },
    mounted() {
      if(this.$store.user == null || this.$store.user.id == undefined){
        this.$router.push('/userLogin');
      }

      //시분 입력
    }
  }
</script>