<template>
  <h4>Courses</h4>
  <CourseCardVue v-for="i in items" />
</template>

<script>
import CourseCardVue from "./CourseCard.vue";
export default {
  name: "CourseList",
  data() {
    return {
      items: [1,2,3],
    };
  },
  components: {
    CourseCardVue,
  },
};
</script>
