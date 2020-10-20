<template>
  <div>
    <ul class="topnav">
      <li @click="navigateTo('Home')"><a>Wines</a></li>
      <li @click="navigateTo('PurchaseOrder')"><a>My Purchases</a></li>
      <li @click="navigateTo('AddProduct')"><a>Register a Wine</a></li>
      <li class="cart-orientation" @click="openCart()"><a>My Cart
        {{ itemsCart !== 0 ? "(" + itemsCart + " Items)" : "" }}</a></li>
    </ul>
    <CartDialog v-show="isModalVisible" @close="closeModal"></CartDialog>
  </div>
</template>

<script>
import router from "../plugins/router";
import CartDialog from "@/components/CartDialog";
import store from "@/plugins/store";
import Vue from 'vue';

export default {
  name: 'NavBar',
  components: {
    CartDialog
  },
  data() {
    return {
      itemsCart: 0,
      isModalVisible: false,
    };
  },
  computed: {
    count() {
      if (store.state.purchaseOrder.items) {
        return store.state.purchaseOrder.items.length
      }
      return 0;
    }
  },
  watch: {
    count() {
      if (store.state.purchaseOrder.items) {
        let count = 0;
        store.state.purchaseOrder.items.forEach(function (product) {
          count += product.qty;
        });

        this.itemsCart = count;
      }
    }
  },
  mounted() {
    let purchaseOrder = JSON.parse(localStorage.getItem("purchaseOrder"));

    if (purchaseOrder == null) {
      purchaseOrder = {
        items: [],
        distance: 0
      }
      localStorage.setItem("purchaseOrder", JSON.stringify(purchaseOrder));
    }

    if (purchaseOrder) {
      this.itemsCart = purchaseOrder.items.length
    }
  },
  methods: {
    openCart() {
      if(this.itemsCart === 0){
        Vue.toasted.info("My Cart Empty")
        return;
      }
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    navigateTo: function (nameRoute) {
      router.push(nameRoute);
    },
  }
};
</script>

<style scoped>
.cart-orientation {
  float: right;
}

ul.topnav {
  background: linear-gradient(rgba(170, 71, 71, 0.5), rgba(120, 17, 17, 0.1)), url("../assets/navbar.jpg");
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  font-weight: bold;
  font-size: 18px;
}

ul.topnav li {
  float: left;
}

ul.topnav li a {
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

ul.topnav li a:hover:not(.active) {
  background: linear-gradient(rgba(255, 255, 255, .6), rgba(255, 255, 255, .2)), url("../assets/navbar.jpg");
}

ul.topnav li a.active {
  background-color: #4CAF50;
}

ul.topnav li.right {
  float: right;
}

@media screen and (max-width: 600px) {
  ul.topnav li.right,
  ul.topnav li {
    float: none;
  }
}
</style>