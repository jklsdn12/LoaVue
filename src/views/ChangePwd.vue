<template>
  <form class="form-signin">
    <img class="mb-4" src="../assets/loacon.jpg" alt="" width="144" height="144">
    <h1 class="h3 mb-3 font-weight-normal"></h1>
    <label for="inputEmail" class="sr-only">아이디</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="아이디" required="" autofocus="" v-model="param.USERID" readonly>
    <label for="inputPassword" class="sr-only">기존 비밀번호</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="기존 비밀번호" required=""  v-model="param.PASSWD">
    <label for="inputPassword" class="sr-only">변경 비밀번호</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="변경 비밀번호" required=""  v-model="param.PASSWD1">
    <label for="inputPassword" class="sr-only">변경 비밀번호 확인</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="변경 비밀번호 확인" required="" @keydown.enter="changePwd" v-model="param.PASSWD2">
   <div class="checkbox mb-3">
      <label>
<!--        <input type="checkbox" value="remember-me"> Remember me-->
      </label>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="button" @click="changePwd">저장</button>
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
      param: {
        USERID : "",
        PASSWD : "",
        PASSWD1 : "",
        PASSWD2 : ""

      }
    };
  },
  methods: {
    async changePwd() {
      await this.$callAPI("/common/json/chgPasswd.data", 'post', this.param
          , (res) => {

            if (res && res.data) {
              if (res.data == "S") {
                alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");

                this.$store.commit("user",{});
                localStorage.removeItem('id');

                this.$router.push('/userLogin');
              } else if (res.data == "F_LOGIN_FAIL") {
                alert("비밀번호가 잘못되었습니다.");
              } else {
                alert("에러발생");
              }
            } else {
              alert("에러발생");
            }
          });
    }
  },
  mounted() {
    this.param.USERID = this.$store.state.user.id;
  }
};
</script>

