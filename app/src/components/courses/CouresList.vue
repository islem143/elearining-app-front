<template>
  <div>
    
    <Chip  label="Completed" class="py-1 px-3 cursor-pointer font-bold text-900 hover:surface-400 mr-2 mb-3 custom-chip" />

    <CourseCardVue v-for="i in items" />
  </div>
</template>

<script>
import CourseCardVue from "./CourseCard.vue";
export default {
  name: "CourseList",
  data() {
    return {
      items: [1, 2, 3],
    };
  },
  components: {
    CourseCardVue,
  },
};
</script>

<style lang="scss" scoped>
// .p-chip.custom-chip {
//   background: var(--primary-color);
//   color: var(--primary-color-text);
// }
</style>
