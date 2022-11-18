<template>
  {{ totalPoints }}
</template>

<script>
export default {
  name: "QuizStat",
  props: {
    totalPoints: {
      type: Number,
    },
  },
};
</script>
