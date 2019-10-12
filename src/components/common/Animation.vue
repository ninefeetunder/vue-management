<template>
  <transition name="fade" mode="out-in">
    <slot></slot>
  </transition>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
  .fade-enter,
  .fade-leave-to
    opacity: 0
  .fade-enter-to,
  .fade-leave
    opacity: 1
  .fade-enter-active,
  .fade-leave-active
    transition: all .3s
</style>
