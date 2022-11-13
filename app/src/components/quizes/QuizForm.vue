<template>
  <div class="card p-fluid">
    <div class="flex justify-content-center">
      <div class="w-6 mt-5">
        <div class="field">
          <label>Quiz Title</label>
          <InputText
            v-model="quiz.title"
            @input="v$.quiz.title.$touch()"
            @blur="v$.quiz.title.$touch()"
            :class="v$.quiz.title.$errors.length != 0 ? 'p-invalid' : ''"
          />
          <p class="p-error" v-for="error of v$.quiz.title.$errors">
            {{ error.$message }}
          </p>
        </div>
        <div class="field">
          <label for="Description">Quiz Description</label>
          <InputText
            v-model="quiz.description"
            @input="v$.quiz.description.$touch()"
            @blur="v$.quiz.description.$touch()"
            :class="v$.quiz.description.$errors.length != 0 ? 'p-invalid' : ''"
          />
          <p class="p-error" v-for="error of v$.quiz.description.$errors">
            {{ error.$message }}
          </p>
        </div>
        <div class="field">
          <label for="">Duration (In Minutes)</label>
          <InputNumber
            v-model="quiz.duration"
            @input="v$.quiz.duration.$touch()"
            @blur="v$.quiz.duration.$touch()"
            :class="v$.quiz.duration.$errors.length != 0 ? 'p-invalid' : ''"
          />
          <p class="p-error" v-for="error of v$.quiz.duration.$errors">
            {{ error.$message }}
          </p>
        </div>
        <Button label="Create The Quiz" @click="createQuiz" />
        <h5>Add Questions:</h5>
        <div class="card p-fuild" v-for="(question, index1) of questions">
          <div class="field">
            <p class="text-lg">Question {{ index1 + 1 }}:</p>
            <label for="Description" class="mt-2">Question</label>
            <InputText v-model="question.text" placeholder="Quesiton text" />
            <label for="Description" class="mt-2">Choices</label>
            <i
              class="pi pi-plus cursor-pointer text-md m-2"
              @click="addChoice(index1)"
            ></i>
            <i
              v-if="question.choices.length != 0"
              class="pi pi-minus cursor-pointer text-md m-2"
              @click="deleteChoice(index1)"
            ></i>
            <div v-for="(choice, index2) of question.choices">
              <div class="flex">
                <InputText
                  class="mt-2"
                  :placeholder="'Option ' + parseInt(index2 + 1)"
                  type="text"
                  v-model="choice.text"
                />
              </div>
            </div>
            <Dropdown
              v-if="question.choices.length != 0"
              @change="setCorrectAnswer(index1)"
              v-model="question.option"
              :options="question.options"
              class="mt-2"
              optionLabel="name"
              placeholder="Select an Answer"
            />
          </div>
        </div>

        <Button class="mt-5" @click="addQuestions" label="Add Questions" />
      </div>
    </div>
  </div>
</template>

<script>
import { required, integer, minValue, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import axios from "../../http";
export default {
  name: "QuizForm",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      courseId: null,
      quizId: null,
      quiz: {
        title: "",
        description: "",
        duration: 0,
      },
      questions: [
        {
          text: "",
          choices: [],

          option: "",
          options: [],
        },
      ],
    };
  },
  created() {
    let courseId = this.$route.params.courseId;
    let quizId = this.$route.params.quizId;
    this.courseId = courseId;
    if (quizId) {
      this.quizId = quizId;
      axios.get("/api/course/" + courseId + "/quiz/" + quizId).then((res) => {
        this.quiz = res.data;
      });
    }
  },

  validations() {
    return {
      quiz: {
        title: { required },
        description: { required },
        duration: { required, integer, minValue: minValue(1) },
      },
      questions: {
        $each: helpers.forEach({
          title: { required },
          option: { required },
        }),
      },
    };
  },
  methods: {
    addQuestions() {
      if (!this.quizId) {
        this.$toast.add({
          severity: "warn",
          summary: "Please create the quiz first.",

          life: 3000,
        });
        return;
      }
      this.questions.forEach((question) => {
        axios
          .post("/api/quiz/" + this.quizId + "/question", {
            text: question.text,
          })
          .then((res) => {
            let questionId = res.data.id;
            axios
              .post("/api/question/" + questionId + "/choice", {
                choices: question.choices,
              })
              .then((res) => {
                console.log(res.data);
              });
          });
      });
    },
    createQuiz() {
      axios
        .post("/api/course/" + this.courseId + "/quiz", this.quiz)
        .then((res) => {
          let quizId = res.data.id;
          this.$router.push({
            name: "quiz-edit",
            params: { courseId: this.courseId, quizId },
          });
        });
    },
    addChoice(index) {
      let object = new Object({ text: "", isCorrect: false });
      this.questions[index].choices.push(object);
      this.questions[index].options.push({
        name: "option " + parseInt(this.questions[index].choices.length),
        code: this.questions[index].choices.length,
      });
    },
    deleteChoice(index) {
      this.questions[index].choices.pop();
      this.options.pop();
    },
    setCorrectAnswer(questionIndex) {
      let index = this.questions[questionIndex].option.code - 1;
      this.questions[questionIndex].choices = this.questions[
        questionIndex
      ].choices.map((c) => ({
        ...c,
        isCorrect: false,
      }));
      this.questions[questionIndex].choices[index].isCorrect = true;
      if (questionIndex == this.questions.length - 1) {
        this.questions.push(
          new Object({
            title: "",
            choices: [],
            isCorrect: "",
            option: "",
            options: [],
          })
        );
      }
    },
  },
};
</script>
