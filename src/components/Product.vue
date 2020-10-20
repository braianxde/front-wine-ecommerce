<template>
  <div class="product-card">
    <div class="product-image">
      <img width="200px" height="300px" :src="product.img">
    </div>
    <div class="product-info">
      <p class="product-name">{{ nameShort }}</p>
      <p style="margin: 0px; color: black; font-weight: bold">
        <money v-model="product.value" v-bind="money" v-show="false"/>
        $ {{ product.value }}
      </p>
      <button @click="navigateTo(product.id)">
        Detail
      </button>
    </div>
  </div>
</template>

<script>
import {Money} from 'v-money';
import router from "@/plugins/router";

export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    if(this.product && this.product.name){
      this.nameShort = this.product.name.substr(0,45);
    }
  },
  components: {
    Money
  },
  methods: {
    navigateTo: function (id) {
      router.push({ name: 'DetailProduct', params: { id: id }})
    }
  },
  data() {
    return {
      money: {
        decimal: '.',
        thousands: '.',
        precision: 2,
        masked: true
      },
      nameShort: ""
    };
  }
};
</script>

<style scoped>
.product-card {
  border: 1px black;
  padding: 2%;
  margin: 5px;
  min-height: 30px;
  max-width: 200px
}

.product-image img {
  max-width: 200px;
  max-height: 300px;
}

.product-info {
  color: black;
  margin-top: auto;
}

.product-name {
  margin: 5px;
  overflow: hidden;
  text-align: center;
  font-size: 16px;
  min-height: 45px;
  max-height: 45px;
  color: black;
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
  background-color: #850aad;
  color: #000000;
}
</style>
