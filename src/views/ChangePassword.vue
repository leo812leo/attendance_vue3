<template>
  <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="currentPassword">Current Password</label>
            <input type="password" class="form-control" name="currentPassword" id="currentPassword"
              placeholder="Current Password" v-model.trim="inputData.currentPassword">
          </div>

          <div class="mb-3">
            <label for="newPassword">New Password</label>
            <input type="password" class="form-control" name="newPassword" id="newPassword" placeholder="New Password"
              v-model.trim="inputData.newPassword">
          </div>

          <div class="mb-3">
            <label for="checkPassword" class="mb-2">Confirm New Password</label>
            <input type="password" class="form-control" name="checkPassword" id="checkPassword"
              placeholder="Confirm Password" v-model.trim="inputData.checkPassword">
          </div>
          <button type="submit" class="btn btn-primary btn-block">Submit</button>
        </form>
        <div class="mt-3 m-auto">
          <router-link to="/homepage" class="btn btn-primary btn-lg">Back</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from '../utils/helpers'
import userAPI from '../apis/users'
import { useStore } from "vuex"
/* declare */
//system
const store = useStore()
const router = useRouter()
const inputData = reactive({
  currentPassword: '',
  newPassword: '',
  checkPassword: ''
})
async function onSubmit() {
  try {
    if (!inputData.currentPassword || !inputData.newPassword || !inputData.checkPassword) {
      Toast.fire({
        icon: 'warning',
        title: 'Three fields are all required'
      })
      return
    } else if (inputData.currentPassword === inputData.newPassword) {
      inputData.newPassword = ''
      inputData.checkPassword = ''
      Toast.fire({
        icon: 'warning',
        title: 'Current and New passwords are same'
      })
      return
    } else if (inputData.newPassword !== inputData.checkPassword) {
      inputData.newPassword = ''
      inputData.checkPassword = ''
      Toast.fire({
        icon: 'warning',
        title: 'Check again, passwords are different'
      })
      return
    }
    const response = await userAPI.changPassword(
      {
        currentPassword: inputData.currentPassword,
        newPassword: inputData.newPassword,
        checkPassword: inputData.checkPassword,
        employeeId: store.state.currentUser.employeeId
      })
    console.log(response)
    const { data } = response

    if (data.status !== 'success') {
      throw new Error(data.message)
    }
    store.commit("revokeAuthentication")
    router.push("/signin")
  } catch (error) {
    console.log("---------")
    console.log(error)
    inputData.newPassword = ''
    inputData.checkPassword = ''
    Toast.fire({
      icon: 'warning',
      title: `${error.message}`
    })
  }
}
</script>