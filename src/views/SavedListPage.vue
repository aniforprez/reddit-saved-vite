<template>
  <div>
    List of saved items
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
      if (store.state.auth.authStatus === "unauthenticated") {
        router.push({
          name: "Unauthenticated"
        })
      }
    })

    return {
      redirectURL: computed(() => store.getters["auth/redirectURL"])
    }
  },
})
</script>
