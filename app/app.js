import Vue from "nativescript-vue";

import Home from "./components/Home";
import RadListView from 'nativescript-ui-listview/vue';

Vue.use(RadListView);
new Vue({
    render: h => h('frame', [h(Home)]),
}).$start();
