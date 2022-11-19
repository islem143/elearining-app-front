<template>
  <div>
    {{ parseInt(duration / 1000 / 60) + "mn" }}
    {{ ((duration / 1000) % 60) + "s" }}
    <p class="text-red-400">{{ showError ? "please select a choice" : "" }}</p>
    <div
      v-if="questions.length != 0 && !quizFinished"
      class="flex w-6 mx-auto flex-column mt-8 justify-content-center align-items-center"
    >
      <Question :question="questions[currentIndex]" />
      <Choices @selectAnswer="selectAnswer" :choices="questions[23].choices" />
      <Button
        class="align-self-end"
        :label="currentIndex < questions.length - 1 ? 'Next' : 'Finish Quiz'"
        @click="nextQuestion"
      />
    </div>
    <div v-else>
      <QuizStat :totalPoints="stats.totalPoints" :duration="stats.duration" />
    </div>
  </div>
</template>

<script>
import Question from "../../components/quizes/Question.vue";
import Choices from "../../components/quizes/Choices.vue";
import QuizStat from "../../components/quizes/QuizStat.vue";
import axios from "../../http";
export default {
  name: "Quiz",
  components: {
    Question,
    Choices,
    QuizStat,
  },
  data() {
    return {
      quizId: null,
      courseId: null,
      quizFinished: false,
      showError: false,
      currentIndex: 0,
      questions: [],
      totalPoints: 0,
      answers: [],
      duration: 0,
      startDuration: null,
      timerId: null,
      stats: {
        duration: null,
        totalPoints: null,
      },
    };
  },
  watch: {
    currentIndex(val) {
      if (val == this.questions.length) {
        this.finishQuiz();
      }
    },
    duration(val) {
      if (val == 0) {
        this.finishQuiz();
      }
    },
  },
  created() {
    let courseId = this.$route.params.courseId;
    let quizId = this.$route.params.quizId;
    this.quizId = quizId;
    this.courseId = courseId;
    console.log(courseId, quizId);
    axios.get("api/course/" + courseId + "/quiz/" + quizId).then((res) => {
      this.questions = res.data.questions;

      this.duration = this.startDuration = res.data.duration * 60 * 1000;

      this.timerId = setInterval(() => {
        this.duration = this.duration - 1000;
      }, 1000);
    });
  },

  methods: {
    finishQuiz() {
      this.quizFinished = true;
      clearInterval(this.timerId);
      this.getScore();
      this.saveQuizResult();
    },
    saveQuizResult() {
      axios
        .put(
          "/api/course/" +
            this.courseId +
            "/quiz/" +
            this.quizId +
            "/saveResult",
          {
            mark: this.stats.totalPoints,
            time: this.stats.duration,
          }
        )
        .then((res) => {
          console.log(res);
        });
    },
    getScore() {
      let correctAnswers = this.answers.filter((an) => an.is_correct);
      this.totalPoints = correctAnswers.length;
      this.stats.totalPoints = correctAnswers.length;
      this.stats.duration = this.startDuration - this.duration;
    },
    selectAnswer(choice) {
      this.answers[this.currentIndex] = choice;
    },
    nextQuestion() {
      if (this.answers[this.currentIndex]) {
        this.showError = false;
        console.log(this.answers[this.currentIndex]);

        axios
          .put(
            "/api/question/" +
              this.questions[this.currentIndex].id +
              "/choice/" +
              this.answers[this.currentIndex].id +
              "/attach"
          )
          .then((res) => {
            console.log(res);
          });
        this.currentIndex++;
      } else {
        this.showError = true;
      }
    },
  },
};
</script>
