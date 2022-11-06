<template>
  <v-btn class="apply-btn" color="#1B1B1B" @click="handleClick">
    Поиск
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "SearchButton",
  props: {
    handleClick: {
      type: Function,
      required: false,
      default: ()=> {}
    },
  }
});
</script>

<style scoped lang="scss">
.apply-btn {
  color: #FFFFFF;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}
</style>
