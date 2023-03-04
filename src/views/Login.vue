<template>
    <div>
        Login
        <form @submit.prevent="handleSubmit">
            <div class="email">
                <input type="email" placeholder="Email" v-model="email" />
            </div>
            <div class="password">
                <input
                    type="password"
                    placeholder="Password"
                    v-model="password"
                />
            </div>
            <button class="btn bg-orange-500">Login</button>
        </form>
        <div>
            <button class="btn bg-orange-300" @click.prevent="signInWithGoogle">
                Sign in with Google
            </button>
        </div>
        <div class="error" v-if="error">{{ error }}</div>
        <span>
            Need an account? Click here to
            <router-link to="/register">register</router-link>
        </span>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

const router = useRouter();
const email = ref(""),
    password = ref(""),
    error = ref("");

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((userCredential) => {
            console.log(userCredential.user);
            router.replace({ name: "home" });
        })
        .catch((err) => {
            error.value = err;
            console.log(error);
        });
};

const handleSubmit = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user);
            router.replace({ name: "secret" });
        })
        .catch((err) => {
            console.log(err, err.code);

            switch (err.code) {
                case "auth/invalid-email":
                    error.value = "Your email address appears to be malformed.";
                    break;
                case "auth/wrong-password":
                    error.value = "Your password is wrong.";
                    break;
                case "auth/user-not-found":
                    error.value = "User with this email doesn't exist.";
                    break;
                case "auth/user-disabled":
                    error.value = "User with this email has been disabled.";
                    break;
                case "auth/too-many-requests":
                    error.value = "Too many requests. Try again later.";
                    break;
                case "auth/operation-not-allowed":
                    error.value =
                        "Signing in with Email and Password is not enabled.";
                    break;
                default:
                    error.value = "An undefined Error happened.";
            }
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
