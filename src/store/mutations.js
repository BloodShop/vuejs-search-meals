export const setSearchedMeals = (state, meals) => {
    state.searchedMeals = meals || [];
};

export const setMealsByLetter = (state, meals) => {
    state.mealsByLetter = meals || [];
};

export const setMealsByIngredient = (state, meals) => {
    state.mealsByIngredient = meals || [];
};

export const setIngredient = (state, ingredient) => {
    state.ingredient = ingredient;
};

export const setUser = (state, user) => {
    state.user = user;
};

export const clearUser = (state) => {
    state.user = null;
};
