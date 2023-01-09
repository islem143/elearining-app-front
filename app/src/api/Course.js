import axios from "./index";

class Course {
  getCourses(moduleId) {
    return axios.get("/api/module/" + moduleId + "/course").then((res) => {
      return res.data;
    });
  }
}


export default new Course();