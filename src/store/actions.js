import axiosClient from "../axiosClient";

export const searchMeals = ({ commit }, keyword) => {
    axiosClient.get(`search.php?s=${keyword}`).then(({ data }) => {
        commit("setSearchedMeals", data.meals);
    });
};

export const searchMealsByLetter = ({ commit }, letter) => {
    axiosClient.get(`search.php?f=${letter}`).then(({ data }) => {
        commit("setMealsByLetter", data.meals);
    });
};

export const searchMealsByIngredient = ({ commit }, ingredient) => {
    axiosClient.get(`filter.php?i=${ingredient}`).then(({ data }) => {
        commit("setMealsByIngredient", data.meals);
    });
};

import router from "../router";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const googleLogin = ({ commit }, error = {}) => {
    const provider = new GoogleAuthProvider();

    return new Promise((_, reject) => {
        signInWithPopup(auth, provider)
            .then((userCredential) => {
                commit("setUser", auth.currentUser);
                router.push("/");
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const login = async ({ commit }, details) => {
    const { email, password } = details;

    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                commit("setUser", auth.currentUser);
                router.push("/");
                resolve();
            })
            .catch((err) => {
                switch (err.code) {
                    case "auth/invalid-email":
                        alert("Your email address appears to be malformed.");
                        break;
                    case "auth/wrong-password":
                        alert("Your password is wrong.");
                        break;
                    case "auth/user-not-found":
                        alert("User with this email doesn't exist.");
                        break;
                    case "auth/user-disabled":
                        alert("User with this email has been disabled.");
                        break;
                    case "auth/too-many-requests":
                        alert("Too many requests. Try again later.");
                        break;
                    case "auth/operation-not-allowed":
                        alert(
                            "Signing in with Email and Password is not enabled."
                        );
                        break;
                    default:
                        alert("An undefined Error happened.");
                }
                reject(err);
            });
    });
};

export const logout = async ({ commit }) => {
    return new Promise((resolve, reject) =>
        signOut(auth)
            .then(() => {
                commit("clearUser");
                router.push("login");
                resolve();
            })
            .catch((err) => {
                reject(err);
            })
    );
};

export const register = async ({ commit }, details, error = {}) => {
    const { email, password } = details;

    return new Promise((_, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                commit("setUser", auth.currentUser);
                router.push("/");
            })
            .catch((err) => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                        alert("Email already in use");
                        break;
                    case "auth/invalid-email":
                        alert("Invalid email");
                        break;
                    case "auth/operation-not-allowed":
                        alert("Operation not allowed");
                        break;
                    case "auth/weak-password":
                        alert("Weak password");
                        break;
                    default:
                        alert("An undefined Error happened.");
                }
                reject(err.code);
            });
    });
};

export const fetchUser = ({ commit }) => {
    auth.onAuthStateChanged(async (user) => {
        if (user === null) {
            commit("clearUser");
        } else {
            commit("setUser");
            if (
                router.isReady() &&
                router.currentRoute.value.path === "/login"
            ) {
                router.push("/");
            }
        }
    });
};
