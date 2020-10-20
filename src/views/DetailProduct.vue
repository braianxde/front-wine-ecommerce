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
      <div class="description-product">
        <b>Description :</b> <br>
        {{product.description}}
      </div>
      <div>
        <h4 class="description-product">
          <money v-model="product.value" v-bind="money" v-show="false"/>
          <b>Price:</b> {{ product.value }}
        </h4>
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
import { mapActions, mapGetters} from "vuex";

export default {
  name: "DetailProduct",
  data() {
    return {
      product: {},
      disableAddCart: false,
      money: {
        decimal: '.',
        thousands: '.',
        prefix: '$ ',
        precision: 2,
        masked: true
      },
    };
  },
  components:{
    Money
  },
  async mounted() {
    let idProduct = this.$route.params.id;
    if (idProduct) {
      let productPromisse = await axios.get("http://172.17.0.1/product/" + idProduct);
      this.product = await productPromisse[0];
    } else {
      await router.push({path: "/"})
    }
  },
  methods: {
    ...mapActions(["changePurchaseOrder"]),
    ...mapGetters(["getPurchaseOrder"]),
    async addToPurchaseOrder(){
      let purchaseOrder = await this.getPurchaseOrder();
      purchaseOrder.items.push(this.product)
      console.log(purchaseOrder);
      this.changePurchaseOrder(purchaseOrder)
      this.disableAddCart = true;
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
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

button:hover {
  background-color: #fafafa;
  color: #000000;
}
</style>