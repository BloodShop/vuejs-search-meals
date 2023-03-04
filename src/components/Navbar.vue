<template>
    <header class="bg-white shadow h-16 flex justify-between items-stretch">
        <router-link
            :to="{ name: 'home' }"
            class="inline-flex items-center h-full px-5 text-orange-500 font-bold"
        >
            Home
        </router-link>
        <div class="flex items-center gap-1">
            <router-link
                :to="{ name: 'byName' }"
                class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white"
                >Search Meals
            </router-link>
            <router-link
                :to="{ name: 'byLetter' }"
                class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white"
                >Meals by Letter
            </router-link>
            <router-link
                :to="{ name: 'ingredients' }"
                class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white"
                >Meals by Ingredient
            </router-link>
            <router-link
                v-if="!isLoggedIn"
                :to="{ name: 'login' }"
                class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white"
                >Login
            </router-link>
            <router-link
                v-if="!isLoggedIn"
                :to="{ name: 'register' }"
                class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white"
                >Register
            </router-link>
            <button
                v-else
                @click="handleLogout"
                class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white"
            >
                Logout
            </button>
        </div>
    </header>
</template>

<script setup>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { onMounted, ref } from "vue";

const isLoggedIn = ref(false);
let auth;

const handleLogout = () => {
    signOut(auth).then(() => {
        router.replace({ name: "login" });
    });
};

onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user;
    });
});
</script>

<style></style>
