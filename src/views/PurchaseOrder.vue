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
          <th style="text-align: center">ID</th>
          <th style="text-align: left">Date Time</th>
          <th style="text-align: center">Items</th>
          <th style="text-align: right">Total Price</th>
          <th style="text-align: center">Weight</th>
          <th style="text-align: center">Distance</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(purchaseOrder,id) in purchaseOrders"
            :key="id">
          <td style="text-align: center">{{ purchaseOrder.id }}</td>
          <td style="text-align: left">{{ purchaseOrder.datetime }}</td>
          <td style="text-align: center">{{ purchaseOrder.number_items }}</td>
          <td style="text-align: right">
            <money v-model="purchaseOrder.amount_value" v-bind="money" v-show="false"/>
            $ {{ purchaseOrder.amount_value }}
          </td>
          <td style="text-align: center">{{ purchaseOrder.amount_weight }}</td>
          <td style="text-align: center">{{ purchaseOrder.distance }}</td>
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
        this.purchaseOrders = await axios.get(`purchase-order`);
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

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #e0c7c7;
}
</style>