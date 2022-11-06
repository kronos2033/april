<template>
  <v-app>
    <div class="error-page">
      <h1 class="error-page__title">{{ errorTitle }}</h1>
      <NuxtLink to="/">Вернуться на главную</NuxtLink>
    </div>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, useMeta, computed } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const pageNotFound = "404";
    const otherError = "Неизвестная ошибка";
    const errorTitle = computed(() => props.error.statusCode === 404 ? pageNotFound : otherError);

    useMeta(() => ({ title: errorTitle.value }));

    return {
      errorTitle
    };
  },
  head: {},
});
</script>

<style scoped lang="scss">
.error-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.error-page__title {
  font-size: 72px;
}
</style>
