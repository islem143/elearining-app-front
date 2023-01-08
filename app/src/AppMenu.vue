<template>
  <div class="layout-menu-container">
    <!-- <AppSubmenu
      :items="items"
      class="layout-menu"
      :root="true"
      @menuitem-click="onMenuItemClick"
      @keydown="onKeyDown"
    /> -->
    <div class="p-2">
      <Router-link
        :key="item.id"
        v-for="item in items"
        :to="item.to"
        @click="setCurrentItem(item)"
      >
        <a
          v-if="item.roles.includes(role)"
          :class="
            'block mb-2  hover:surface-200 p-2 ' +
            (currentItem == item.id ? 'text-blue-400' : 'text-900')
          "
          href="#"
        >
          {{ item.label }}</a
        >
      </Router-link>
    </div>
  </div>
</template>

<script>
import AppSubmenu from "./AppSubmenu.vue";
import axios from "./http";
export default {
  inject: ["role"],
  data() {
    return {
      items: [],
      currentItem: null,
    };
  },
  created() {
    if (this.role == "super-admin") {
      this.items = [
        {
          id: 1,
          label: "Dashbarod",
          roles: ["super-admin"],
          to: { name: "admin-dashboard" },
        },
        {
          id: 2,
          label: "Users",
          roles: ["super-admin"],
          to: { name: "users-list" },
        },
        {
          id: 3,
          label: "History",
          roles: ["teacher", "super-admin"],
          to: { name: "history-list" },
        },
      ];
    } else if (this.role == "teacher") {
      this.items = [
        {
          id: 1,
          label: "Modules",
          roles: ["teacher", "student"],
          to: { name: "module-list" },
        },
        {
          id: 2,
          label: "Chat",
          roles: ["teacher", "student", "super-admin"],
          to: { name: "chat" },
        },
        {
          id: 3,
          label: "History",
          roles: ["teacher", "super-admin"],
          to: { name: "history-list" },
        },
      ];
    } else {
      this.items = [
        {
          id: 1,
          label: "Modules",
          roles: ["teacher", "student"],
          to: { name: "module-list" },
        },
        {
          id: 1,
          label: "My Modules",
          roles: ["student"],
          to: { name: "module-student-list" },
        },
        {
          id: 2,
          label: "Chat",
          roles: ["teacher", "student", "super-admin"],
          to: { name: "chat" },
        },
      ];
    }
  },

  props: {
    model: Array,
  },

  methods: {
    setCurrentItem(item) {
      this.currentItem = item.id;
    },
    moduleDetail(module) {
      this.$router.push({
        name: "module-detail",
        params: { moduleId: module.id },
      });
    },
    onMenuItemClick(event) {
      this.$emit("menuitem-click", event);
    },
    onKeyDown(event) {
      const nodeElement = event.target;
      if (event.code === "Enter" || event.code === "Space") {
        nodeElement.click();
        event.preventDefault();
      }
    },
    bannerImage() {
      return this.$appState.darkTheme
        ? "images/banner-primeblocks-dark.png"
        : "images/banner-primeblocks.png";
    },
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    },
  },
  components: {
    AppSubmenu: AppSubmenu,
  },
};
</script>
