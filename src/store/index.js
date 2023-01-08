import { createStore } from 'vuex'
import usersAPI from '../apis/users'

export default createStore({
  state: {
    currentUser: {
      id: -1,
      employeeId: -1,
      name: '',
      isAdmin: false
    },
    isAuthenticated: false
  },
  getters: {
  },
  //用來修改state的方法
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
    },

    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
    }
  },
  //透過API請求資料
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        const { id, employeeId, name, isAdmin } = data
        commit('setCurrentUser', {
          id,
          employeeId,
          name,
          isAdmin
        })
        return true
      } catch (error) {
        console.log(error.message)
        return false
      }
    }
  },
  modules: {
  }
})
