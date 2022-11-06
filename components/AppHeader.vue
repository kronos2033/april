<template>
<div class="app-header">
  <AppLogo/>
  <div class="app-header__secondary">
    <p class="app-header__text app-header__profile">Профиль</p>
    <p class="app-header__text app-header__basket">Корзина</p>
  </div>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from "@nuxtjs/composition-api";
import AppLogo from "~/components/ui/AppLogo.vue";

export default defineComponent({
  name: "AppHeader",
  components: {
    AppLogo
  },
  setup() {
    const store = useStore()
    const { getters } = store
    const basketCount = computed(()=> getters.getSelectedProducts.length)

    return { basketCount }
  }
});
</script>

<style scoped lang="scss">
  .app-header {
    padding: 0 50px;
    width: 100%;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #BDBDBD;
    background: #FFFFFF;
    z-index: 2;
  }

  .app-header__secondary {
    display: flex;
    justify-content: space-between;
    width: 182px;
  }
  .app-header__text {
    margin: 0;
  }
</style>
