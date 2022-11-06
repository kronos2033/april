<template>
  <div class="filters">
    <div class="filters__container">
      <v-text-field
        v-model="searchWord"
        class="filters__input"
        background-color="#E5E5E5"
        height="61px"
        filled
        clearable
        label="Поисковое слово"
      />
    </div>
    <div class="filters__container">
      <v-select
        v-model="selectedCategory"
        class="filters__select"
        background-color="#E5E5E5"
        height="61px"
        flat
        :items="categoryOptions"
        clearable
        label="Категория продукта"
        filled
      />
    </div>
    <div class="filters__container filters__container_btn">
      <SearchButton class="filters__btn" :handle-click="filter"/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from "@nuxtjs/composition-api";
import SearchButton from "~/components/ui/SearchButton.vue";

export default defineComponent({
  name: "AppFilters",
  components: {SearchButton},
  setup() {
    const store = useStore()
    const { getters, commit } = store

    const searchWord = computed({
      get: () => getters.getSearchWord,
      set: (val) => commit("setSearchWord", val)
    })

    const categoryOptions = computed(()=> getters.getCategories)

    const selectedCategory = computed({
      get: () => getters.getSelectedCategory,
      set: (val) => commit("setSelectedCategory", val)
    })

    const filter = () => commit("setFilteredProducts")

    return {
      searchWord,
      categoryOptions,
      selectedCategory,
      filter
    };
  }
});
</script>

<style scoped lang="scss">
@import "~assets/css/variables";

.filters {
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-end;
}

.filters__container {
  align-items: flex-start;
  display: flex;
  flex-basis: 31%;
  width: 100%;
  @media screen and (max-width: 1000px) {
    flex-basis: 48%;
    &_btn {
      flex-basis: 100%;
    }
  }
  @media screen and (min-width: $mobile) and (max-width: $tablet) {
    flex-basis: 100%;
  }
}

.v-select__slot, .filters__input, .filters__select, .filters__btn {
  width: 100%;
  height: 61px !important;
  border-radius: 0 !important;
}

.filters__select.v-text-field>.v-input__control>.v-input__slot:before {
  border-style: none;
}

.filters__select.v-text-field>.v-input__control>.v-input__slot:after {
  border-style: none;
}


</style>
