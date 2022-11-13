<template>
  <Choice v-for="choice in choices" />
</template>

<script>
import Choice from "./Choice.vue";
export default {
  name: "Choices",
  components: {
    Choice,
  },
  data() {
    return {
      choices: [1, 2, 3],
    };
  },
};
</script>
