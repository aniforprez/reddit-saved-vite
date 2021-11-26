<script lang="ts">
  import { defineComponent, onBeforeMount, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useStore } from "vuex";

  export default defineComponent({
    setup() {
      const store = useStore();
      const router = useRouter();
      const route = useRoute();

      onBeforeMount(() => {
        if (store.state.auth.authStatus === "authenticated") {
          router.push({
            name: "SavedList",
          });
        }
      });
      onMounted(() => {
        store.dispatch("auth/authenticateRedditWithCode", route.query.code).then(() => {
          router.push({
            name: "SavedList",
          });
        });
      });
    },
  });
</script>
