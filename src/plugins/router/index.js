import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import PurchaseOrder from "@/views/PurchaseOrder";

Vue.use(VueRouter)

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: Home
  },
  {
    path: "/PurchaseOrder",
    name: "PurchaseOrder",
    component: PurchaseOrder,
  },
  {
    path: "*",
    name: "catchAll",
    component: Home,
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
