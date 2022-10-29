import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import { hasToken, hasRoutes, getRoles, setHasRoutes } from "../utils/auth";
const staticRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/Login.vue"),
  },

  //   {
  //     path: '/error',
  //     name: 'error',
  //     component: () => import('./pages/Error.vue')
  // },
  {
    path: "/404",
    name: "notfound",
    component: () => import("../views/NotFound.vue"),
  },
  // {
  //     path: '/access',
  //     name: 'access',
  //     component: () => import('./pages/Access.vue')
  // }
  {
    path: "/",

    component: App,
    redirect: "/dashboard",

    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../components/Dashboard.vue"),
        meta: {
          roles: ["super-admin", "student", "teacher"],
        },
      },
    ],
  },
];

const asyncRoutes = [
  {
    path: "/modules",
    component: App,
    redirect: "/modules/list",
    children: [
      {
        path: "list",
        name: "module-list",
        component: () => import("../views/modules/ModuleList.vue"),
        meta: {
          roles: ["super-admin", "student", "teacher"],
        },
      },
      {
        path: "create",
        name: "module-create",
        component: () => import("../views/modules/ModuleEdit.vue"),
        meta: {
          roles: ["super-admin", "teacher"],
        },
      },
      {
        path: "edit/:moduleId(\\d+)",
        name: "module-edit",
        component: () => import("../views/modules/ModuleEdit.vue"),
        meta: {
          roles: ["super-admin", "teacher"],
        },
      },
    ],
  },
  { path: "/:pathMatch(.*)", redirect: "/404", hidden: true },
];

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

function filterRoutes(roles, routes) {
  const filtredRoutes = [];
  routes.forEach((route) => {
    let tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterRoutes(roles, tmp.children);
      }

      filtredRoutes.push(tmp);
    }
  });
  return filtredRoutes;
}

function generateRoutes(roles, routes) {
  if (getRoles().length == 1 && getRoles()[0] == "super-admin") {
    return routes;
  } else {
    return filterRoutes(roles, routes);
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes,
});

router.beforeEach((to, from) => {
  const $hasToken = hasToken();
  const $hasRoutes = hasRoutes();
  console.log(router.getRoutes());
  if ($hasToken) {
    if (to.name == "login") {
      return { path: "/" };
    } else if ($hasRoutes) {
      return true;
    } else {
      const roles = getRoles();
      let routes = generateRoutes(roles, asyncRoutes);
      routes.forEach((route) => {
        router.addRoute(route);
      });

      setHasRoutes();
      return to.fullPath;
    }
  } else if (to.name !== "login") {
    return { name: "login" };
  }
  // if (hasToken) {
  //   return { name: "Login" };
  // } else if (
  //   to.meta.requireAuth &&
  //   store.state.auth.user.token &&
  //   !to.meta.roles.includes(getRole())
  // ) {
  //   return { name: "Home" };
  // } else if (to.meta.isGuest && store.state.auth.user.token) {
  //   return { name: "Home" };
  // }
});

export default router;
