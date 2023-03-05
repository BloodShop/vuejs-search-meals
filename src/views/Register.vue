<template>
    <div>
        <div v-if="error" class="error">{{ error.message }}</div>
        <form @submit.prevent="handleRegister">
            Register
            <div class="email">
                <input
                    type="email"
                    v-model="register_form.email"
                    placeholder="Email"
                />
            </div>
            <div class="password">
                <input
                    type="password"
                    v-model="register_form.password"
                    placeholder="Password"
                />
            </div>
            <button class="btn bg-orange-700" type="submit">Register</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore(),
    register_form = ref({}),
    error = ref("");

const handleRegister = () => {
    store.dispatch("register", register_form.value).catch((err) => {
        error.value = err;
    });
};
</script>

<style lang="scss">
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
button {
    width: 400px;
    height: 75px;
    font-size: 100%;
}
</style>
