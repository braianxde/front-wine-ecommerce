import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import PurchaseOrder from "@/views/PurchaseOrder";
import AddProduct from "@/views/AddProduct";
import DetailProduct from "@/views/DetailProduct";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/PurchaseOrder",
    name: "PurchaseOrder",
    component: PurchaseOrder,
  },
  {
    path: "/AddProduct",
    name: "AddProduct",
    component: AddProduct,
  },
  {
    path: "/DetailProduct",
    name: "DetailProduct",
    component: DetailProduct,
  },
  {
    path: "*",
    name: "catchAll",
    component: Home,
  }
]


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})

export default router;
