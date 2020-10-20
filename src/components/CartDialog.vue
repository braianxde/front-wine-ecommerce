<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" role="dialog">
      <div class="modal" ref="modal">
        <header class="modal-header">
          <slot name="header">
            <h2>
              My Cart
            </h2>

            <button type="button" class="btn-close btn-right" @click="close" aria-label="Close modal">
              x
            </button>
          </slot>
        </header>
        <div>
          <section class="modal-body">
            <slot name="body">
              <table style="background-color: white">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Unit Weight</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(product,index) in products"
                    :key="index">
                  <td>{{ product.name }}</td>
                  <td>{{ product.weight }}</td>
                  <td>$ {{ product.value }}</td>
                  <td>
                    <input class="inputWine" v-on:input="changeDistance()" v-model="product.qty" type="number"
                           id="qty"/>
                  </td>
                  <td style="color: red" @click="deleteProduct(index)">Delete</td>
                </tr>
                </tbody>
              </table>
            </slot>
          </section>
          <div class="fieldFormWine">
            Distance: <input class="inputWine" v-on:input="changeDistance()" v-model="distance" type="number"
                             id="distance"/>
          </div>

          <div class="fieldFormWine" v-if="distance >0">
            Shipping Costs: $ {{ shippingCostFormated }}
          </div>

          <div class="fieldFormWine" v-if="distance >0">
            Total Price: $ {{ totalValueFormated }}
          </div>

          <footer class="modal-footer">
            <slot name="footer">
              <button type="button" class="btn btn-green" @click="close()" aria-label="Close modal">
                Fechar
              </button>
              <button v-if="distance >0" type="button" class="btn btn-green" @click="checkout()"
                      aria-label="Close modal">
                Checkout
              </button>
            </slot>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import {mapActions} from "vuex";
import store from "@/plugins/store";
import Vue from "vue";
import axios from "@/plugins/axios";
import Util from "@/plugins/Util";

export default {
  name: 'CartDialog',
  mounted() {
    let purchaseOrder = JSON.parse(localStorage.getItem("purchaseOrder"));
    this.products = purchaseOrder.items;
  },
  data() {
    return {
      products: {},
      distance: "",
      totalValue: "",
      totalValueFormated: "",
      shippingCost: "",
      shippingCostFormated: ""
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
        let purchaseOrder = JSON.parse(localStorage.getItem("purchaseOrder"));
        this.products = purchaseOrder.items;
      }
    }
  },
  methods: {
    ...mapActions(["changePurchaseOrder"]),
    async checkout() {
      if (this.distance == "" || this.distance <= 0) {
        Vue.toasted.error("Report the Distance:");
      }

      let purchaseOrder = {
        items: [],
        distance: this.distance
      };

      this.products.forEach(function (product) {
        for (let index = 1; index <= product.qty; index++) {
          purchaseOrder.items.push(product);
        }
      });

      let response = await axios.post(`purchase-order`, purchaseOrder)

      if (response) {
        Vue.toasted.success("Purchase successfully registered")
        this.changePurchaseOrder({items: [], distance: 0});
        localStorage.removeItem("purchaseOrder");
        this.products = {};
        this.$emit('close');
      } else {
        Vue.toasted.success("Try again later");
      }
    },
    close() {
      this.resetData();
      this.$emit('close');
    },
    resetData() {
      this.distance = "";
      this.totalValue = "";
      this.totalValueFormated = "";
      this.shippingCost = "";
      this.shippingCostFormated = "";
    },
    changeDistance() {
      let sumWeight = 0;
      let sumValue = 0;

      this.products.forEach(function (product) {
        if (product.qty <= 0) {
          product.qty = 1;
        }

        if (product.qty > 10) {
          product.qty = 10;
        }
        sumWeight += parseFloat(product.weight * product.qty);
        sumValue += parseFloat(product.value * product.qty);
      });

      let shippingWeight = sumWeight * 5;

      if (this.distance <= 100) {
        this.shippingCostFormated = Util.formatMoneyUSD(shippingWeight);
        this.shippingCost = shippingWeight;
      } else {
        this.shippingCostFormated = Util.formatMoneyUSD((shippingWeight * this.distance) / 100);
        this.shippingCost = (shippingWeight * this.distance) / 100;
      }

      this.totalValueFormated = Util.formatMoneyUSD(sumValue + this.shippingCost);
    },
    async deleteProduct(index) {
      this.products.splice(index, 1);
      let purchaseOrder = JSON.parse(localStorage.getItem("purchaseOrder"));
      purchaseOrder.items = this.products;
      localStorage.setItem("purchaseOrder", JSON.stringify(purchaseOrder));
      this.changePurchaseOrder(purchaseOrder)
    }
  },
}
</script>
<style>

.btn {
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  color: white;
  margin-left: 50px;
  background: #5f1686;
  border: 1px solid #010706;
  border-radius: 2px;
}

.no-product {
  width: 250px;
  height: 250px;
  align-items: center;
  display: flex;
  font-weight: bold;
  font-size: 20px;
  align-content: center;
  padding-left: 90px;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  border-radius: 15px;
  flex-direction: column;
}

.inputWine {
  width: 50%;
  display: inline-block;
  border: 1px solid #ccc;
  height: 20px;
  padding: 12px 20px;
  border-radius: 4px;
}

.fieldFormWine {
  padding-left: 15px;
  text-align: left;
  font-weight: bold;
  max-width: 300px;
  margin-bottom: 20px
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #681d79;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: center;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #5f4b78;
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #e0c7c7;
}
</style>
