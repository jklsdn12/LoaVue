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
            <router-link class="nav-link active" to="/changePwd">스워드변경</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/" @click="getUserData">캐릭터 정보 업데이트</router-link>
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
  data(){
    return {
      runUpdate : false
    };
  },
  methods: {
    gotoLogin(){
      this.$router.push('/userLogin');
    },
    logout(){
      this.$store.commit("user",{});
      localStorage.removeItem('id');
      alert("로그아웃 되었습니다.");
      this.$router.push('/userLogin');
    },
    async getUserData(){
      if(!window.confirm("갱신에 5~10분가량 소요됩니다. 실행하시겠습니까?")) return;
      if (this.runUpdate == true) {
        alert("백그라운드에서 갱신작업이 진행중입니다 20분후에도 업데이트되지 않으면 새로고침 후 시도해주세요.");
        return;
      }

      await this.$callAPI("/userData/json/getUserCharList.data", 'post', {}
          , (res) => {
            console.log(res);
            //유저데이터 취득에 성공하였습니다.
            if (res && res.data && res.data.length > 0) {
              this.getUserDataDetail(res.data);
            } else {
              alert("전투정보실 데이터를 가져오는데 실패하였습니다.")
            }
          });

    },
    async getUserDataDetail(list){
      this.runUpdate = true;
      let userData ={};
      for(let i=0; i<list.length; i++) {

        await this.$callAPI("/userData/json/getUserCharDataInfo.data", 'post', {NKNAME: list[i]}
            , (res) => {
              if(res && res.data && res.data.NMTAG && res.data.NMTAG != ''){
                userData[list[i]] = {
                  NKNAME : res.data.NMTAG,
                  ITEMLV : res.data.ITEMLV,
                  JOBTAG : res.data.JOBTAG
                };
                console.log(userData);

              }else if(res && !res.Basic ){
                console.log(res.Basic);
              }else{
                alert("상세 데이터를 가져오는중 에러 발생");
                return;
              }
            });

        await new Promise(resolve => setTimeout(resolve, 5000));
      }
      console.log(userData);
      let param = {
        nmList : list,
        userMap : userData
      }

      console.log(param);
      await this.$callAPI("/userData/json/updateUserData.data", 'post', param
          , (res) => {
            this.runUpdate = false;
            //유저데이터 취득에 성공하였습니다.
            if(res && res.data && res.data =="S"){
              alert("정보 업데이트에 성공하였습니다. 데이터 갱신을 위해 재로그인이 필요하여 로그아웃됩니다.");
              this.logout();
            }else{
              alert("데이터 업데이트에 실패하였습니다.")
            }
          });
    }

  }
}
</script>

<style scoped>

</style>
