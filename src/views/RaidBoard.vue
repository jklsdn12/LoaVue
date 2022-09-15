<template>
  <main class="mt-3">
    <div class="container">
      <div class="row mb-2">
        <div class="col-12">
          <button type="button" @click="searchList">조회</button>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-3 col-lg-4 col-md-6" :key="i" v-for="(room,i) in roomList">
            <div class="card" style="width: 18rem;">
              <a style="cursor:pointer;"><img :src="`${servUrl}${getImage(dgIcon,'MSTDG',room[i].DGTYPE)}`" class="card-img-top" alt="..." style="height:250px"></a>
              <div class="card-body">
                <h5 class="card-title" ref="{{room[i].SEQNO}}">{{room[i].DGNAME}}</h5>
                <p class="card-text" :key="j" v-for="(roomData,j) in room">
                  <span class="badge bg-dark text-white me-1"><img :src="`${servUrl}${getImage(usrIcon,'USRJOB',roomData.USRJOB)}`" class="card-img-top" alt="..." style="width: 25px; height:25px">&nbsp;&nbsp;&nbsp;&nbsp; [{{roomData.ITEMLV}}] {{roomData.NKNAME}} ({{roomData.POSTIONNM}})</span>
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group" role="group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">참가</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">등록삭제</button>
                  </div>
                  <small class="text-dark">{{roomList.STDATE2}}</small>
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
  data() {
    return {
      roomList:[],
      usrIcon:[],
      dgIcon:[],
      servUrl:"http://211.53.209.103:8080/"
    };
  },
  methods: {
    async getUserChData(){
      await this.$callAPI("/userRoom/json/getUserChData.data",'post',{},this.setCharData);
    },
    setCharData(res){
      this.$store.commit("charData",res.data); //VAL,TEXT,OPT arr
      console.log(this.$store.getters.getChar);
    },
    async searchList(){
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
    async getCharIcon() {
      this.roomList = [];
      await this.$callAPI("/common/UserRoom/list/json/USRICONALL.data", 'post', {}
        , (res) => {
          this.$store.commit("userIconUrl", res);
          this.usrIcon = this.$store.getters.getUserIcon;
          this.usrIcon = res.data;
        });
    },
    async getDgIcon() {
      this.roomList = [];
      await this.$callAPI("/common/UserRoom/list/json/DGICONALL.data", 'post', {}
        , (res) => {
          this.$store.commit("dgIconUrl", res);
          this.dgIcon = res.data;
        });
    },
    getImage (list,type,target){
      for(var data of list){
        const {CODTYPE: codeType, CODNUM: codeNum, IMGSRC: imgsrc} = data;
        if(type == codeType && target == codeNum) return imgsrc;
      }
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

