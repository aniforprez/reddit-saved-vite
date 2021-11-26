<template>
  <input type="checkbox" :checked="theme" @change="toggleTheme" />
  <label for="theme">Dark theme</label>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import { useStore } from "vuex";

  export default defineComponent({
    setup() {
      const store = useStore();

      return {
        theme: computed(() => store.state.theme.theme === "dark"),
        toggleTheme() {
          store.dispatch("theme/toggleTheme");
        },
      };
    },
  });
</script>
