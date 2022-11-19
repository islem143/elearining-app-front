<template>
  <div
    class="pa-7 cursor-pointer p-5 m-4 border-round transition-all transition-duration-200 hover:bg-gray-100 shadow-4 hover:shadow-6"
  >
    <div class="flex justify-content-between">
      <div>
        <a href="" class="text-xl font-bold text-900">{{ course.title }}</a>
        <p class="mt-2">Description: {{ course.description }}</p>
      </div>

      <div>
        <Button
          label="Edit Course"
          icon="pi pi-pencil"
          class="p-button-rounded p-button-success mr-2"
          @click="editCourse"
        />
      </div>
    </div>
    <h5>Courses:</h5>
    <p v-for="media in course.media">
      <i
        :class="
          icons[media.type] + ' mr-3 mt-2 border-1 p-1 surface-200 text-900'
        "
        style="font-size: 1rem"
      >
      </i>
      <a
        class="text-900 text-lg hover:underline"
        :href="'http://localhost:8081/' + media.url"
        >{{ media.name }}</a
      >
    </p>
    <h5>Quiz:</h5>
    <div class="w-5">
      <div
        v-for="quiz in course.quizzes"
        class="flex gap-5 justify-content-between align-content-center mb-3"
      >
        <div class="align-self-center">
          <p v-if="quiz.user_id">
            <b>Title: </b>{{ quiz.title }}, <b> mark: {{ quiz.mark }}</b>
            <b> time: {{ quiz.time }}</b>
          </p>

          <p v-else>
            <b>Title: </b>{{ quiz.title }}, <b>Duration: </b>
            {{ quiz.duration }} mn
          </p>
        </div>

        <Button
          :label="quiz.user_id ? 'See Result' : 'Start Quiz'"
          style="width: 18rem"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    course: {
      type: Object,
    },
    moduleId: {
      type: Number,
    },
  },
  data() {
    return {
      quizzes: [],
      icons: {
        video: "pi pi-video",
        image: "pi pi-image",
        file: "pi pi-file",
      },
    };
  },
  created() {},

  methods: {
    courseDetail() {
      this.$router.push({
        name: "course-detail",
        params: {
          moduleId: this.$route.params.moduleId,
          courseId: this.course.id,
        },
      });
    },

    editCourse() {
      this.$router.push({
        name: "course-edit",
        params: {
          moduleId: this.$route.params.moduleId,
          courseId: this.course.id,
        },
      });
    },
  },
};
</script>
