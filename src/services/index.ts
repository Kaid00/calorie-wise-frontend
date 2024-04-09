/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/constant";
import {
  CalorieRequestData,
  CalorieResponse,
  MealPlanResponse,
  RandomPasswordResponse,
  SendMealPlanRequest,
} from "@/types";
import axios from "axios";
import { toast } from "react-toastify";

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

export const sendMealPLan = async (mealPlan: SendMealPlanRequest) => {
  const response = await axios.post<any>(
    `https://9w9hrve1k6.execute-api.us-east-1.amazonaws.com/PDFGen/product`,
    mealPlan
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

    if (error) {
      alert(error);
    }
    return data;
  } catch (error) {
    toast.error("Failed to add meal");
  }
}

export const getMealPlans = async (userId: string) => {
  const { data, error } = await supabase
    .from("meal_plans")
    .select("*")
    .eq("user_id", userId) // Filter for current user's plans
    .order("id", { ascending: true });

  if (error) {
    toast.error("Error fetching meal");
    return [];
  }

  return data;
};

export const fetchRandomPassword = async () => {
  const response = await axios.get<RandomPasswordResponse>(
    `https://8zm9fucasd.execute-api.us-east-1.amazonaws.com/prod/passwordgenerator?number=on&special=on&upper=off&length=10&repeat=1`
  );
  return response.data;
};
