<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Modules</h5>
        <DataView
          :value="dataviewValue"
          :layout="layout"
          :paginator="true"
          :rows="9"
          :sortOrder="sortOrder"
          :sortField="sortField"
        >
          <template #header>
            <div class="grid grid-nogutter">
              <div class="col-6 text-left">
              <!--   <Dropdown
                  v-model="sortKey"
                  :options="sortOptions"
                  optionLabel="label"
                  placeholder="Sort By Price"
                  @change="onSortChange($event)"
                /> -->
                <Button label="New Module" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
              </div>
              <div class="col-6 text-right">
                <DataViewLayoutOptions v-model="layout" />
              </div>
            </div>
          </template>
          <template #list="slotProps">
            <div class="col-12">
              <div
                class="flex flex-column md:flex-row align-items-center p-3 w-full"
              >
                <img
                  :src="'/images/product/' + slotProps.data.image"
                  :alt="slotProps.data.name"
                  class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"
                />
                <div class="flex-1 text-center md:text-left">
                  <div class="font-bold text-2xl">
                    {{ slotProps.data.name }}
                  </div>
                  <div class="mb-3">{{ slotProps.data.description }}</div>
                
                 
                </div>
                <div
                  class="flex"
                >
                  <Button
                    icon="pi pi-pencil"
                    class="p-button-rounded p-button-success mr-2"
                    @click="editProduct(slotProps.data)"
                  />
                  
                  <Button
                    icon="pi pi-trash"
                    class="p-button-rounded p-button-warning "
                    @click="confirmDeleteProduct(slotProps.data)"
                  />
                </div>
              </div>
            </div>
          </template>

          <template #grid="slotProps">
            <div class="col-12 md:col-4">
              <div class="card m-3 border-1 surface-border">
                <div
                  class="flex align-items-center justify-content-between"
                ></div>
                <div class="text-center">
                  <img
                    :src="'/images/product/' + slotProps.data.image"
                    :alt="slotProps.data.name"
                    class="w-9 shadow-2 my-3 mx-0"
                  />
                  <div class="text-2xl font-bold">
                    {{ slotProps.data.name }}
                  </div>
                  <div class="mb-3">{{ slotProps.data.description }}</div>
                </div>
                <div class="flex align-items-center justify-content-center">
                    <Button
                    icon="pi pi-pencil"
                    class="p-button-rounded p-button-success mr-2"
                    @click="editProduct(slotProps.data)"
                  />
                  
                  <Button
                    icon="pi pi-trash"
                    class="p-button-rounded p-button-warning "
                    @click="confirmDeleteProduct(slotProps.data)"
                  />
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>
</template>

<script>
//import ProductService from "../service/ProductService";

export default {
  data() {
    return {
      picklistValue: [
        [
          { name: "San Francisco", code: "SF" },
          { name: "London", code: "LDN" },
          { name: "Paris", code: "PRS" },
          { name: "Istanbul", code: "IST" },
          { name: "Berlin", code: "BRL" },
          { name: "Barcelona", code: "BRC" },
          { name: "Rome", code: "RM" },
        ],
        [],
      ],
      orderlistValue: [
        { name: "San Francisco", code: "SF" },
        { name: "London", code: "LDN" },
        { name: "Paris", code: "PRS" },
        { name: "Istanbul", code: "IST" },
        { name: "Berlin", code: "BRL" },
        { name: "Barcelona", code: "BRC" },
        { name: "Rome", code: "RM" },
      ],
      dataviewValue: [
        {
          id: "1000",
          code: "f230fh0g3",
          name: "Bamboo Watch",
          description: "Product Description",
          image: "bamboo-watch.jpg",
          price: 65,
          category: "Accessories",
          quantity: 24,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1001",
          code: "nvklal433",
          name: "Black Watch",
          description: "Product Description",
          image: "black-watch.jpg",
          price: 72,
          category: "Accessories",
          quantity: 61,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1002",
          code: "zz21cz3c1",
          name: "Blue Band",
          description: "Product Description",
          image: "blue-band.jpg",
          price: 79,
          category: "Fitness",
          quantity: 2,
          inventoryStatus: "LOWSTOCK",
          rating: 3,
        },
        {
          id: "1003",
          code: "244wgerg2",
          name: "Blue T-Shirt",
          description: "Product Description",
          image: "blue-t-shirt.jpg",
          price: 29,
          category: "Clothing",
          quantity: 25,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
      ],
      layout: "grid",
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        { label: "Price High to Low", value: "!price" },
        { label: "Price Low to High", value: "price" },
      ],
    };
  },
  productService: null,
  created() {
    //	this.productService = new ProductService();
  },
  mounted() {
    //this.productService.getProducts().then(data => this.dataviewValue = data);
  },
  methods: {
    onSortChange(event) {
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf("!") === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      } else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }
    },
  },
};
</script>

<style scoped lang="scss">
//@import '../assets/demo/badges.scss';
</style>
