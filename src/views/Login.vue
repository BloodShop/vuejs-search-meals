<template>
    <div>
        Login
        <form @submit.prevent="handleLogin">
            <div class="email">
                <input
                    type="email"
                    placeholder="Email"
                    v-model="login_form.email"
                />
            </div>
            <div class="password">
                <input
                    type="password"
                    placeholder="Password"
                    v-model="login_form.password"
                />
            </div>
            <button class="btn bg-orange-500">Login</button>
        </form>
        <div>
            <button class="btn bg-orange-300" @click.prevent="loginWithGoogle">
                Sign in with Google
            </button>
        </div>
        <div class="error" v-if="error">{{ error.message }}</div>
        <span>
            Need an account? Click here to
            <router-link to="/register">register</router-link>
        </span>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const login_form = ref({}),
    error = ref(""),
    store = useStore();

const handleLogin = () => {
    store.dispatch("login", login_form.value).catch((err) => {
        error.value = err;
    });
};

const loginWithGoogle = () => {
    store.dispatch("googleLogin").catch((err) => {
        error.value = err;
    });
};
</script>

<style lang="scss" scoped>
.error {
    color: red;
    font-size: 18px;
}
input {
    width: 400px;
    padding: 30px;
    margin: 20px;
    font-size: 21px;
}
</style>
