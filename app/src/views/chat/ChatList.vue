<template>
  <div
    class="card pt-5 px-5 p-fluid bg-white"
    style="height: 700px; overflow: auto"
  >
    <div
      @click="$emit('select-user', user)"
      class="card cursor-pointer"
      v-for="user in users"
      :key="user.id"
    >
      {{ user.name }}
    </div>
  </div>
</template>

<script>
import axios from "../../http";
export default {
  name: "ChatList",
  data() {
    return {
      users: [],
    };
  },

  props:["users"]
};
</script>
