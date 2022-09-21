<template>
  <form class="form-signin">
    <img class="mb-4" :src="`${dgImgUrl}`" alt="" width="144" height="144">
    <h1 class="h3 mb-3 font-weight-normal"></h1>
    <label for="inputEmail" class="sr-only">캐릭터</label>

    <select v-model="param.NKNAME" @change="changeChar"  ref="NKNAME" name="캐릭터">
        <option v-for="option in charData" :value="option.VAL" v-bind:key="option" >
          {{ option.TEXT }}
        </option>
    </select>
    <select  name="포지션" v-model="param.POSTION" >
      <option value="D">딜러</option>
      <option value="S">서포터</option>
    </select>

    <label for="inputEmail" class="sr-only">던전</label>
    <select v-model="param.DGCODE" @change="changeDg"  ref="DGCODE"  name="던전">
      <option v-for="option in dgData" :value="option.VAL" v-bind:key="option">
        {{ option.TEXT }}
      </option>
    </select>
    <p/>

    <label  class="sr-only">날짜/시간</label>
    <div>
      <datepicker v-model="picked"
                  :clearable="true"
                  :inputFormat="inputFormat"/>
    </div>
    <select v-model="param.HOUR"  ref="HOUR"  name="시간">
      <option v-for="(item, index) in dataHour" :value="item.value" v-bind:key="index" >
        {{item.id}}
      </option>
    </select>
    &nbsp;
    <select v-model="param.MIN"  ref="MIN"  name="분">
      <option  v-for="(item2, index) in dataMin"  :value="item2.value" v-bind:key="index">
        {{item2.id}}
      </option>
    </select>
    <p/>
    <label  class="sr-only">비고</label>
    <input type="text"  class="form-control" required=""  v-model="param.DOCTXT"  ref="DOCTXT"  name="비고">

    <button class="btn btn-lg btn-primary btn-block" type="button" @click="saveChk">저장</button>
    <button class="btn btn-lg btn-primary btn-block" type="button" @click="gotoList">리스트</button>
    <p class="mt-5 mb-3 text-muted"></p>
  </form>
</template>
<style>

</style>

<script>
import Datepicker from 'vue3-datepicker';
import { ref } from 'vue'
import moment from 'moment';

export default {
  components: {
    Datepicker
  },
  name: "CreateRoom",
  dgImg(){
    return this.$store.state.getDgIcon;
  },
  data() {
    return {
      param : {
        NKNAME : "",
        DGCODE:"",
        HOUR: "",
        MIN: "",
        DOCTXT: "",
        STDATE: "",
        STTIME: "",
        POSTION: ""
      },
      charData : this.$store.state.charData,
      dgData :[],
      dgImgUrl : "",
      dataHour : this.$store.state.dataHour,
      dataMin : this.$store.state.dataMin,
      picked: ref(new Date())
    };
  },
  props: {
    inputFormat: {
      type: String,
      required: false,
      default: 'yyyyMMdd',
    }
  },
  validate(key, val) {
    const errors = []

    if (!val) {
      errors.push(`${key} field is required`)
    }
    return errors
  },
  methods: {
    async changeChar (){

      await this.$callAPI("/userRoom/json/getDgData.data", 'post', this.param
        , (res) => {
          this.dgData = res.data;
        });
    },
    changeDg(){
      const dgList = this.dgData;
      let dgType;
      for(let i=0; i<dgList.length; i++) if(dgList[i].VAL==this.param.DGCODE) dgType =dgList[i].DGTYPE;
      this.setDgImg(dgType)
    },
    setDgImg(dgType){
      const list = this.$store.state.dgIcon;
      for(let i=0; i<list.length; i++){
        if(list[i].CODTYPE == 'MSTDG' && list[i].CODNUM == dgType) this.dgImgUrl = this.$store.state.servUrl+list[i].IMGSRC;
      }
    }
    ,
    async saveChk(){
      this.param.STDATE = moment(this.picked).format('YYYYMMDD');
      this.param.STTIME = this.param.HOUR+this.param.MIN+"00";

      if(!this.chkObj(this.param)) return;

      await this.$callAPI("/userRoom/json/chkJoin.data", 'post', this.param
          , (res) => {
            if(res.data >= 3){
              alert("주간 군단장 최대횟수를 초과하였습니다.(3회)");
              return;
            }
            this.saveRoom();
          });
    },
    async saveRoom(){
      await this.$callAPI("/userRoom/json/createRoom.data", 'post', this.param
          , (res) => {
            if(res && res.data){
              if(res.data == "S"){
                alert("저장에 성공하였습니다.");
                this.$router.push('/');
              }else if(res.data == "E2"){
                alert('수정할 수 없는 데이터 입니다.')
              }else if(res.data == "E5"){
                alert('입장할 수 있는 레벨이 아닙니다.')
              }else if(res.data == "E6"){
                alert('오늘 이전 날짜를 등록할 수 없습니다.')
              }else{
                alert("알 수 없는 에러 발생");
              }
            }else{
              alert("알 수 없는 에러 발생");
            }
          });
    },
    chkObj(obj){
      let key ="";
      for (key  in obj) {
        if(!obj[key]){
          this.$refs[key].focus();
          alert(this.$refs[key].name + "을 입력해주세요.");
          return false;
        }else if(!this.param.STDATE || this.param.STDATE =='Invalid date'){
          alert("날짜를 입력해주세요.");
          return false;
        }
      }
      return true;
    },
    gotoList(){
      this.$router.push('/');
    }
  },
  mounted() {
    this.dgImgUrl = require(`@/assets/loacon.jpg`);
  }
};
</script>

