import { createStore } from 'vuex'

import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state (){
        return{
            user: {}
        }
    },
    mutations: {
        user(state, data){
            state.user = data;
        }
    },
    plugin: [
        persistedstate({
            paths: ['user']
        })
    ]
})

export default store;