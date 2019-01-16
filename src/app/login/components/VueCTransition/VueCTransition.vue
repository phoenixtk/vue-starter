<template>
  <transition
    :enter-class="$style.enter"
    :enter-active-class="$style.enterActive"
    :enter-to-class="$style.enterTo"
    :leave-class="$style.leave"
    :leave-active-class="$style.leaveActive"
    :leave-to-class="$style.leaveTo"
    mode="out-in"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
  export default {
    name: 'VueCTransition',
  };
</script>

<style lang="scss" module>
  @import "../../../shared/styles";

  .enterActive, .leaveActive {
    transition: all .3s ease;
  }

  .enterTo, .leave {
    opacity: 1;
  }

  .enter, .leaveTo {
    opacity: 0;
  }
</style>
