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
    <label for="inputEmail" class="sr-only">던전</label>

    <button class="btn btn-lg btn-primary btn-block" type="button" @click="UserLogin">로그인</button>
    <p class="mt-5 mb-3 text-muted"></p>
  </form>
</template>
<style>

</style>

<script>
export default {
  name: "CreateRoom",

  dgImg(){
    return this.$store.state.getDgIcon;
  },
  data() {
    return {
      param : {
        NKNAME : "",
        DGCODE:"",
      },
      charData : this.$store.state.charData,
      dgData :[],
      dgImgUrl : ""
    };
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

