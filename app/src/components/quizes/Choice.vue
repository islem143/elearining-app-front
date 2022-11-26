<template>
  <div
    :class="
      'w-9 card py-4 px-6 cursor-pointer hover:surface-400 ' +
      selectedChoice
    "
    @click="$emit('selectAnswer', choice)"
  >
    <p>
      {{ choice.text }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    choice: {
      type: Object,
    },
    selectedChoice: {
      type: Object,
    },
  },
  computed: {
    selectedChoice() {
      return this.selectedChoice && this.selectedChoice.id == this.choice.id
        ? "surface-300 "
        : "bg-white";
    },
  },
  name: "Choice",
};
</script>
