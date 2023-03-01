<template>
    <div class="bg-white shadow rounded-xl">
        <router-link :to="{ name: 'mealDetails', params: { id: meal.idMeal } }">
            <img
                :src="meal.strMealThumb"
                alt="meal.strMeal"
                class="rounded-t-xl w-full h-48 object-cover"
            />
        </router-link>
        <div class="p-3">
            <h3 class="font-semibold">{{ meal.strMeal }}</h3>
            <p class="mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                aspernatur, non ex aliquam nobis assumenda.
            </p>
            <div class="flex items-center justify-between">
                <YoutubeButton :href="meal.strYoutube">Youtube </YoutubeButton>
                <router-link
                    class="px-3 py-2 rounded border-2 text-white border-purple-600 bg-purple-500 hover:bg-purple-600 transition-colors"
                    to="/"
                    >View
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import YoutubeButton from "../components/YoutubeButton.vue";

const { meal } = defineProps({
    meal: {
        required: true,
        type: Object,
    },
});
</script>
