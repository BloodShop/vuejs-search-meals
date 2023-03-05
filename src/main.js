import { createApp } from "vue";
import router from "./router";
import store from "./store";
import "./style.css";
import App from "./App.vue";
import * as filters from "./filters";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const app = createApp(App);
app.use(store).use(router).mount("#app");
app.config.globalProperties.$filters = filters;
app.config.productionTip = false;
