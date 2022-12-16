<template>
  <div class="card p-fluid">
    <h4>Add Course</h4>
    <Button label="Add Quiz" class="w-1" @click="createQuiz" />
    <div class="flex justify-content-center">
      <div class="w-6 mt-5">
        <div class="field">
          <label for="name1">Title</label>
          <InputText v-model="info.title" type="text" />
        </div>
        <div class="field">
          <label for="Description">Description</label>
          <InputText v-model="info.description" type="text" />
        </div>
        <Button class="mt-5" @click="submit" label="Submit" />
        <UploadMedia
          up
          @upload-files="upload"
          @remove-media-field="removeMediaFeild"
          @add-media-field="addMediaField"
          :media="media"
        />
        <hr />
        <h4>Add Course Content</h4>

        <ContentForm @add-content="addContent" />
      </div>
      <!-- <ul>
        <li v-for="media of mediaList">
          <a :href="'http://localhost:8081/'+media.url" >{{media.name}}</a>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import UploadMedia from "./CourseUpload.vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import axios from "../../http";
import UploadService from "../../services/UploadService";
import QuizForm from "../quizes/QuizForm.vue";
import ContentForm from "./ContentForm.vue";

export default {
  name: "CourseForm",
  components: {
    UploadMedia,
    QuizForm,
    ContentForm,
  },
  created() {
    let moduleId = parseInt(this.$route.params.moduleId);
    let courseId = parseInt(this.$route.params.courseId);
    this.moduleId = moduleId;
    this.courseId = courseId;
    if (this.courseId) {
      axios
        .get("/api/module/" + this.moduleId + "/course/" + this.courseId)
        .then((res) => {
          this.info.title = res.data.title;
          this.info.description = res.data.description;
        });
      axios.get("/api/media/" + this.courseId).then((res) => {
        this.mediaList = res.data;
      });
    }
  },
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      modukeId: null,
      courseId: null,
      info: {
        title: "",
        description: "",
      },
      media: [],
      mediaList: [],
      types: ["file", "image", "video"],
    };
  },
  validations() {
    return {
      info: {
        title: { required },
        description: { required },
      },
    };
  },
  methods: {
    addContent(content) {
      if (this.courseId) {
        axios
          .post(
            "/api/module/" +
              this.moduleId +
              "/course/" +
              this.courseId +
              "/content",
            { content }
          )
          .then((res) => {console.log("yes");});
      }
    },
    removeMediaFeild(index) {
      this.media.splice(index, 1);
    },
    createQuiz() {
      if (!this.courseId) {
        this.$toast.add({
          severity: "warn",
          summary: "Please create the course first.",

          life: 3000,
        });
        return;
      }
      this.$router.push({
        name: "quiz-create",
        params: { courseId: this.courseId },
      });
    },
    addMediaField() {
      let obj = new Object();
      this.media.push(obj);
    },
    errorMessages(key) {
      const errors = [];
      if (!this.v$.goal[key].$dirty) return errors;
      for (const err of this.v$.goal[key].$errors) {
        errors.push(err.$message);
      }
      return errors;
    },
    uploadFiles(selectedFiles, courseId) {
      for (const file of selectedFiles) {
        UploadService.upload(
          file,
          { courseId: courseId },
          "/api/media",
          (event) => {
            this.$toast.add({
              severity: "success",
              summary: "Files were uploaded.",

              life: 3000,
            });
          }
        );
      }
    },
    async upload(selectedFiles) {
      let courseId = this.courseId ? this.courseId : null;
      if (!courseId) {
        courseId = await this.submit(true);
      }
      this.uploadFiles(selectedFiles, courseId);
    },
    async submit(e, withUpload) {
      const isFormCorrect = await this.v$.$validate();
      console.log(withUpload);
      if (isFormCorrect) {
        if (this.courseId) {
          await axios.put(
            "/api/module/" + this.moduleId + "/course/" + this.courseId,
            this.info
          );
          this.$toast.add({
            severity: "success",
            summary: "Course Updated",

            life: 3000,
          });
        } else {
          return await axios
            .post("/api/module/" + this.moduleId + "/course", this.info)
            .then((res) => {
              const id = res.data.id;
              if (withUpload) {
                return id;
              } else {
                this.$router.push({
                  name: "course-detail",
                  params: { moduleId: this.moduleId, courseId: id },
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
  },
};
</script>
