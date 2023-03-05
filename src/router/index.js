import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import GuestLayout from "../components/GuestLayout.vue";
import MealsByIngredient from "../views/MealsByIngredient.vue";
import Ingredients from "../views/Ingredients.vue";
import MealsByLetter from "../views/MealsByLetter.vue";
import MealsByName from "../views/MealsByName.vue";
import MealDetails from "../views/MealDetails.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const routes = [
    {
        path: "/",
        component: DefaultLayout,
        children: [
            {
                path: "/",
                name: "home",
                component: Home,
            },
            {
                path: "/by-name/:name?",
                name: "byName",
                component: MealsByName,
                meta: { requiresAuth: true },
            },
            {
                path: "/by-letter/:letter?",
                name: "byLetter",
                component: MealsByLetter,
                meta: { requiresAuth: true },
            },
            {
                path: "/ingredients",
                name: "ingredients",
                component: Ingredients,
                meta: { requiresAuth: true },
            },
            {
                path: "/by-ingredient/:ingredient",
                name: "byIngredient",
                component: MealsByIngredient,
                meta: { requiresAuth: true },
            },
            {
                path: "/meal/:id",
                name: "mealDetails",
                component: MealDetails,
                meta: { requiresAuth: true },
            },
            {
                path: "/login",
                name: "login",
                component: Login,
            },
            {
                path: "/register",
                name: "register",
                component: Register,
            },
        ],
    },
    {
        path: "/guest",
        component: GuestLayout,
    },
];

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            auth,
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
};

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth),
        isAuthenticated = await getCurrentUser();

    if ((to.path === "/login" || to.path === "/register") && auth.currentUser) {
        next("/");
        return;
    }

    if (requiresAuth) {
        if (isAuthenticated) {
            next();
            return;
        } else {
            alert("You don't have access!");
            next("/");
            return;
        }
    }
    next();
});

export default router;
