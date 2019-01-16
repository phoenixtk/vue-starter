<template>
  <div :class="$style.stmodule">
    <vue-grid>
      <vue-grid-row>
        <vue-grid-item fill>
          <h1>Stmodule</h1>
        </vue-grid-item>

        <vue-grid-item fill>
          <vue-button
            :loading="incrementPending"
            @click='increment'
            accent>Increment +1
          </vue-button>
          <br/>
          <br/>
        </vue-grid-item>
        <vue-grid-item fill>
          <vue-button
            :loading="decrementPending"
            @click='decrement'
            primary>Decrement -1
          </vue-button>
          <h3>Count is {{ count }}</h3>
        </vue-grid-item>
        <vue-grid-item fill>
          <vue-button
            @click='stMethod'
            primary>Msg
          </vue-button>
          <h3>Msg is {{ msg }}</h3>
        </vue-grid-item>
      </vue-grid-row>
    </vue-grid>
  </div>
</template>

<script lang="ts">
  import { mapActions, mapGetters } from 'vuex';
  import { IPreLoad }               from '../../../server/isomorphic';
  import VueGrid                    from '../../shared/components/VueGrid/VueGrid.vue';
  import VueGridItem                from '../../shared/components/VueGridItem/VueGridItem.vue';
  import VueButton                  from '../../shared/components/VueButton/VueButton.vue';
  import VueGridRow                 from '../../shared/components/VueGridRow/VueGridRow.vue';

  export default {
    metaInfo:   {
      title: 'Stmodule',
    },
    components: {
      VueGrid,
      VueGridItem,
      VueButton,
      VueGridRow,
    },
    methods:    {
      ...mapActions('stmodule', [
        'increment',
        'decrement',
        'stMethod',
      ]),
    },
    computed:   {
      ...mapGetters('stmodule', ['count', 'incrementPending', 'decrementPending', 'msg']),
    },
    prefetch:   (options: IPreLoad) => {
      return options.store.dispatch('stmodule/increment');
    },
  };
</script>


<style lang="scss" module>
  @import "../../shared/styles";

  .stmodule {
    margin-top: $nav-bar-height;
    min-height: 500px;
  }
</style>
