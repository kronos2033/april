<template>
  <div class="skeleton__container">
    <v-skeleton-loader
      v-for="item in 6"
      :key="item"
      class="skeleton__item"
      type="card"
    />
  </div>
</template>

<script>
export default {
  name: "CardSkeleton",
};
</script>

<style lang="scss" scoped>
@import "~assets/css/variables";

.skeleton__container {
  display: flex;
  flex-basis: 600px;
  margin-top: 120px;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.skeleton__item {
  width: 30%;
  height: 450px;
  @media screen and (min-width: $monitor) and (max-width: $lmonitor) {
    width: 45%;
  }
  @media screen and (max-width: $monitor) {
    width: 100%;
  }
}
</style>
