<template>
  <v-btn
    class="apply-btn"
    :color="btnColor"
    :style="{ 'width': cardWidth }"
    @click="click"
  >
    <span
      v-if="isShowText"
      :class="{'apply-btn__label_added': isAddToBasket}"
      class="apply-btn__label"
    >
      {{ btnText }}
    </span>
    <span class="apply-btn__icon" :class="{'apply-btn__icon_added': isAddToBasket}"/>
  </v-btn>
</template>

<script lang="ts">
import { computed, defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "CardButton",
  props: {
    isAddToBasket: {
      type: Boolean,
      required: true
    },
    cardWidth: {
      type: String,
      default: "100%",
      required: false
    },
    isShowText: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(props, {emit}) {
    const btnText = computed(()=> props.isAddToBasket ? "Добавлено" : "Добавить в корзину" )
    const btnColor = computed(()=> props.isAddToBasket ? "#FFFFFF" : "#2E2E2E")

    const click = () => emit("add")

    return {
      btnText,
      btnColor,
      click
    }
  }
});
</script>

<style scoped lang="scss">
.apply-btn {
  width: 100%;
  //min-width: 345px;
  height: 60px;
  border-radius: 0;
  display: flex;
  justify-content: space-between;

  &__label {
    color: white;
    font-weight: 500;
    font-size: 18px;
    line-height: 1.25;
    &_added {
      color: #000000;
    }
  }

  &__icon {
    background: url("../../static/plus.svg") 50% 50% no-repeat;
    display: block;
    width: 15px;
    height: 15px;
    &_added {
      background: url("../../static/added.svg") 50% 50% no-repeat !important;
    }
  }
}
</style>
