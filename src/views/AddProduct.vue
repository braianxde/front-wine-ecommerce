<template>
  <div style="justify-content: center; display: flex">
    <div style="width: 750px">
      <div>
        <h1 class="title is-1">
          Resgister a Wine
        </h1>
      </div>
      <div>
        <form>
            <div>
              <div class="fieldForm">
                <label for="productName">Name</label><br>
                <input v-model="product.name" type="text" id="productName"/>
              </div>

              <div class="fieldForm">
                <label for="productValue">Price</label><br>
                <money v-model="product.value" v-bind="money" type="text" id="productValue"/>
              </div>

              <div class="fieldForm">
                <label for="productWeight">Weight KG</label><br>
                <input v-model="product.weight" type="number" id="productWeight"/>
              </div>

              <div class="fieldForm">
                <label for="productOrd">Ascending order</label><br>
                <input v-model="product.ordination" type="number" id="productOrd"/>
              </div>

              <div class="fieldForm">
                <label for="productImg">URL Image</label><br>
                <input v-model="product.img" type="text" id="productImg"/>
              </div>

              <div class="fieldForm">
                <label for="productDesc">{{$t("description")}}</label><br>
                <textarea v-model="product.description" id="productDesc"/>
              </div>
            </div>
        </form>
        <button type="button" @click="onSubmitForm">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import Vue from "vue";
import {Money} from 'v-money';
export default {
  name: 'AddProduct',
  components: {
    Money
  },
  data: () => ({
    money: {
      decimal: '.',
      thousands: '.',
      prefix: '$ ',
      precision: 2
    },
    product: {
      name: "",
      value: 0,
      weight: 0,
      img: "",
      ordination: 1,
      description: ""
    }
  }),
  methods: {
    checkForm(){
      if(this.product.name.length === 0){
        Vue.toasted.error("Enter a name");
        return false;
      }

      if(this.product.img.length === 0){
        Vue.toasted.error("Enter a Url Image");
        return false;
      }

      if(this.product.value === 0){
        Vue.toasted.error("Enter a Price");
        return false;
      }

      if(this.product.weight === 0){
        Vue.toasted.error("Enter a Weight");
        return false;
      }

      if(this.product.img.length === 0){
        Vue.toasted.error("Enter a Url Image");
        return false;
      }

      if(this.product.ordination === 0){
        Vue.toasted.error("Enter a Ordination");
        return false;
      }

      if(this.product.description.length === 0){
        Vue.toasted.error("Enter a Description");
        return false;
      }

      return true;
    },
    async onSubmitForm(){
      if(this.checkForm()){
        let response = await axios.post(`http://172.17.0.1/product`, this.product)
        if(response){
          Vue.toasted.success("Wine successfully registered")
        }
      }
    }
  }
}
</script>

<style scoped>
input[type=text],input[type=number], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.fieldForm{
  text-align: left;
  font-weight: bold;
}

button{
  width: 100%;
  background-color: #5b1e93;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #260b52;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
}
</style>
