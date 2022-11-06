<template>
  <div class="index-page">
    <AppFilters/>
    <AppProductsList/>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore, onMounted } from "@nuxtjs/composition-api";
import AppFilters from "~/components/AppFilters.vue";
import AppProductsList from "~/components/AppProductsList.vue";

export default defineComponent({
  name: "IndexPage",
  components: { AppFilters, AppProductsList },
  setup() {
    const store = useStore();
    const { dispatch } = store

    onMounted(() => dispatch("fetchInitialData"));
  }
});
</script>
