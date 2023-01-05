<!-- <script setup lang="ts">
import { ref } from "vue";
// import QRCodeVue3 from "qrcode-vue3";
import { useGeolocation } from "@vueuse/core";
import { useRouter } from "vue-router";
const { coords } = useGeolocation();
const router = useRouter();
const basicUrl = "http://localhost:3000";
const jwtToken = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const startTime = ref("--:--:--");
const endTime = ref("--:--:--");
const qrSwitch = ref(false);
let qrCodeUrl = "";
// const qrcodeValue = ref(`${basicUrl}/checkIn/qrCode/${qrCodeUrl}/${1}`);
// async function preQrcode() {
//   try {
//     let preQrCodeRes = await fetch(`${basicUrl}/checkIn/preQrCode`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${jwtToken}`,
//       },
//       body: JSON.stringify({
//         location: {
//           latitude: coords.value.latitude,
//           longitude: coords.value.longitude,
//         },
//       }),
//     });
//     preQrCodeRes = await preQrCodeRes.json();
//     if (preQrCodeRes.status === 200) {
//       qrCodeUrl = preQrCodeRes.message;
//       qrcodeValue.value = `${basicUrl}/checkIn/qrCode/${qrCodeUrl}/${userId}`;
//       qrSwitch.value = !qrSwitch.value;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

async function checkIn() {
  try {
    let checkInRes = await fetch(`${basicUrl}/checkIn/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        userId: userId,
        location: {
          latitude: coords.value.latitude,
          longitude: coords.value.longitude,
        },
      }),
    });
    checkInRes = await checkInRes.json();
    if (checkInRes.status === 200) {
      if (checkInRes.startTime !== "Invalid date") {
        startTime.value = checkInRes.startTime.split(" ")[1];
      }
      if (checkInRes.endTime !== "Invalid date") {
        endTime.value = checkInRes.endTime.split(" ")[1];
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("routerAuth");
  router.push("/");
}
</script>

<template>
  <div class="checkDiv">
    <button class="checkButton" @click="checkIn">簽到</button>
    <div v-if="qrSwitch">
      <QRCodeVue3 :width="100" :height="100" :value="qrcodeValue" />
    </div>
    <button class="qrCodeButton" @click="preQrcode">QR code</button>
    <div class="timePoint">
      <p>上班時間</p>
      <p>{{ startTime }}</p>
    </div>
    <div class="timePoint">
      <p>下班時間</p>
      <p>{{ endTime }}</p>
    </div>
    <button class="logoutButton" @click="logout">Logout</button>
  </div>
</template>

<style scoped>
.checkDiv {
  width: 30%;
  margin: auto;
  margin-top: 5%;
  background-color: rgb(175, 212, 241);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.checkButton {
  width: 100px;
  margin-top: 4%;
  height: 100px;
  border-radius: 100%;
}

.qrCodeButton {
  width: 50px;
  margin-top: 4%;
  height: 50px;
  border-radius: 100%;
}

.timePoint {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 50px;
  width: 50%;
  margin-bottom: 1%;
}

.timePoint > p {
  line-height: 50px;
  margin-top: 0%;
  margin-left: 5%;
}
</style> -->
<template>

</template>
<script></script>