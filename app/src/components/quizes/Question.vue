<template>
  <div class="card bg-white py-6 px-8">
    <h4>Question:</h4>
    <p>
     {{question.text}}
    </p>
  </div>
</template>

<script>
export default {
  name: "Question",
  props: {
    question: {
      type: Object,
    },
  },
};
</script>
