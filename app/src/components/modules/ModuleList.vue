<template>
  <div class="grid w-8 m-auto">
    <div class="col-12">
      <div class="card">
        <h3>Modules</h3>
        <div class="flex">
          <router-link v-if="role == 'teacher'" :to="{ name: 'module-create' }">
            <Button
              label="New Module"
              icon="pi pi-plus"
              class="p-button-success mr-2"
              @click="openNew"
            />
          </router-link>
        </div>
        <module-cards
          @edit-module="editModule"
          @confirm-delete-module="confirmDeleteModule"
          @go-to="goTo"
          :modules="data"
        />
        <!-- <DataView
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
               
                <router-link
                  v-if="role == 'teacher'" 
                  :to="{ name: 'module-create' }"
                >
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
            <div class="col-12 cursor-pointer">
              <div
                class="flex flex-column md:flex-row align-items-center p-3 w-full"
              >
                <img
                  v-if="slotProps.data.img_url"
                  @click="goTo(slotProps.data)"
                  :src="'http://localhost:8081/images/' + src(slotProps.data)"
                  :alt="slotProps.data.name"
                  class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"
                />
                <div
                  @click="goTo(slotProps.data)"
                  class="flex-1 text-center md:text-left"
                >
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
                    v-if="role == 'teacher'"
                  />

                  <Button
                    icon="pi pi-trash"
                    class="p-button-rounded p-button-warning"
                    @click="confirmDeleteModule(slotProps.data)"
                    v-if="role == 'teacher'"
                  />
                </div>
              </div>
            </div>
          </template>

          <template #grid="slotProps">
            <div class="col-12 md:col-3 cursor-pointer m-2">
              <div class="card p-0 m-0 border-1 surface-border overflow-hidden">
                <div
                  class="flex align-items-center justify-content-between"
                ></div>
                <div @click="goTo(slotProps.data)" class="text-center">
                  <img
                    @click="goTo(slotProps.data)"
                    v-if="slotProps.data.img_url"
                    :src="'http://localhost:8081/images/' + src(slotProps.data)"
                    :alt="slotProps.data.name"
                    class="w-full shadow-2"
                  />
                  <div class="p-3">
                    <div class="text-2xl font-bold">
                      {{ slotProps.data.title }}
                    </div>
                    <div class="mb-3 mt-2">{{ slotProps.data.descprtion }}</div>
                  </div>
                </div>
                <div class="flex align-items-center justify-content-center">
                  <Button
                    icon="pi pi-pencil"
                    class="p-button-rounded p-button-success mr-2"
                    @click="editModule(slotProps.data)"
                    v-if="role == 'teacher'"
                  />

                  <Button
                    icon="pi pi-trash"
                    class="p-button-rounded p-button-warning"
                    @click="confirmDeleteModule(slotProps.data)"
                    v-if="role == 'teacher'"
                  />
                </div>
              </div>
            </div>
          </template>
        </DataView> -->
        <Dialog
          v-model:visible="deleteModuleDialog"
          :style="{ width: '450px' }"
          header="Confirm"
          :modal="true"
        >
          <div class="confirmation-content">
            <i
              class="pi pi-exclamation-triangle mr-3"
              style="font-size: 2rem"
            />
            <span>Are you sure you want to delete the selected module?</span>
          </div>
          <template #footer>
            <Button
              label="No"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteModuleDialog = false"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              class="p-button-text"
              @click="deleteModule"
            />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../http";
import ModuleCards from "./ModuleCard.vue";
export default {
  inject: ["role"],
  components: {
    ModuleCards,
  },
  data() {
    return {
      selectedModule: null,
      deleteModuleDialog: false,
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
      if (this.role == "teacher") {
        this.$router.push({
          name: "module-edit",
          params: { moduleId: data.id },
        });
      }
    },
    async deleteModule() {
      await axios
        .delete("/api/module/" + this.selectedModule.id)
        .then((res) => {
          this.deleteModuleDialog = false;
          let index = this.data.findIndex(
            (d) => d.id == this.selectedModule.id
          );
          this.data.splice(index, 1);
        });
    },

    confirmDeleteModule(data) {
      this.deleteModuleDialog = true;
      this.selectedModule = data;
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
