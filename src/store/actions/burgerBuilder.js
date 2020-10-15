import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredients = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName,
  };
};

export const removeIngredients = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName,
  };
};

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

const fetchIngredientsFailed = () => {
  return { type: actionTypes.FETCH_INGREDIENTS_FAILED };
};

export const InitIngredients = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: "/ingredients.json",
      });
      dispatch(setIngredients(res.data));
    } catch (error) {
      dispatch(fetchIngredientsFailed());
    }
  };
};
