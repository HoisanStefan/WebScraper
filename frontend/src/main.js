import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import HomePage from "./components/HomePage.vue";
import ScrapePage from "./components/ScrapePage.vue";
import "./assets/styles.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/scrape",
      name: "ScrapePage",
      component: ScrapePage,
      props: true
    },
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
    },
  ],
});

createApp(App).use(router).mount("#app");
