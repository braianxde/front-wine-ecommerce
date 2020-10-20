<template>
  <div style="justify-content: center; display: flex">
    <div style="width: 750px">
      <div>
        <h1 class="title is-1">
          {{ product.name }}
        </h1>
      </div>
      <div>
        <img width="200px" height="300px" :src="product.img">
      </div>
      <div class="grid-container">
        <div style="display: flex; align-items: center; justify-content: center;">
          <money v-model="product.value" v-bind="money" v-show="false"/>
          <h2><b>Price:</b> $ {{ product.value }}</h2>
        </div>
        <div  style="display: flex; align-items: center; justify-content: center;">
          <h3>Qty: <input v-model="qty" type="number" id="qty"/></h3>
        </div>
      </div>
      <div class="description-product">
        <b>Description :</b> <br>
        {{ product.description }}
      </div>
      <div>
        <button :disabled="disableAddCart" @click="addToPurchaseOrder">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import router from "@/plugins/router";
import {Money} from 'v-money';
import {mapActions, mapGetters} from "vuex";
import Vue from "vue";
export default {
  name: "DetailProduct",
  data() {
    return {
      product: {},
      disableAddCart: false,
      qty: 1,
      money: {
        decimal: '.',
        thousands: '.',
        precision: 2,
        masked: true
      },
    };
  },
  components: {
    Money
  },
  async mounted() {
    let idProduct = this.$route.params.id;
    if (idProduct) {
      let productPromisse = await axios.get("product/" + idProduct);
      this.product = await productPromisse[0];
    } else {
      await router.push({path: "/"})
    }
  },
  methods: {
    ...mapActions(["changePurchaseOrder"]),
    ...mapGetters(["getPurchaseOrder"]),
    async addToPurchaseOrder() {
      if(this.qty <= 0 || this.qty > 10){
        Vue.toasted.error("Enter the quantity (10 Max)");
        return;
      }

      let purchaseOrder = JSON.parse(localStorage.getItem("purchaseOrder"));

      if (purchaseOrder == null) {
        purchaseOrder = {
          items: [],
          distance: 0
        }
      }

      Vue.toasted.success("Product Added");
      this.product.qty = this.qty;
      purchaseOrder.items.push(this.product)
      localStorage.setItem("purchaseOrder", JSON.stringify(purchaseOrder));
      this.changePurchaseOrder(purchaseOrder)
      this.disableAddCart = true;

      setTimeout(()=>{
        router.push("/");
      }, 1000)

    }
  }
}
</script>

<style scoped>
.description-product {
  font-size: 20px;
  text-align: start;
}

button {
  width: 100%;
  background-color: #5b1e93;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 30px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

input[type=text],input[type=number], select {
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

button:hover {
  background-color: #fafafa;
  color: #000000;
}
</style>