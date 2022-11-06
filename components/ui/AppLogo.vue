<template>
  <img class="app-logo" src="../../static/icons/rgm_logo.svg" alt="logo">
</template>

<script>
import {defineComponent} from "@nuxtjs/composition-api";

export default defineComponent({
  name: "AppLogo",
});
</script>

<style scoped lang="scss">
  .app-logo {
    width: 100px;
  }
</style>
