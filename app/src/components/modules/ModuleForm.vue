<template>
  <div class="card p-fluid">
    <h4>Add module</h4>
    <div class="flex justify-content-center">
      <div class="w-6 mt-5">
        <div class="field">
          <label for="name1">Title</label>
          <InputText id="name1" type="text" />
        </div>
        <div class="field">
          <label for="email1">Description</label>
          <InputText id="email1" type="text" />
        </div>
        <div class="field">
          <label for="age1">Image</label>
          <FileUpload mode="basic" name="demo[]" url="./upload.php" accept="image/*" :maxFileSize="1000000"  />
        </div>
      </div>
    </div>
  </div>
</template>
