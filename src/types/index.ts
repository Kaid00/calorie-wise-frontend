export type SelectOption = {
  value: string | number;
  label: string;
};

interface Meal {
  readyInMinutes: number;
  sourceUrl: string;
  servings: number;
  id: number;
  title: string;
  imageType: string;
}

interface Nutrients {
  fat: number;
  carbohydrates: number;
  calories: number;
  protein: number;
}

export interface MealPlanResponse {
  meals: Meal[];
  nutrients: Nutrients;
}

export enum CalorieResponseKeys {
  Maintenance = "maintenance",
  MildWeightLoss = "mildWeightLoss",
  WeightLoss = "weightLoss",
  ExtremeWeightLoss = "extremeWeightLoss",
  MildWeightGain = "mildWeightGain",
  WeightGain = "weightGain",
  ExtremeWeightGain = "extremeWeightGain",
}

interface Goals {
  maintenance: number;
  mildWeightLoss: number;
  weightLoss: number;
  extremeWeightLoss: number;
  mildWeightGain: number;
  weightGain: number;
  extremeWeightGain: number;
}

interface WeeklyWeightChange {
  mildWeightLoss: number;
  weightLoss: number;
  extremeWeightLoss: number;
  mildWeightGain: number;
  weightGain: number;
  extremeWeightGain: number;
}

export type CalorieRequestData = {
  age: number;
  height: number;
  weight: number;
  weightUnit?: string;
  gender: string;
  activityLevel: number;
};

interface Data {
  goals: Goals;
  weeklyWeightChange: WeeklyWeightChange;
}

export interface CalorieResponse {
  status: string;
  data: Data;
}

export interface SendMealPlanRequest {
  emailid: string;
  meals: Meal[] | undefined;
  nutrients: Nutrients | undefined;
}
