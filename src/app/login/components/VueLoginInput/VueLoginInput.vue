<template>
  <div :class="$style.vueLoginInput">
    <span><i :class="icon"></i></span>
    <vue-input :name="name" :id="userId"/>
  </div>
</template>

<script lang="ts">
  import VueInput                    from '../../../shared/components/VueInput/VueInput.vue';

  export default {
    name: 'VueLoginInput',
    props: {
      name:     {
        type:     String,
        required: true,
      },
      id:       {
        type:     Number,
        require:  true,
      },
      icon:       {
        type:     String,
        require:  true,
      },
    },
    components: {
      VueInput,
    },
    data(): any {
      return {
        name: '',
      };
    },
    computed:   {},
    methods:    {},
  };
</script>

<style lang="scss" module>
  .vueLoginInput {
    display: block;
  }
</style>
