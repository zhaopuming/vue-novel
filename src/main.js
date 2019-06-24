import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

// Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faBook, faSortAmountDown, faThLarge, faSearch, faList, faArrowLeft, faArrowRight, faBookOpen, faStar, faCog } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// axios
import axios from 'axios'
axios.defaults.headers.post['Countent-Type'] = 'application/json'
Vue.prototype.$axios = axios

// Configuration
Vue.config.productionTip = false

Vue.use(ElementUI)

library.add(faHome, faBook, faThLarge, faSortAmountDown)
library.add(faSearch, faBookmark, faList, faArrowLeft)
library.add(faArrowRight, faBookOpen, faStar, faCog)
library.add(faCheck)
Vue.component('faicon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
