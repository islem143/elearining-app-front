<template>
  <div class="card bg-white py-4 px-6 cursor-pointer hover:surface-200" @click="$emit('selectAnswer',choice)">
    <p >
     {{choice.text}}
    </p>
  </div>
</template>

<script>
export default {
  props:{
    choice:{
      type:Object
    }
  },
  name: "Choice",
};
</script>
