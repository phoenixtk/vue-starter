<template>

  <div :class="$style.wrapbox" ref="stage">
    <div :class="$style.wxymodule">
      <div :class="$style.animate" v-if="show">
        <form :class="$style.formExample" @submit.prevent="onSubmit">
          <div :class="$style.contentbox">
            <vue-grid>
              <vue-grid-row :class="$style.LogoRow">
                <vue-grid-item fill >
                  <p><img src="/MTA.png" alt=""></p>
                </vue-grid-item>
              </vue-grid-row>

              <vue-grid-row :class="$style.TextRow">
                <vue-grid-item fill>
                  <p>在线考试平台</p>
                </vue-grid-item>
              </vue-grid-row>
              <vue-grid-row :class="$style.UserRow">
                <vue-grid-item fill>
                  <vue-input
                    :name="user.name"
                    :id="user.id"
                    :placeholder="user.placeholder"
                    :required="user.required"
                    :value = "user.value"
                    :errorMessage = "user.errorMessage"
                    logourl="/zhanghao.png"
                    addClass="loginInput"
                    validation="required"
                    v-model="form.userName"

                  />
                </vue-grid-item>
              </vue-grid-row>

              <vue-grid-row :class="$style.PassRow">
                <vue-grid-item fill>
                    <vue-input
                      :name="password.name"
                      :id="password.id"
                      :placeholder="password.placeholder"
                      :required="password.require"
                      :value = "password.value"
                      type="password"
                      logourl="/mima.png"
                      addClass="loginInput"
                      validation="required"
                      v-model="form.passWord"

                    />
                </vue-grid-item>
              </vue-grid-row>

              <vue-grid-row :class="$style.buttonExtension">
                <vue-grid-item class="box">
                  <vue-checkbox
                    name="rememberPassword"
                    label="记住密码"
                    id="rememberPassword"
                    @input="setRemember($event)"
                    addClass="loginCheckbox"
                  />
                </vue-grid-item>

                <vue-grid-item class="box" :class="$style.goLogin">
                  <div>
                    <router-link to="/">立即注册</router-link>
                  </div>
                </vue-grid-item>
              </vue-grid-row >

              <vue-grid-row :class="$style.singIn">
                <vue-grid-item fill>
                  <vue-button
                    size
                    radius
                    @click="btnlogin"
                    :loading="loginPending"
                  >
                    登录
                  </vue-button>
                </vue-grid-item>
              </vue-grid-row>
            </vue-grid>
          </div>
        </form>
      </div>
    </div>
    <vue-footer :class="$style.footer" />
    <div :class="$style.modelbox" >
      <img height="100%" width="100%" src="/logoBackgroundImg.png" alt="">
    </div>
  </div>

</template>

<script lang="ts">
  import { mapActions, mapGetters } from 'vuex';
  import { IPreLoad }               from '../../../server/isomorphic';
  import VueGrid                    from '../../shared/components/VueGrid/VueGrid.vue';
  import VueGridItem                from '../../shared/components/VueGridItem/VueGridItem.vue';
  import VueGridRow                 from '../../shared/components/VueGridRow/VueGridRow.vue';
  import VueInput                   from '../components/VueInput/VueInput.vue';
  import VueButton                  from '../components/VueButton/VueButton.vue';
  import VueCheckbox                from '../components/VueCheckbox/VueCheckbox.vue';
  import { Validator }              from 'vee-validate';
  import VueFooter                  from '../components/VueFooter/VueFooter.vue';
  import { addNotification, INotification }               from '../../shared/components/VueNotificationStack/utils';
  import { store }                  from '../../store';
  import { AxiosResponse }          from 'axios';
  import { ILoginResponse }         from '../actions';
  import { router }                 from '../../router';

  export default {
    data() {
      return {
        disableParticles: true,
        show: false,
        form: {
          userName: '',
          passWord: '',
        },
        user: {
          name: '账号',
          id: 'userName',
          required: false,
          value: '',
          autofocus: true,
          placeholder: '用户名',
          errorMessage: '你猜',
        },
        password: {
          name: '密码',
          id: 'password',
          require: false,
          value: '',
          autofocus: true,
          placeholder: '密码',
        },
      };
    },
    metaInfo:   {
      title: '登录',
    },
    components: {
      VueGrid,
      VueGridItem,
      VueButton,
      VueGridRow,
      VueInput,
      VueCheckbox,
      VueFooter,
    },
    methods:    {
      handleResize() {
        const canvas: HTMLCanvasElement = this.$refs.canvas;
        const stage: HTMLElement = this.$refs.stage;
        const stageRect: ClientRect = stage.getClientRects().length > 0 ? stage.getClientRects().item(0) : {
          width:  0,
          height: 0,
        } as ClientRect;

        canvas.width = stageRect.width;
        canvas.height = stageRect.height;
      },
      addNotificationClick() {
        addNotification(
          {
            title: 'this is a test',
            text:  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
          } as INotification,
        );
      },

      setRemember(data: any) {
        console.log(data);
      },
      btnlogin() {
        this.login({
          username: this.form.userName,
          password: this.form.passWord,
        })
        .then((res: AxiosResponse<ILoginResponse>) => {
          if (res.data.code === 0 || res.status === 200) {
          store.commit('login/SET_LOGIN_PENDING', false);
          store.commit('login/SET_TOKEN', res.data.data.token);
          router.push ({path: '/admin'});
          }
        })
        .catch((e: any) => {
          store.commit('login/SET_LOGIN_PENDING', false);
          console.log(e);
          addNotification(
            {
              title: '提示',
              text:  '账号或密码错误',
            } as INotification,
          );
        });
      },
      onSubmit() {

        // this.show = !this.show;
        const userInformation: any = {
          username: this.form.userName,
          password: this.form.passWord,
        };
      },
      ...mapActions('login', [
        'login',
      ]),
      beforeEnter: (el: any): void => {
        console.log(el);
        const delay = el.getAttribute('animate-delay');
        const duration = el.getAttribute('animate-duration');
        console.log('attr:' + delay, duration);
        const cssObj = {
          'animation-delay': delay,
          '-webkit-animation-delay': delay,
          'animation-duration': duration,
          '-webkit-animation-duration': duration,
          'visibility': 'visible',
        };
        const getCssText = (obj: any): string => {
          const text = [];
          for (const o in obj) {
            if (o) {
              text.push(o + ':' + obj[o]);
            }
          }

          return text.join(';');
        };
        el.style.cssText = getCssText(cssObj);
      },
    },
    computed:   {
      ...mapGetters('login', ['loginPending']),
    },
    mounted() {
      this.show = !this.show;
    },
  };
</script>

<style lang="scss" module>
  @import "../../shared/styles";
  @keyframes loginAnimate {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes loginLogo {
    from {
      opacity: 0;
      transform: scale(1.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes loginText {
    from {
      opacity: 0;
      transform: scale(.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes loginLogo {
    from {
      opacity: 0;
      transform: scale(1.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes loginTextColor {
    from {
      text-shadow: 0 0 10px #BABABA;
      color: #BABABA;
    }
    to {
      text-shadow: 0 0 10px #FFB74D;
      color: #FFB74D;
    }
  }
  @keyframes loginUser {
    from {
      opacity: 0;
      transform:scale(.5) translateX(-100px);
    }
    to {
      opacity: 1;
      transform:scale(1) translateX(0px);
    }
  }
  @keyframes loginPass {
    from {
      opacity: 0;
      transform: scale(.5) translateX(60px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
  }
  @keyframes loginbuttonExtension {
    from {
      opacity: 0;
      transform: scale(.5);

    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes loginsingIn {
    from {
      opacity: 0;
      transform: scale(.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .wrapbox{
    position:                      relative;
    overflow:                      hidden;
    color:                         $text-color-inverse;
    // TODO delete

    canvas {
      @include position(fixed, 0, 0, 0, 0);
      z-index: -1;
    }

    .wxymodule {
      align-content: center;
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: center;
      @include position(absolute, 0, 0, 0, 0);
      z-index: 10;

      %transition {
        trancition: color 10s ease 10s;
      }

      %Awidth {
        min-width:  300px;
      }

      .contentbox {
        min-width:                 300px;
        min-height:                300px;

        .LogoRow {
          text-align: center;
          margin: 0 auto;
          img {
            width: 375px;
          }
        }

        .TextRow {

          p {
            font-family:             'MFB';
            text-align:              center;
            font-weight:             lighter;
            font-size:               60px;
            letter-spacing:          5px;
          }
        }

        .UserRow {
          @extend %Awidth;
          margin: 0 auto;
        }

        .PassRow {
          @extend %Awidth;
          margin: 0 auto;
          margin-top: -50px;
        }

        .singIn {
          @extend %Awidth;
          margin: 0 auto;
        }

        .buttonExtension {
          justify-content:         space-between;
          margin: -40px 0 0 0;
          min-width:  500px;

          :global {
            .box {
              flex-basis: 0;
              transform: scale(.7,.7);
            }
          }
        }

        .goLogin {

          > div {
            margin:                $checkbox-margin;
            padding:               $checkbox-padding;
            text-align:            right;

            a {
              display:             inline-block;
              text-decoration:     none;
              color:               $text-color-inverse;
            }
          }
        }

        @include media(tabletPortrait){

          %Awidth {
            width:  450px;
          }

        }

        @include media(tabletLandscape){

          %Awidth {
            width: 430px;
          }
        }

        @include media(smallDesktop){

          %Awidth {
            width:  450px;
          }
        }

        @include media(largeDesktop){
          %Awidth {
            width:  450px;
          }
        }

      }
    }

    .modelbox{

      @include position(fixed, 0, 0, 0, 0);
      z-index: -2;
      img {
        height: 100%;
        width: 100%;
        /* 图片模糊效果 */
        /*-webkit-filter: blur(1px); !* Chrome, Opera *!*/
        /*-moz-filter: blur(1px);*/
        /*-ms-filter: blur(1px);*/
        /*filter: blur(1px);*/
      }
    }

    .footer{
      position:                    absolute;
      width:                       100%;
      left:                        0;
      right:                       0;
      bottom:                      0;
      z-index:                     100;
      text-align:                  center;
    }
    /* 动画 */
    .LogoRow,.TextRow,.UserRow,.PassRow,.buttonExtension,.singIn {
      opacity: 0;
    }
    .animate {
      @include animation(loginAnimate,1s, linear,0s ,forwards);
      .LogoRow {
        @include animation(loginLogo, 1s, cubic-bezier(0.68, -0.55, 0.265, 1.55), 1s, forwards);
      }
      .TextRow {
        @include animation(loginText,.5s, linear,2s ,forwards);
      }
      .UserRow {
        @include animation(loginUser,.5s , linear,2s ,forwards);
      }
      .PassRow {
        @include animation(loginPass,.5s , linear,2s ,forwards);
      }
      .buttonExtension {
        @include animation(loginbuttonExtension,.5s , linear,2s ,forwards);
      }
      .singIn {
        @include animation(loginsingIn,.5s , linear,2s ,forwards);
      }
    }

  }

</style>
