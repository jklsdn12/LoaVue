import { createStore } from 'vuex'

import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state (){
        return{
            user: {},
            charData: {},
            dataHour: [],
            dataMin: [],
            userIcon:[],
            dgIcon:[],
            servUrl : "http://211.53.209.103:8080/"
        }
    },
    mutations: {
        user(state, data){
            state.user = data;
        },
        charData(state, data){
            state.charData = data;
        },
        dataHour(state, data){
            state.dataHour = data;
        },
        dataMin(state, data){
            state.dataMin = data;
        },
        dgIconUrl(state, data){
          state.dgIcon = data;
        },
        userIconUrl(state, data){
          state.userIcon = data;
        }
    },
    getters: {
      getUser(state){
          return state.user;
      },
        getChar(state){
            return state.charData;
        },
        getDataHour(state){
            return state.dataHour;
        },
        getDataMin(state){
            return state.dataMin;
        },
        getUserIcon(state){
          return state.userIcon;
        },
        getDgIcon(state){
          return state.dgIcon;
        },
        getServUrl(state){
          return state.servUrl;
        }
    },
    plugin: [
        persistedstate({
            paths: ['user']
        })
    ]
})

export default store;
