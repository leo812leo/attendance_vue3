<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">
      Titan 考勤系統
    </router-link>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!-- user is admin -->
        <!-- <router-link v-if="currentUser.isAdmin" to="#" class="text-white mr-3">
          管理員後台 -->
        <!-- </router-link> -->

        <!-- user is login -->
        <template v-if="isAuthenticated">
          <router-link to="#" class="text-white mr-3">
            {{ currentUser.name || '使用者' }} 您好
          </router-link>

          <button type="button" class="btn btn-sm btn-outline-success my-2 my-sm-0" @click.prevent.stop="logout">
            登出
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter();
const currentUser = computed(() => store.state.currentUser)
const isAuthenticated = computed(() => store.state.isAuthenticated)

const logout = () => {
  store.commit("revokeAuthentication");
  router.push("/signin");
};

</script>