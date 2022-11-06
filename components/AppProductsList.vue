<template>
  <div class="product-list">
    <div v-if="isLoaded && products.length > 0" class="product-list__content">
      <v-switch
        v-model="isCardView"
        :label="switchLabel"
      />
      <div class="product-list__container">
        <AppProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          :is-card-view="isCardView"
        />
      </div>
      <v-pagination
        v-model="currentPage"
        class="product-list__pagination"
        color="#1B1B1B"
        :length="totalPages"
      />
    </div>
    <CardSkeleton v-if="!isLoaded"/>
    <p class="product-list__no-data" v-if="products.length === 0">Нет результатов</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useStore } from "@nuxtjs/composition-api";
import AppProductCard from "~/components/AppProductCard.vue";
import CardSkeleton from "~/components/ui/CardSkeleton.vue";

export default defineComponent({
  name: "AppProductsList",
  components: {
    CardSkeleton,
    AppProductCard
  },
  setup() {
    const store = useStore();
    const {getters, commit, dispatch} = store
    const isCardView = ref(true)
    const isLoaded = computed(() => getters.getIsLoaded);
    const products = computed(() => getters.getPageableProducts);
    const totalPages = computed(() => getters.getTotalPages);
    const switchLabel = computed(()=> isCardView.value ? "Показать в виде списка" : "Показать в виде карточек")

    const currentPage = computed({
      get: () => getters.getPageNumber,
      set: (val) => {
        if (!val) {
          return;
        }
        commit("setCurrentPage", val);
        dispatch("fetchProducts");
      }
    });

    return {
      isLoaded,
      products,
      isCardView,
      switchLabel,
      totalPages,
      currentPage
    };
  }
});
</script>

<style scoped lang="scss">
.product-list {
  position: relative;
  margin-top: 120px;
  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  &__pagination {
    margin-top: 1rem;
  }

  &__no-data {
    font-size: 3rem;
    color: #1B1B1B;
  }
}


</style>
