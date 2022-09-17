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
        this.$store.commit("user",{id : localStorage.getItem('id') });
        if(this.$store.state.user== null || this.$store.state.user == undefined){
          this.$router.push('/userLogin');
        }
      }

      //시분 초기화
      const timeData = {
        hour : [
          "01","02","03","04","05","06","07","08","09",
          "10","11","12","13","14","15","16","17","18","19",
          "20","21","22","23","24"
        ],
        min :[
          "00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20"
          ,"21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40"
          ,"41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"
        ]
      };
      this.$store.commit('minHour',timeData);

    }
  }
</script>
