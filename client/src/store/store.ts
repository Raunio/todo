import Vuex from 'vuex';

export default new Vuex.Store({
    state: {
        user: null,
        token: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        }
    },
    actions: {},
    getters: {
        isLoggedIn(state) {
            return state.token ? true : false;
        },
        getUser(state) {
            return state.user;
        },
        getToken(state) {
            return state.token;
        }
    }
});