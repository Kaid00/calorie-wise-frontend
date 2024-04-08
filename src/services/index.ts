import { supabase } from "@/constant";
import { CalorieRequestData, CalorieResponse, MealPlanResponse } from "@/types";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const headers = {
  "X-RapidAPI-Key": apiKey,
  "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
};
export const fetchCalories = async (data: CalorieRequestData) => {
  const response = await axios.get<CalorieResponse>(
    `https://8zm9fucasd.execute-api.us-east-1.amazonaws.com/prod/dailycalorie?age=${data.age}&height=${data.height}&gender=${data.gender}&activitylevel=${data.activityLevel}&weightunit=${data?.weightUnit}&weight=${data.weight}`
  );
  return response;
};

export const fetchMealPLan = async (calories: number) => {
  const response = await axios.get<MealPlanResponse>(
    `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=${calories}`,
    { headers }
  );
  return response.data;
};

export async function createMealPlan(
  userId: string,
  title: string,
  plan: object | undefined
) {
  try {
    const { data, error } = await supabase
      .from("meal_plans")
      .insert({
        title: title,
        user_id: userId,
        plans: plan,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    alert(error?.message);
  }
}

export const getMealPlans = async (userId: string) => {
  const { data, error } = await supabase
    .from("meal_plans")
    .select("*")
    .eq("user_id", userId) // Filter for current user's plans
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching meal plans:", error);
    return [];
  }

  return data;
};
