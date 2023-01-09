<template>
  <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <h1>Your Punch QRcode is below:</h1>
        <div class="m-auto mt-3">
          <qrcode-vue :value="data" :size="250"></qrcode-vue>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* import */
import { useStore } from "vuex"
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'

const store = useStore()
const currentUser = store.state.currentUser
const baseURL = "http://localhost:3000/api/"
const data = ref("")

const getToken = () => localStorage.getItem("token");
function getQRcodeURL(user_id, token) {
  return `${baseURL}QRcode/${user_id}?token=${token}`;
}
data.value = getQRcodeURL(currentUser.id, getToken())
console.log(data.value)
</script>