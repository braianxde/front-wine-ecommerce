<template>
  <div style="justify-content: center; display: flex; ">
    <div style="width: 750px; overflow-x:auto;">
    <div>
      <h1 class="title is-1">
        Purchase Orders
      </h1>
    </div>
    <table style="background-color: white">
      <thead>
      <tr>
        <th>ID</th>
        <th>Date Time</th>
        <th>Items</th>
        <th>Total Price</th>
        <th>Total Amount</th>
        <th>Distance</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(purchaseOrder,id) in purchaseOrders"
          :key="id">
        <td>{{purchaseOrder.id}}</td>
        <td>{{purchaseOrder.datetime}}</td>
        <td>{{purchaseOrder.number_items}}</td>
        <td><money v-model="purchaseOrder.amount_value" v-bind="money" v-show="false"/>{{purchaseOrder.amount_value}}</td>
        <td>{{purchaseOrder.amount_weight}}</td>
        <td>{{purchaseOrder.distance}}</td>
      </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import {Money} from 'v-money';
export default {
  name: "PurchaseOrder",
  data() {
    return {
      purchaseOrders: [
        {}
      ],
      money: {
        decimal: '.',
        thousands: '.',
        prefix: '$ ',
        precision: 2,
        masked: true
      },
    };
  },
  components: {
    Money
  },
  mounted() {
    this.getPurchaseOrders();
  },
  methods: {
    async getPurchaseOrders() {
      try {
        this.purchaseOrders = await axios.get(`http://172.17.0.1/purchase-order`);
        console.log(this.purchaseOrders);
      } catch (e) {
        console.log(e);
      }
    },
  },
}
</script>

<style scoped>
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

tr:nth-child(even) {background-color: #f2f2f2;}

tr:hover {background-color: #e0c7c7;}
</style>