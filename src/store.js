import { createStore } from 'vuex'

import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state (){
        return{
            user: {},
            charData: {},
            minHour: {}
        }
    },
    mutations: {
        user(state, data){
            state.user = data;
        },
        charData(state, data){
            state.charData = data;
        },
        minHour(state, data){
            state.minHour = data;
        }
    },
    getters: {
      getUser(state){
          return state.user;
      },
        getChar(state){
            return state.charData;
        },
        getMinHour(state){
            return state.getMinHour;
        }
    },
    plugin: [
        persistedstate({
            paths: ['user']
        })
    ]
})

export default store;