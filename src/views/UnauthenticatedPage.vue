<template>
  <div>
    <a :href="redirectURL">Click to login to Reddit</a>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    onBeforeMount(() => {
      if (store.state.auth.authStatus === "authenticated") {
        router.push({
          name: "SavedList"
        })
      }
    })

    return {
      redirectURL: computed(() => store.getters["auth/redirectURL"])
    }
  },
})
</script>
