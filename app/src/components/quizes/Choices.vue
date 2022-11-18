<template>
  <Choice @selectAnswer="$emit('selectAnswer',choice)" v-for="choice in choices" :choice="choice"/>
</template>

<script>
import Choice from "./Choice.vue";
export default {
  name: "Choices",
  props: {
    choices: {
      type: Array,
    },
  },
  components: {
    Choice,
  },
};
</script>
