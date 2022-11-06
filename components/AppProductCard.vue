<template>
    <v-dialog
      class="product-dialog"
      transition="dialog-top-transition"
      max-width="60%"
    >
      <template #activator="{ on }">
        <div v-if="isCardView" class="product-card">
            <img class="product-card__img" :src="refProduct.image" :alt="refProduct.title" v-on="on">
            <p class="product-card__title">{{ refProduct.title }}</p>
            <div class="product-card__price-container">
              <p class="product-card__price">{{ refProduct.price }}</p>
            </div>
            <CardButton :is-add-to-basket="isAddToBasket" card-width="100%" @add="toggleToBasket"/>
        </div>
        <div v-else class="product-list">
          <div class="product-list__text">
          <p class="product-list__title" v-on="on">{{ refProduct.title }}</p>
          <div class="product-list__info-container">
            <p class="product-list__category">{{ refProduct.category }}</p>
            <p class="product-list__price">{{ refProduct.price }}</p>
          </div>
          </div>
          <div class="product-list__img-container">
            <img class="product-list__img" :src="refProduct.image" :alt="refProduct.title">
          </div>
          <CardButton :is-add-to-basket="isAddToBasket" card-width="5%" :is-show-text="false"  @add="toggleToBasket"/>
        </div>
      </template>
      <template #default>
        <v-card>
          <v-toolbar class="product-dialog__header">
            <p class="product-dialog__title">{{ refProduct.title }}</p>
          </v-toolbar>
          <v-card-text>
            <div class="pa-8">
              <p class="product-dialog__description">{{ refProduct.description }}</p>
              <img class="product-dialog__img" :src="refProduct.image" :alt="refProduct.title">
              <p class="product-card__price product-dialog__price">{{ refProduct.price }}</p>
              <p class="product-dialog__category">{{ refProduct.category }}</p>
            </div>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "@nuxtjs/composition-api";
import { IProduct } from "~/models";
import CardButton from "~/components/ui/CardButton.vue";

export default defineComponent({
  name: "AppProductCard",
  components: { CardButton },
  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: true
    },
    isCardView:{
      type: Boolean,
      required: true,
      default: true
    }
  },
  setup(props) {
    const refProduct = computed(()=> props.product);

    const isAddToBasket = ref(false);

    function toggleToBasket() {
      isAddToBasket.value = !isAddToBasket.value;
    }

    return {
      refProduct,
      isAddToBasket,
      toggleToBasket
    };
  }
});
</script>

<style scoped lang="scss">
@import "../assets/css/variables";
.product-card {
  width: 30%;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 16px;
  line-height: 1.15;
  margin-bottom: 60px;
  align-items: flex-start;
  justify-content: flex-end;
  &:hover {
    cursor: pointer;
  }
  @media screen and (min-width: $monitor) and (max-width: $lmonitor) {
    width: 45%;
  }
  @media screen and (max-width: $monitor) {
    width: 100%;
  }

  &__img {
    margin: 0 auto;
    max-height: 300px;
    max-width: 90%;
    background-size: cover;
    background: 50% 50% no-repeat;
    transition: transform 0.5s ease;
    &:hover {
      transform: scale(1.05);
    }
  }

  &__title {
    width: 100%;
    text-align: start;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400;
    color: #000000;
    margin-top: 15px;
  }

  &__price-container {
    margin-top: 5px;
    display: flex;
  }

  &__price {
    font-weight: 600;

    &:before {
      content: "$";
    }
  }
}

.product-list {
  margin-top: 20px;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $main;
  text-align: left;
  transition: transform 0.5s ease;
  &:hover {
    cursor: pointer;
    transform: translateY(-20px);
  }
  @media screen and (min-width: $mobile) and (max-width: $tablet) {
    height: 150px;
  }
  &__text {
    display: flex;
    width: 50%;
    justify-content: space-between;
    @media screen and (min-width: $mobile) and (max-width: $tablet) {
      flex-direction: column;
      width: 40%;
    }
  }

  &__title {
    margin: 0;
    text-align: left;
    width: 80%;
  }
  &__info-container {
    width: 15%;
  }

  &__category {
  }

  &__price {
    margin: 0;
    font-weight: 600;
    &:before {
      content: "$";
    }
  }
  &__img-container {
    height: 100%;
    width: 20%;

  }
  &__img {
    height: 100%;
    margin: 0 auto;
    @media screen and (min-width: $mobile) and (max-width: $tablet) {
      height: 60%;
      margin: 0;
    }
  }
}

.product-dialog {
  &__header {
    width: 100%;
    padding: 2rem !important;
    min-height: 50px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $secondary !important;
  }

  &__title {
    margin: 0;
    color: white;
    font-size: 1.5rem;
  }

  &__description {

  }

  &__img {
    max-height: 50vw;
  }

  &__close {
    color: black !important;
  }

}

</style>
