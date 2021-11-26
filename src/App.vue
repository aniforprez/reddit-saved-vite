<template>
  <div class="dark:bg-gray-800 bg-gray-200 dark:text-gray-100 text-gray-800 h-screen">
    <div class="mb-4 block">
      <ThemeToggle />
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, onBeforeMount, watch } from "vue";
  import { useStore } from "vuex";
  import config from "@/config";

  import ThemeToggle from "@/components/ThemeToggle.vue";

  export default defineComponent({
    name: "App",
    components: {
      ThemeToggle,
    },
    setup() {
      const store = useStore();

      document.title = config.appTitle;

      function setTheme(theme: "dark" | "light") {
        theme === "light" ? document.querySelector("html")?.classList.remove("dark")
            : document.querySelector("html")?.classList.add("dark");
      }

      onBeforeMount(() => {
        store.dispatch("theme/initTheme");
        setTheme(store.state.theme.theme)
      });

      watch(
        computed(() => store.state.theme.theme),
        () => {
          setTheme(store.state.theme.theme)
        }
      );

      return {};
    },
  });
</script>

<style></style>
