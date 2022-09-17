<template>
  <main class="mt-3">
    <div class="container">
      <div class="row mb-2">
        <div class="col-12">
          <button type="button" @click="searchList" class="btn btn-bg btn-outline-secondary">조회</button>
          <button type="button" @click="createRoom" class="btn btn-bg btn-outline-secondary">방생성</button>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-3 col-lg-4 col-md-6" :key="i" v-for="(room,i) in roomList">
            <div class="card" style="width: 18rem;">
              <a style="cursor:pointer;"><img :src="`${this.$store.state.servUrl}${getImage(dgIcon,'MSTDG',room[0].DGTYPE)}`" class="card-img-top" alt="..." style="height:250px"></a>
              <div class="card-body">
                <h4 class="card-title" ref="{{room[i].SEQNO}}">{{room[0].DGNAME}}</h4>
                <p>{{room[0].DOCTXT}} </p>
                <p v-if="user.id==room[0].CREUSR">
                  <button type="button" class="btn btn-sm btn-outline-secondary" @click="updateRoom(room[0].SEQNO)">수정</button>
                  <button type="button" class="btn btn-sm btn-danger" @click="deleteRoom(room[0].SEQNO)">방삭제</button>
                </p>
                <p class="card-text" :key="j" v-for="(roomData,j) in room">
                  <span class="badge bg-dark text-white me-1"><img :src="`${servUrl}${getImage(usrIcon,'USRJOB',roomData.USRJOB)}`" class="card-img-top" alt="..." style="width: 25px; height:25px">&nbsp;&nbsp;&nbsp;&nbsp; [{{roomData.ITEMLV}}] {{roomData.NKNAME}} ({{roomData.POSTIONNM}})</span>
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group" role="group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">참가</button>
                    <div v-if="chkJoinUser(room)==true"><button type="button" class="btn btn-sm btn-outline-secondary" @click="disjoinUser(room)">등록삭제</button></div>
                  </div>
                  <small class="text-dark">{{room[0].STDATE2}} {{room[0].STTIME2}}</small>
                </div>
              </div>
            </div>

        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "LoginPage",
  computed: {
    user(){
      return this.$store.state.user;
    }
  },
  data() {
    return {
      roomList:[],
      usrIcon:[],
      dgIcon:[],
      servUrl:"http://211.53.209.103:8080/"
    };
  },
  methods: {
    async getUserChData(){ //캐릭터 정보 조회
      await this.$callAPI("/userRoom/json/getUserChData.data",'post',{},this.setCharData);
    },
    setCharData(res){
      this.$store.commit("charData",res.data); //VAL,TEXT,OPT arr
    },
    async searchList(){ //방 조회
      this.roomList = [];
      await this.$callAPI("/userRoom/json/searchRoom.data",'post',{}
        ,(res) =>{
        //데이터를 방 별로 합친다.
        let roomArr = [];
        let chkSeq = 0;
        for(let i=0; i<res.data.length; i++){
          if(chkSeq != res.data[i].SEQNO){
              roomArr = new Array();
              this.roomList.push(roomArr);
              chkSeq=res.data[i].SEQNO;
          }
          roomArr.push(res.data[i]);
        }
      });
    },
    async getCharIcon() { //캐릭터 이미지 가져오기
      await this.$callAPI("/common/UserRoom/list/json/USRICONALL.data", 'post', {}
        , (res) => {
          this.$store.commit("userIconUrl", res.data);
          this.usrIcon = res.data;
        });
    },
    async getDgIcon() { //던전 이미지 가져오기
      await this.$callAPI("/common/UserRoom/list/json/DGICONALL.data", 'post', {}
        , (res) => {
          this.$store.commit("dgIconUrl", res.data);
          this.dgIcon = res.data;
        });
    },
    getImage (list,type,target){ // 이미지를 분리한다.
      for(let data of list){
        const {CODTYPE: codeType, CODNUM: codeNum, IMGSRC: imgsrc} = data;
        if(type == codeType && target == codeNum) return imgsrc;
      }
    },
    async deleteRoom(seqno){ //방삭제
      if (!confirm("삭제하시겠습니까?")) return;

      await this.$callAPI("/userRoom/json/deleteRoom.data", 'post', { SEQNO: seqno }
        , (res) => {
          if(res.data == "S"){
            alert("방 삭제에 성공하였습니다.");
            this.searchList();
          }else{
            alert("에러 발생");
          }
        });
    },
    chkJoinUser(roomData){ //참여정보가 있는지 체크한다.
      for(let i=0; i<roomData.length; i++){
        if(this.$store.state.user.id == roomData[i].USERID){
          return true;
        }
      }
      return false;
    },
    async disjoinUser(roomData){//유저 삭제
      for(let i=0; i<roomData.length; i++){
        if(this.$store.state.user.id == roomData[i].USERID) {
          if (!confirm("삭제하시겠습니까?")) return;

          await this.$callAPI("/userRoom/json/deleteJoin.data", 'post', { SEQNO: roomData[i].SEQNO, NKNAME: roomData[i].NKNAME }
            , (res) => {
              if(res.data == "S"){
                alert("참가삭제에 성공하였습니다.");
                this.searchList();
              }else if(res.data == "E2"){
                alert("수정할 수 없는 데이터 입니다.");
              }else{
                alert("에러 발생");
              }
            });

        }
      }
    },
    async updateRoom(seqno){
      console.log(seqno);
      this.$router.push('/createRoom');
      this.$router.push('/createRoom');
    },
    async createRoom(){
      this.$router.push('/createRoom');
    }


  },
  beforeMount() {
    //초기데이터를 세팅한다.
    this.getUserChData(); //캐릭터 정보를 가져온다.
    this.searchList(); //화면 로드시 정보를 조회한다.
    this.getDgIcon(); //던전 아이콘을 가져온다.
    this.getCharIcon(); // 캐릭터 아이콘을 가져온다.
  }

};
</script>

