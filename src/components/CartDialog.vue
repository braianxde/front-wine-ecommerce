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

        <section class="modal-body">
          <slot name="body">
            <table style="background-color: white">
              <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>weight</th>
                <th>Price</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(product,index) in products"
                  :key="index">
                <td>{{product.id}}</td>
                <td>{{product.name}}</td>
                <td>{{product.weight}}</td>
                <td>{{product.value}}</td>
                <td style="color: red" @click="deleteProduct(index)">Delete</td>
              </tr>
              </tbody>
            </table>
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn btn-green" @click="close" aria-label="Close modal">
              Close me!
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
import store from "@/plugins/store";
import { mapActions } from "vuex";
export default {
  name: 'CartDialog',
  mounted() {
    this.products = store.state.purchaseOrder.items;
    console.log(this.products);
  },
  data() {
    return {
      products: {},
    };
  },
  methods: {
    ...mapActions(["changePurchaseOrder"]),
    close() {
      this.$emit('close');
    },
    async deleteProduct(index){
      this.products.splice(index, 1);
      await this.changePurchaseOrder(this.products)
    }
  },
}
</script>
<style>

.btn {
  padding: 8px 16px;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
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
  flex-direction: column;
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
  justify-content: flex-end;
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

.btn {
  color: white;
  background: #5f1686;
  border: 1px solid #010706;
  border-radius: 2px;
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

tr:nth-child(even) {background-color: #f2f2f2;}

tr:hover {background-color: #e0c7c7;}
</style>
