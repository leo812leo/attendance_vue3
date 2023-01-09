<template>
  <div class="container py-5">
    <form class="w-100"  @submit.prevent.stop="login">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign In
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label>employeeId</label>
        <input
          v-model="inputData.employeeId"
          id="employeeId"
          name="employeeId"
          type="employeeId"
          class="form-control"
          placeholder="employeeId"
          autocomplete="username"
          required
          autofocus
        >
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          v-model="inputData.password"
          id="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
        >
      </div>

          <button class="btn btn-lg btn-primary btn-block mb-3" type="submit" :disabled="isProcessing">
            Submit
          </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2017-2018
      </p>
    </form>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useStore } from "vuex"
import { useRouter } from 'vue-router'
import authorizationAPI from '../apis/authorization'
import { Toast } from './../utils/helpers'

const router = useRouter()
const store = useStore()
let isProcessing = ref(false)
const inputData = reactive({
  employeeId: '',
  password: ''
})

//function
const login = async function () {
  try {
    if (!inputData.employeeId || !inputData.password) {
      Toast.fire({
        icon: 'warning',
        title: 'employeeId and Password are both required'
      })
      return
    }

    isProcessing.value = true

    const response = await authorizationAPI.userLogin({
      employeeId: inputData.employeeId,
      password: inputData.password
    })

    const { data } = response
    if (data.status !== 'success') {
      throw new Error(data.message)
    } else {
      localStorage.setItem('token', data.token)
      //使用者資料存入vuex
      store.commit('setCurrentUser', data.user)
      router.push("/mainpage")
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
    }
  } catch (error) {
    Toast.fire({
      icon: 'warning',
      title: 'employeeId or Password incorrect'
    })
    // 因為登入失敗，所以要把按鈕狀態還原
    isProcessing.value = false
  }
}
</script>