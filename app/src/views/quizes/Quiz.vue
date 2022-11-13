<template>
  <div class="flex w-6 mx-auto flex-column mt-8 justify-content-center align-items-center">
    <Question />
    <Choices />
    <Button class="align-self-end" label="Next" />
  </div>
</template>

<script>
import Question from "../../components/quizes/Question.vue";
import Choices from "../../components/quizes/Choices.vue";
export default {
  name: "Quiz",
  components: {
    Question,
    Choices,
  },
};
</script>
