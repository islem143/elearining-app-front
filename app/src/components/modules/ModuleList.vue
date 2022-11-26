<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Modules</h5>
        <DataView
          :value="data"
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
                <router-link v-if="role=='teacher'" :to="{ name: 'module-create' }">
                  <Button
                    label="New Module"
                    icon="pi pi-plus"
                    class="p-button-success mr-2"
                    @click="openNew"
                  />
                </router-link>
              </div>
              <div class="col-6 text-right">
                <DataViewLayoutOptions v-model="layout" />
              </div>
            </div>
          </template>
          <template #list="slotProps">
            <div class="col-12 cursor-pointer" @click="goTo(slotProps.data)">
              <div
                class="flex flex-column md:flex-row align-items-center p-3 w-full"
              >
                <img
                  :src="'http://localhost:8081/images/' + src(slotProps.data)"
                  :alt="slotProps.data.name"
                  class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"
                />
                <div class="flex-1 text-center md:text-left">
                  <div class="font-bold text-2xl">
                    {{ slotProps.data.title }}
                  </div>
                  <div class="mb-3">{{ slotProps.data.description }}</div>
                </div>
                <div class="flex">
                  <Button
                    icon="pi pi-pencil"
                    class="p-button-rounded p-button-success mr-2"
                    @click="editModule(slotProps.data)"
                    v-if="role=='teacher'"
                  />

                  <Button
                    icon="pi pi-trash"
                    class="p-button-rounded p-button-warning"
                    @click="confirmDeleteModule(slotProps.data)"
                    v-if="role=='teacher'"
                  />
                </div>
              </div>
            </div>
          </template>

          <template #grid="slotProps">
            <div
              class="col-12 md:col-3 cursor-pointer"
              @click="goTo(slotProps.data)"
            >
              <div class="card m-3 border-1 surface-border">
                <div
                  class="flex align-items-center justify-content-between"
                ></div>
                <div class="text-center">
                  <img
                    :src="'http://localhost:8081/images/' + src(slotProps.data)"
                    :alt="slotProps.data.name"
                    class="w-9 shadow-2 my-3 mx-0"
                  />
                  <div class="text-2xl font-bold">
                    {{ slotProps.data.title }}
                  </div>
                  <div class="mb-3 mt-2">{{ slotProps.data.descprtion }}</div>
                </div>
                <div class="flex align-items-center justify-content-center">
                  <Button
                    icon="pi pi-pencil"
                    class="p-button-rounded p-button-success mr-2"
                    @click="editModule(slotProps.data)"
                    v-if="role=='teacher'"
                  />

                  <Button
                    icon="pi pi-trash"
                    class="p-button-rounded p-button-warning"
                    @click="confirmDeleteModule(slotProps.data)"
                    v-if="role=='teacher'"
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
import axios from "../../http";
export default {
  inject:['role'],
  data() {
    return {
      data: [],
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

  async created() {
    await axios.get("/api/module").then((res) => {
      this.data = res.data;
    });
  },

  methods: {
    src(info) {
      console.log(info);
      return info.img_url.split("/")[2];
    },
    goTo(data) {

      
      this.$router.push({
        name: "module-detail",
        params: { moduleId: data.id },
      });
    },
    editModule(data) {
      if(this.role=="teacher"){

        this.$router.push({ name: "module-edit", params: { moduleId: data.id } });
      }
    },
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
