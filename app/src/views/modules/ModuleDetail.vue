<template>
  <div class="grid card p-fluid">
    <div class="col-3">
      <ModuleInfoVue :info="info" />
    </div>
    <div class="col-9">
      <CouresListVue />
    </div>

  </div>
</template>

<script>
import ModuleInfoVue from "../../components/modules/ModuleInfo.vue";
import CouresListVue from "../../components/courses/CouresList.vue";
import axios from "../../http";

export default {
  name: "ModuleDetail",
  components: {
    ModuleInfoVue,
    CouresListVue,
  },
  data() {
    return {
      info: {
        title: "",
        description: "",
        img_url: "",
      },
    };
  },
  created() {
    let id = this.$route.params.moduleId;

    axios.get("/api/module/" + id).then((res) => {
      this.info.title = res.data.title;
      this.info.description = res.data.descprtion;
      this.info.img_url = res.data.img_url;
    });
  },
};
</script>
