export type SelectOption = {
  value: string | number;
  label: string;
};

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
