<template>
  <div :class="$style.aframe">
    <div :class="$style.header"></div>
    <div :class="$style.content">
      <div :class="$style.left">

        <button @click="changeA">change</button>
      </div>
      <div :class="$style.right">
        <vue-c-transition>
          <router-view :content="message"></router-view>
        </vue-c-transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapActions, mapGetters } from 'vuex';
  import { IPreLoad }               from '../../../server/isomorphic';
  import VueGrid                    from '../../shared/components/VueGrid/VueGrid.vue';
  import VueGridItem                from '../../shared/components/VueGridItem/VueGridItem.vue';
  import VueButton                  from '../../shared/components/VueButton/VueButton.vue';
  import VueGridRow                 from '../../shared/components/VueGridRow/VueGridRow.vue';
  import VueCTransition             from '../../login/components/VueCTransition/VueCTransition.vue';

  export default {
    data() {
      return {
        arr1: '',
        message: 'aaaaaa',
      };
    },
    metaInfo:   {
      title: 'Aframe',
    },
    components: {
      VueGrid,
      VueGridItem,
      VueButton,
      VueGridRow,
      VueCTransition,
    },
    methods:    {
      changeA() {
        this.setAMessage(333);
      },
      ...mapActions('aframe', [
        'setAMessage',
      ]),
      getData() {
        setTimeout( () => {
          this.arr1 = [ 1, 2, 3, 4, 5, 6];
        }, 3000);
      },
    },
    computed:   {
      ...mapGetters('aframe', ['getMessage']),
    },
    prefetch:   (options: IPreLoad) => {
      return options.store.dispatch('aframe/increment');
    },
    created() {
      setTimeout( () => {
        this.arr1 = [ 1, 2, 3, 4, 5, 6];
      }, 3000);
    },
  };
</script>


<style lang="scss" module>
  @import "../../shared/styles";

  .aframe {
    // margin-top: $nav-bar-height;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .header {
      height: 60px;
      background: #17BEBB;
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: row;

      .left {
        width: 300px;
        background: red;
      }

      .right {
        flex: 1;
        background: green;
      }
    }











  }
</style>
