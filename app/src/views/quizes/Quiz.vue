<template>
  <div>
    {{ parseInt(duration / 1000 / 60) + "mn" }}
    {{ ((duration / 1000) % 60) + "s" }}
    <div
      v-if="questions.length != 0 && currentIndex <= questions.length - 1  && duration>=0"
      class="flex w-6 mx-auto flex-column mt-8 justify-content-center align-items-center"
    >
      <Question :question="questions[currentIndex]" />
      <Choices @selectAnswer="selectAnswer" :choices="questions[23].choices" />
      <Button class="align-self-end" label="Next" @click="nextQuestion" />
    </div>
    <div v-else>
      <QuizStat :totalPoints="totalPoints" />
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
      currentIndex: 0,
      questions: [],
      totalPoints: 0,
      answers: [],
      duration: 0,
    };
  },
  watch: {
    currentIndex(val) {
      if (val == this.questions.length) {
        this.getScore();
      }
    },
    duration(val) {
      if (val == 0) {
        console.log("time finished");

      }
    },
  },
  created() {
    let courseId = this.$route.params.courseId;
    let quizId = this.$route.params.quizId;
    console.log(courseId, quizId);
    axios.get("api/course/" + courseId + "/quiz/" + quizId).then((res) => {
      this.questions = res.data.questions;
     // this.duration = res.data.duration * 60 * 1000;
     this.duration=10000;
      setInterval(() => {
        this.duration = this.duration - 1000;
      }, 1000);
    });
  },

  methods: {
    getScore() {
      let correctAnswers = this.answers.filter((an) => an.is_correct);
      this.totalPoints = correctAnswers.length;
    },
    selectAnswer(choice) {
      console.log(choice);
      this.answers[this.currentIndex] = choice;
    },
    nextQuestion() {
      this.currentIndex++;
    },
  },
};
</script>
