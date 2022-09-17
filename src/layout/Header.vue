<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">야옹이유치원</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">홈</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/">페스워드변경</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/detail">캐릭터 정보 업데이트</router-link>
          </li>
        </ul>
        <form class="d-flex"><!--
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>-->

          <div v-if="user.id==undefined"><button class="btn btn-danger" type="button" @click="gotoLogin">로그인</button></div>
          <div v-else><button class="btn btn-danger" type="button" @click="logout">로그아웃</button></div>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "header",
  computed: {
    user(){
      return this.$store.state.user;
    }
  },
  methods: {
    gotoLogin(){
      this.$router.push('/userLogin');
    },
    logout(){
      this.$store.commit("user",{});
      alert("로그아웃 되었습니다.");
      this.$router.push('/userLogin');
    }
  }
}
</script>

<style scoped>

</style>
