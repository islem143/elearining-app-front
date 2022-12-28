<template>
  {{ messages }}

  <input type="text" v-model="message" />
  <button @click="sendMessage">btn</button>
</template>

<script>
import axios from "../../http";
export default {
  name: "Chat",

  data() {
    return {
      messages: [],
      message: "",
    };
  },
  created() {
    axios.get("/api/messages").then((res) => {
      console.log(res.data);
    });

    window.Echo.private("chat").listen("MessageSent", (e) => {
      console.log("yes", e);
      // this.messages.push({
      //   message: e.message.message,
      //   user: e.user,
      // });
    });
  },

  methods: {
    sendMessage() {
      axios.post("/api/messages", { message: this.message }).then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>
