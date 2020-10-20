<template>
  <div>
    <div>
      <div class="products">
        <div v-for="product in products" :key="product.id">
          <Product :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product.vue';
import axios from "@/plugins/axios";
export default {
  name: 'Home',
  components: { Product },
  data() {
    return {
      products: [
        {}
      ],
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        this.products = await axios.get(`http://172.17.0.1/products`);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

</style>