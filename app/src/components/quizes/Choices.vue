<template>
  <Choice :selectedChoice="selectedChoice" @selectAnswer="$emit('selectAnswer',choice)" v-for="choice in choices" :choice="choice"/>
</template>

<script>
import Choice from "./Choice.vue";
export default {
  name: "Choices",
  props: {
    choices: {
      type: Array,
    },
    selectedChoice: {
      type: Object,
    },
  },
  components: {
    Choice,
  },
};
</script>
