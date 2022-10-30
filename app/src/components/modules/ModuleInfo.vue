<template>
  <div class="border-right-2">
    <div class="mt-4">
      <img
        width="250"
        :src="'http://localhost:8081/images/' + info.img_url.split('/')[2]"
        alt=""
      />
    </div>
    <div class="p-2">
      <h3 class="mt-2">{{ info.title }}</h3>
      <p>{{ info.description }} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam asperiores placeat, fuga hic impedit deserunt tempore odio repudiandae ratione aperiam </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModuleInfo",
  props: {
    info: {
      type: Object,
    },
  },
};
</script>
