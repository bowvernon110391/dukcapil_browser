import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const axios = require('axios').default
const qs = require('qs')


export default new Vuex.Store({
  state: {
    searching: false,
    searchDirty: false,
    searchDialogOpen: false,

    searchParams: {
      nama: '',
      namaIbu: '',
      nip: 'null',
      noKK: '',
      nik: '',
      tempatLahir: '',
      tglLahir: '',
      provinsi: '',
      kabupaten: '',
      kecamatan: '',
      kelurahan: ''
    },

    searchPage: 1,

    searchResult: [],

    errors: [],

    apiInstance: axios.create({
      baseURL: process.env.VUE_APP_API_BASE_URL,
      timeout: process.env.VUE_APP_API_TIMEOUT,
      paramsSerializer: (params) => {
        return qs.stringify(params)
      }
    }),

    overlayImgData: null
  },
  mutations: {
    openDialog(state) {
      state.searchDialogOpen = true
    },

    setErrors(state, payload) {
      state.errors = payload
    },

    pushError(state, payload) {
      state.errors.push(payload)
    },

    resetErrors(state) {
      state.errors = []
    },

    closeDialog(state) {
      state.searchDialogOpen = false
    },

    setDirtyFlag(state, payload) {
      state.searchDirty = payload
    },

    setSearchParams(state, payload) {
      state.searchParams = payload
    },

    resetSearchParams(state) {
      state.searchParams = {
        nama: '',
        namaIbu: '',
        nip: '',
        noKK: '',
        nik: '',
        tempatLahir: '',
        tglLahir: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: ''
      }
    },

    setSearchResult(state, payload) {
      state.searchResult = payload
    },

    setSearchState(state, payload) {
      state.searching = payload
    },

    gotoPage(state, payload) {
      state.searchPage = payload
    },

    setOverlayImgData(state, payload) {
      state.overlayImgData = payload
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getDialogOpenState(state, getters) {
      return state.searchDialogOpen
    },

    isError(state) {
      return state.errors.length > 0
    },

    api(state) {
      return state.apiInstance
    }
  }
})
