<template>
  <div :class="$style.stone">
    <form :class="$style.stform" @submit.prevent="onSubmit" ref="stform">
      <vue-grid-row>
        <vue-grid-item>
          <vue-input
            name="firstname"
            id="firstname"
            required
            v-validate="'required|email'"
            v-model="form.firstname" />
          <span v-show="errors.has('firstname')" >{{ errors.first('firstname') }}</span>
        </vue-grid-item>
      </vue-grid-row>
      <vue-grid-row>
        <vue-grid-item>
          <vue-input
            name="lastname"
            id="lastname"
            required
            placeholder="Last Name"
            validation="required"
            v-model="form.lastname" />
        </vue-grid-item>
      </vue-grid-row>
      <vue-grid-row>
        <vue-grid-item>
          <vue-button
            @click="stsubmit"
            primary>
            Save
          </vue-button>
        </vue-grid-item>
      </vue-grid-row>
    </form>
  </div>
</template>

<script lang="ts">
  import { mapActions, mapGetters } from 'vuex';
  import { IPreLoad }               from '../../../../server/isomorphic';
  import VueGrid                    from '../../../shared/components/VueGrid/VueGrid.vue';
  import VueGridItem                from '../../../shared/components/VueGridItem/VueGridItem.vue';
  import VueButton                  from '../../../shared/components/VueButton/VueButton.vue';
  import VueGridRow                 from '../../../shared/components/VueGridRow/VueGridRow.vue';
  import VueInput                   from '../../../shared/components/VueInput/VueInput.vue';

  export default {
    $_veeValidate: {
      validator: 'new',
    },
    metaInfo:   {
      title: 'Stone',
    },
    components: {
      VueGrid,
      VueGridItem,
      VueButton,
      VueGridRow,
      VueInput,
    },
    data(): any {
      return {
        form: {
          firstname: '',
          lastname: '',
        },
      };
    },
    methods:    {
      ...mapActions('stone', [
        'getUserList',
      ]),
      onSubmit() {
        console.log(this.$validator);
        console.log(this.errors);
        console.log('onSubmit');
      },
      stsubmit() {
        this.onSubmit();
      },
    },
    computed:   {
      ...mapGetters('stone', ['userList']),
    },
    prefetch:   (options: IPreLoad) => {
      return options.store.dispatch('stone/getUserList');
    },
  };
</script>


<style lang="scss" module>
  @import "../../../shared/styles";

  .stone {
    margin-top: $nav-bar-height;
    min-height: 500px;
  }
</style>
