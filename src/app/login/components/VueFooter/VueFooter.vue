<template>
  <div :class="$style.vueFooter">
    <p>版权所有@2018 大连东科软件有限公司</p>
  </div>
</template>

<script lang="ts">
  export default {
    name:       'VueFooter',
    components: {},
    props:      {},
    data(): any {
      return {};
    },
    computed:   {},
    methods:    {},
  };
</script>

<style lang="scss" module>
  .vueFooter {
    display: block;

    p {
      font-size: 12px;
      color: #ccc;
      margin-bottom: 10px;
    }
  }
</style>
