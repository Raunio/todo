import Vuex from 'vuex';

export default new Vuex.Store({
    state: {
        user: null,
        token: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', user);
        },
        setToken(state, token) {
            /**
             * Token should not be stored in state and localstorage
             */
            localStorage.setItem('token', token);
            state.token = token;
        }
    },
    actions: {},
    getters: {
        isLoggedIn(state) {
            return state.token || localStorage.getItem('token');
        },
        getUser(state) {
            return state.user ? state.user : localStorage.getItem('user');
        },
        getToken(state) {
            return state.token ? state.token : localStorage.getItem('token');
        }
    }
});
