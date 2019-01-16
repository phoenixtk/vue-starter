<template>
  <div id="app" :class="$style.app">
    <vue-notification-stack />

    <vue-navigation-progress :is-navigating="isNavigating" />

    <vue-nav-bar v-if="true">
      <ul :class="$style.nav">
        <li>
          <a href="/docs" @click.native="navBarClose">
            <vue-icon-book />
            <small>{{ $t('App.nav.docs' /* Documentation */) }}</small>
          </a>
        </li>
        <li>
          <router-link to="/counter" @click.native="navBarClose">
            <vue-icon-hashtag />
            <small>{{ $t('App.nav.counter' /* Counter */) }}</small>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/stelementui" @click.native="navBarClose">
            <vue-icon-ststar />
            <small>{{ $t('App.nav.ststudy' /* subaba */) }}</small>
          </router-link>
        </li>
        <li>
          <router-link to="/components" @click.native="navBarClose">
            <vue-icon-puzzle-piece />
            <small>{{ $t('App.nav.components' /* Components */) }}</small>
          </router-link>
        </li>
        <li>
          <a @click="localeSwitch('en')">
            <vue-icon-flag />
            <small>English</small>
          </a>
        </li>
        <li>
          <router-link to="/login" @click.native="navBarClose">
            <vue-icon-puzzle-piece />
            <small>{{ $t('App.nav.login' /* 登录 */) }}</small>
          </router-link>
        </li>


        <!--<li>-->
          <!--<a @click="localeSwitch('de')">-->
            <!--<vue-icon-flag />-->
            <!--<small>Deutsch</small>-->
          <!--</a>-->
        <!--</li>-->
        <!--<li>-->
          <!--<a @click="localeSwitch('pt')">-->
            <!--<vue-icon-flag />-->
            <!--<small>Português</small>-->
          <!--</a>-->
        <!--</li>-->
        <li>
          <a @click="localeSwitch('zh-cn')">
            <vue-icon-flag />
            <small>中文</small>
          </a>
        </li>
      </ul>
    </vue-nav-bar>

    <vue-c-transition>
      <router-view :class="$style.content" />
    </vue-c-transition>
    <!--<div :class="$style.testDiv" style="height: 60px">-->
      <!--<div :class="[$style.lBorder]">111</div>-->
      <!--<div :class="[$style.borderLine]">222</div>-->
      <!--<div :class="[$style.lBorder, $style.borderLine]">333</div>-->
      <!--<div :class="[$style.lBorder, $style.borderLine]">444</div>-->
    <!--</div>-->
    <!--<vue-footer />-->


    <!--<vue-cookie-consent-->
      <!--current-version="1.0.0"-->
      <!--:cookie-consent-version="cookieConsentVersion"-->
      <!--:set-cookie-consent-version="setCookieConsentVersion">-->
      <!--This is a cookie consent component which shows the cookie consent every time you change the version of the-->
      <!--consent.-->
    <!--</vue-cookie-consent>-->
  </div>
</template>

<script lang="ts">
  import { mapActions, mapGetters } from 'vuex';
  import VueNavBar                  from '../../shared/components/VueNavBar/VueNavBar.vue';
  import VueGrid                    from '../../shared/components/VueGrid/VueGrid.vue';
  import VueGridItem                from '../../shared/components/VueGridItem/VueGridItem.vue';
  import VueFooter                  from '../../shared/components/VueFooter/VueFooter.vue';
  import VueNotificationStack       from '../../shared/components/VueNotificationStack/VueNotificationStack.vue';
  import VueCookieConsent           from '../../shared/components/VueCookieConsent/VueCookieConsent.vue';
  import VueIconBook                from '../../shared/components/icons/VueIconBook/VueIconBook.vue';
  import VueIconHashtag             from '../../shared/components/icons/VueIconHashtag/VueIconHashtag.vue';
  import VueIconPuzzlePiece         from '../../shared/components/icons/VueIconPuzzlePiece/VueIconPuzzlePiece.vue';
  import VueIconFlag                from '../../shared/components/icons/VueIconFlag/VueIconFlag.vue';
  import VueNavigationProgress      from '../../shared/components/VueNavigationProgress/VueNavigationProgress.vue';
  import { loadLocaleAsync }        from '../../shared/plugins/i18n/i18n';
  import { EventBus }               from '../../shared/services/EventBus';
  import VueIconStstar              from '../../shared/components/icons/VueIconStstar/VueIconStstar.vue';
  import VueCTransition             from '../../login/components/VueCTransition/VueCTransition.vue';

  export default {
    components: {
      VueIconStstar,
      VueNavigationProgress,
      VueIconFlag,
      VueIconPuzzlePiece,
      VueIconHashtag,
      VueIconBook,
      VueCookieConsent,
      VueNavBar,
      VueGrid,
      VueGridItem,
      VueFooter,
      VueNotificationStack,
      VueCTransition,
    },
    data(): any {
      return {
        isNavigating: false,
      };
    },
    computed:   {
      ...mapGetters('app', ['cookieConsentVersion']),
    },
    methods:    {
      ...mapActions('app', ['changeLocale', 'setCookieConsentVersion']),
      localeSwitch(locale: string): void {
        loadLocaleAsync(locale)
        // tslint:disable-next-line
        .catch((error: Error) => console.log(error));

        this.changeLocale(locale);
        this.navBarClose();
      },
      navBarClose() {
        EventBus.$emit('navbar.close');
      },
      initProgressBar() {
        this.$router.beforeEach((to: any, from: any, next: any) => {
          this.isNavigating = true;
          next();
        });
        this.$router.afterEach(() => {
          this.isNavigating = false;
        });
      },
    },
    created() {
      this.initProgressBar();
    },
  };
</script>

<style lang="scss" module>
  @import "../../shared/styles";
  @import "../../shared/styles/reset";
  @import "../../shared/styles/typo";
  @import "../../shared/styles/global";
  @import url($google-font);

  .app {
    min-height:     100vh;
    display:        flex;
    flex-direction: column;
  }

  .testDiv {
    /*transition: property duration timing-function delay;
    transition-property	规定设置过渡效果的 CSS 属性的名称。
    transition-duration	规定完成过渡效果需要多少秒或毫秒。
    transition-timing-function	规定速度效果的速度曲线。
    transition-delay	定义过渡效果何时开始。*/
    .lBorder{
      display: inline-block;
      padding: 16px 32px;
      border: 1px solid #ebebeb;
      -webkit-transition: all 0.6s ease-in;
      transition: all 0.6s ease-in;
    }

    .lBorder:hover{
      border: 1px solid #367dff;
    }

    .borderLine {
      position: relative;
      display: inline-block;
      height: 100%;
      background: none;
      box-sizing: border-box;
      box-shadow: inset 0 0 0 0px transparent;
    }

    .borderLine::after,
    .borderLine::before {
      position: absolute;
      content: '';
      display: block;
      width: 0;
      height: 0;
      box-sizing: border-box;
      border: 1px solid transparent;
    }

    .borderLine::before {
      bottom: 0;
      right: 0;
      -webkit-transition: border-color 0s ease-in 0.4s, width 0.2s ease-in 0.2s, height 0.2s ease-in;
      transition: border-color 0s ease-in 0.4s, width 0.2s ease-in 0.2s, height 0.2s ease-in;
    }

    .borderLine::after {
      top: 0;
      left: 0;
      -webkit-transition: border-color 0s ease-in 0.8s, width 0.2s ease-in 0.6s, height 0.2s ease-in 0.4s;
      transition: border-color 0s ease-in 0.8s, width 0.2s ease-in 0.6s, height 0.2s ease-in 0.4s;
    }

    .borderLine:hover::after,
    .borderLine:hover::before {
      width: 100%;
      height: 100%;
    }

    .borderLine:hover::before {
      border-bottom-color: #367dff;
      border-left-color: #367dff;
      -webkit-transition: border-color 0s ease-out 0.4s, width 0.2s ease-out 0.4s, height 0.2s ease-out 0.6s;
      transition: border-color 0s ease-out 0.4s, width 0.2s ease-out 0.4s, height 0.2s ease-out 0.6s;
    }





    .borderLine:hover::after {
      border-top-color: #367dff;
      border-right-color: #367dff;
      -webkit-transition: border-color 0s ease-out 0.2s,width 0.2s ease-out, height 0.2s ease-out 0.2s;
      transition: border-color 0s ease-out 0.2s,width 0.2s ease-out, height 0.2s ease-out 0.2s;
    }


  }

  .content {
    flex: 1;
  }

  .nav {
    margin:         $space-unit 0 0 0;
    padding:        0;
    list-style:     none;
    display:        flex;
    flex-direction: row;
    flex-wrap:      wrap;
    width:          100%;

    li {
      flex:       1;
      margin:     $space-unit / 2;
      color:      $text-color;
      flex-basis: $space-unit * 10;
      height:     $space-unit * 10;
      background: $divider-color;
      cursor:     pointer;

      a {
        padding:         $space-unit * 2;
        display:         block;
        color:           $text-color;
        text-align:      center;
        text-decoration: none;

        small {
          font-size: 12px;
          display:   block;
        }

        i {
          height: 32px;
          width:  32px;
        }
      }
    }

    @include media(tabletLandscape) {
      margin: 0;

      li {
        margin:     $space-unit;
        opacity:    .8;
        transition: opacity $transition-duration linear;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
</style>
