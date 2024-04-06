import axiosConfig from "@/api/axiosConfig";
import { CalorieRequestData, CalorieResponse } from "@/types";

export const fetchCalories = async (data: CalorieRequestData) => {
  const response = await axiosConfig.get<CalorieResponse>(
    `https://8zm9fucasd.execute-api.us-east-1.amazonaws.com/prod/dailycalorie?age=${data.age}&height=${data.height}&gender=${data.gender}&activitylevel=${data.activityLevel}&weightunit=${data?.weightUnit}&weight=${data.weight}`
  );
  return response;
};
