<template>
  <form class="form-signin">
    <img class="mb-4" src="../assets/loacon.jpg" alt="" width="144" height="144">
    <h1 class="h3 mb-3 font-weight-normal"></h1>
    <label for="inputEmail" class="sr-only">아이디</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="아이디" required="" autofocus="" v-model="loginData.id">
    <label for="inputPassword" class="sr-only">비밀번호</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="비밀번호" required="" @keydown.enter="UserLogin" v-model="loginData.pwd">
    <div class="checkbox mb-3">
      <label>
<!--        <input type="checkbox" value="remember-me"> Remember me-->
      </label>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="button" @click="UserLogin">로그인</button>
    <p class="mt-5 mb-3 text-muted"></p>
  </form>
</template>
<style>

</style>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      loginData: {
        id: "",
        pwd:""
      }
    };
  },
  methods: {
    async UserLogin(){
      await this.$callAPI("/common/json/login.data",'post',{USERID: this.loginData.id, PASSWD:  this.loginData.pwd},this.loginCom);
    },
    loginCom(res){
      if(res.data == "S" ){
        let data = {id : this.loginData.id }
        this.$store.commit("user",data);
        localStorage.setItem('id', this.loginData.id );
        this.$router.push('/');
      }else if(res.data == "F_LOGIN_FAIL"){
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      }else{
        alert("통신에러 발생");
      }
    }
  }
};
</script>

