<template>
  <p>total points: {{ totalPoints }}</p>
  <p>
    duration: {{ parseInt(duration / 1000 / 60) + "mn" }}
    {{ ((duration / 1000) % 60) + "s" }}
  </p>
</template>

<script>
export default {
  name: "QuizStat",
  props: {
    totalPoints: {
      type: Number,
    },
    duration: {
      type: Number,
    },
  },
};
</script>
