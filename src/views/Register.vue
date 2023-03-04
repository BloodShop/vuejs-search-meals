<template>
    <div>
        <div v-if="error" class="error">{{ error.message }}</div>
        <form @submit.prevent="handleSubmit">
            Register
            <div class="email">
                <input type="email" v-model="email" placeholder="Email" />
            </div>
            <div class="password">
                <input
                    type="password"
                    v-model="password"
                    placeholder="Password"
                />
            </div>
            <button class="btn bg-orange-700" type="submit">Register</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const email = ref(""),
    password = ref(""),
    error = ref(""),
    router = useRouter();

const handleSubmit = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((userCredential) => {
            console.log(userCredential.user);
            router.replace({ name: "" });
        })
        .catch((err) => {
            error.value = err;
            console.log(error);
        });
};

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
