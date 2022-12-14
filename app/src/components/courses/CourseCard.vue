<template>
  <div
    class="
      pa-7
      cursor-pointer
      p-5
      m-4
      border-round
      transition-all transition-duration-200
      hover:bg-gray-100
      shadow-4
      hover:shadow-6
    "
  >
    <div>
      <a href="" class="text-xl font-bold text-900">{{ course.title }}</a>
      <p class="mt-2">Description: {{ course.description }}</p>
    </div>
    <div v-if="course.is_taken == false && role != 'teacher'">
      <Button @click="startCourse">Start the course</Button>
    </div>
    <div v-else>
      <div class="flex justify-content-between">
        <div>
          <Button
            v-if="role == 'teacher'"
            label="Edit Course"
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editCourse"
          />
        </div>
      </div>
      <h5>Learn:</h5>
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
      <p>
        <i
          :class="
            'pi pi-video' + ' mr-3 mt-2 border-1 p-1 surface-200 text-900'
          "
          style="font-size: 1rem"
        >
        </i>
        <a
          class="text-900 text-lg hover:underline"
          @click="openDialog('YsqoF3hqdkg', 'Average atomic mass')"
        >
          Average atomic mass
        </a>
      </p>
      <h5>Practise:</h5>
      <div>
        <div
          v-if="course.quizzes.length != 0"
          v-for="quiz in course.quizzes"
          class="flex justify-content-between align-content-center mb-3"
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

          <div class="flex gap-2">
            <Button
              v-if="role == 'student'"
              class="text-sm"
              @click="goToQuiz(quiz)"
              :label="quiz.user_id ? 'See Result' : 'Start Quiz'"
            />
            <Button
              class="text-sm"
              v-if="role == 'teacher'"
              @click="editQuiz(quiz)"
              label="Edit Quiz"
            />
          </div>
        </div>

        <div v-else>
          <p>This course has not a quiz.</p>
        </div>
        <Dialog :header="this.title" v-model:visible="visible">
          <iframe
            :src="'http://www.youtube.com/embed/' + this.url"
            width="560"
            height="315"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../http";
//import Dialogg from "./Dialog.vue";
export default {
  name: "CourseCard",
  inject: ["role"],
  components: {
    // Dialogg,
  },
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
      url: "",
      title: "",
      visible: false,
      icons: {
        video: "pi pi-video",
        image: "pi pi-image",
        file: "pi pi-file",
      },
    };
  },
  created() {},

  methods: {
    goToQuiz(quiz) {
      this.$router.push({
        name: "quiz",
        params: {
          courseId: this.course.id,
          quizId: quiz.id,
        },
      });
    },
    editQuiz(quiz) {
      this.$router.push({
        name: "quiz-edit",
        params: {
          courseId: this.course.id,
          quizId: quiz.id,
        },
      });
    },
    courseDetail() {
      this.$router.push({
        name: "course-detail",
        params: {
          moduleId: this.$route.params.moduleId,
          courseId: this.course.id,
        },
      });
    },
    openDialog(url, title) {
      this.visible = true;
      this.url = url;
      this.title = title;
    },
    startCourse() {
      axios
        .post(
          "/api/module/" +
            this.$route.params.moduleId +
            "/course/" +
            this.course.id +
            "/startCourse"
        )
        .then((res) => {
          console.log(res);
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
