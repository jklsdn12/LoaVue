<template>
  <form class="form-signin">
    <img class="mb-4" :src="`${dgImgUrl}`" alt="" width="144" height="144">
    <h1 class="h3 mb-3 font-weight-normal"></h1>
    <label for="inputEmail" class="sr-only">캐릭터</label>

    <select v-model="param.NKNAME" @change="changeChar">
        <option selected="selected">선택</option>
        <option v-for="option in charData" :value="option.VAL" v-bind:key="option">
          {{ option.TEXT }}
        </option>
    </select>

    <label for="inputEmail" class="sr-only">던전</label>
    <select v-model="param.DGCODE" @change="changeDg">
      <option selected="selected">선택</option>
      <option v-for="option in dgData" :value="option.VAL" v-bind:key="option">
        {{ option.TEXT }}
      </option>
    </select>
    <p/>

    <label for="inputEmail" class="sr-only">날짜/시간</label>
    <div>
      <datepicker v-model="picked"
                  :clearable="true"
                  :inputFormat="inputFormat"/>
    </div>
    <select v-model="param.HOUR">
      <option selected="selected">선택</option>
      <option v-for="(item, index) in dataHour" :value="item.value" v-bind:key="index">
        {{item.id}}
      </option>
    </select>
    &nbsp;
    <select v-model="param.MIN" >
      <option selected="selected">선택</option>
      <option  v-for="(item2, index) in dataMin"  :value="item2.value" v-bind:key="index">
        {{item2.id}}
      </option>
    </select>
    <p/>

    <button class="btn btn-lg btn-primary btn-block" type="button" @click="UserLogin">저장</button>
    <button class="btn btn-lg btn-primary btn-block" type="button" @click="UserLogin">리스트</button>
    <p class="mt-5 mb-3 text-muted"></p>
  </form>
</template>
<style>

</style>

<script>
import Datepicker from 'vue3-datepicker';
import { ref } from 'vue'

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
        MIN: ""
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
  methods: {
    async changeChar (){

      await this.$callAPI("/userRoom/json/getDgData.data", 'post', this.param
        , (res) => {
          this.dgData = res.data;
          console.log(res.data);
        });
    },
    changeDg(){
      const dgList = this.dgData;
      const list = this.$store.state.dgIcon;
      let dgType;
      for(let i=0; i<dgList.length; i++) if(dgList[i].VAL==this.param.DGCODE) dgType =dgList[i].DGTYPE;


      for(let i=0; i<list.length; i++){
        if(list[i].CODTYPE == 'MSTDG' && list[i].CODNUM == dgType) this.dgImgUrl = this.$store.state.servUrl+list[i].IMGSRC;
      }
    }
  },
  mounted() {
    this.dgImgUrl = require(`@/assets/loacon.jpg`);
  }
};
</script>

