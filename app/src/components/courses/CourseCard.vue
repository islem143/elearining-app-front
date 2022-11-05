<template>
  <div
    class="flex pa-7  justify-content-between cursor-pointer card p-fuild h-8rem transition-all transition-duration-200  hover:bg-gray-100 shadow-4 hover:shadow-6"
  >
    <div>
      <a href="" class="text-xl font-bold text-900">Title</a>
      <p class="mt-2">Description</p>
    </div>
    <div>
      <Button label="Start" icon="pi pi-arrow-right" iconPos="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
};
</script>
