import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import VueLazyLoad from 'vue-lazyload';
import fastclick from 'fastclick';
import LazyRender from 'vue-lazy-render'
Vue.use(LazyRender)
Vue.config.productionTip = false
 fastclick.attach(document.body)


  import '../mui-master/dist/css/mui.css'
 import '../mui-master/examples/hello-mui/css/icons-extra.css'

import MintUI from 'mint-ui';
import {Swipe, SwipeItem} from 'mint-ui'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import './assets/style.css'
Vue.use(MintUI)

Vue.use(VueLazyLoad,{
  preLoad: 1.0,
  loading:'../static/load.png'
})




import './common/stylus/index.styl'  ;
/* eslint-disable no-new */
new Vue({
 el:'#app',
 router,
 store,
  render: h => h(App)
})
