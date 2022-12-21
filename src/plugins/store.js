import { createStore } from 'vuex'

const state = {
    user: null,
    claims: {},
    cart: {}
}

const getters = {
    user: state => state.user,
    claims: state => state.claims,
    cart: state=> state.cart
}

const store = new createStore({
    state,
    getters,
    mutations: {
        updateUser (state, { user }){
            state.user = user
        },
        updateClaims (state, claims) {
            state.claims = claims
        }
    }
})

export default store