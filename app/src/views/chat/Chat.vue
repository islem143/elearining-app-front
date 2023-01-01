<template>
  {{ messages }}

  <input type="text" v-model="message" />
  <button @click="sendMessage">btn</button>
</template>

<script>
import axios from "../../http";
import store from "../../store";
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

    window.Echo.private("chat." + store.state.auth.user.data.id).listen(
      "MessageSent",
      (e) => {
        console.log("message reciedv", e);
        // this.messages.push({
        //   message: e.message.message,
        //   user: e.user,
        // });
      }
    );
  },

  methods: {
    sendMessage() {
      axios
        .post("/api/messages", { message: this.message, receiver_id: 8 })
        .then((res) => {
          console.log(res.data);
        });
    },
  },
};
</script>
