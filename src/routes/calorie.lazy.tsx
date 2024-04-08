/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DropdownSelect from "@/components/ui/DropdownSelect";
import { fetchCalories, fetchMealPLan } from "@/services";
import {
  CalorieRequestData,
  CalorieResponse,
  MealPlanResponse,
  SelectOption,
} from "@/types";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/context";

import Login from "@/components/Login";
import MealPlan from "@/components/ui/MealPlan";
import { useSupabaseSession } from "@/hooks";
import SendMealPlan from "@/components/SendMealPlan";

export const Route = createLazyFileRoute("/calorie")({
  component: Calorie,
});

const weightUnit: { label: string; value: string }[] = [
  { label: "Kilograms", value: "kg" },
  { label: "Pounds", value: "lbs" },
];

const initialCalorieRequestData: CalorieRequestData = {
  age: 0,
  height: 0,
  weight: 0,
  weightUnit: weightUnit[0].value,
  gender: "",
  activityLevel: 0,
};

const activityLevels: { label: string; value: number }[] = [
  { label: "Sedentary", value: 1 },
  { label: "Lightly active", value: 2 },
  { label: "Moderately active", value: 3 },
  { label: "Very active", value: 4 },
  { label: "Extra active", value: 5 },
];

const gender: { label: string; value: string }[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

function Calorie() {
  const [calorieData, setCalorieData] = useState<CalorieRequestData>(
    initialCalorieRequestData
  );

  const session = useSupabaseSession();
  const [isDataValid, setIsDataValid] = useState(false);
  const [calorieResponse, SetCalorieResponse] =
    useState<CalorieResponse | null>({
      status: "successful",
      data: {
        goals: {
          maintenance: 2190,
          mildWeightLoss: 1862,
          weightLoss: 1752,
          extremeWeightLoss: 1533,
          mildWeightGain: 2519,
          weightGain: 2628,
          extremeWeightGain: 2847,
        },
        weeklyWeightChange: {
          mildWeightLoss: 0.53,
          weightLoss: 0.5,
          extremeWeightLoss: 0.44,
          mildWeightGain: 0.72,
          weightGain: 0.75,
          extremeWeightGain: 0.81,
        },
      },
    });

  // Convert goals object to array of objects with key-value pairs
  const calorieResponseArray = Object.entries(calorieResponse?.data.goals).map(
    ([key, value]) => ({ key, value })
  );

  useEffect(() => {
    if (
      calorieData.age > 0 &&
      calorieData.height > 0 &&
      calorieData.weight > 0 &&
      calorieData.gender !== "" &&
      calorieData.activityLevel !== 0
    ) {
      setIsDataValid(true);
    } else {
      setIsDataValid(false);
    }
  }, [calorieData]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CalorieRequestData) => fetchCalories(data),
  });

  const navigate = useNavigate();

  const { openModal, closeModal } = useContext(ModalContext);

  const openSendEmailModal = (data: MealPlanResponse) =>
    openModal(<SendMealPlan mealPLan={data} />);

  const ShowSavedMealPLans = () => {
    closeModal();
    navigate({ to: "/dietPlan" });
  };

  const showSendEmailModal = (mealPlan: MealPlanResponse) => {
    closeModal();
    openSendEmailModal(mealPlan);
  };

  const openLoginModal = () => openModal(<Login closeMOdal={closeModal} />);
  const openMealPLanModal = (calories: number, text: string) =>
    openModal(
      <MealPlan
        calories={calories}
        target={text}
        navigate={ShowSavedMealPLans}
        sendToEmail={showSendEmailModal}
      />
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCalorieData((prevData) => ({
      ...prevData,
      [name]:
        name === "age" || name === "height" || name === "weight"
          ? parseInt(value)
          : value,
    }));
  };

  const handleDropdownChange = (data: SelectOption, valueToUpdate: string) => {
    console.log(data, valueToUpdate);
    const { value } = data;
    if (value) {
      setCalorieData((prevData) => ({
        ...prevData,
        [valueToUpdate]: value,
      }));
    }
  };

  const handleSubmit = () => {
    console.log(calorieData);
    mutate(calorieData, {
      onSuccess(data) {
        console.log(data);
      },
    });
  };

  const calculateMealPlan = (calories: number, text: string) => {
    if (session) {
      openMealPLanModal(calories, text);
    } else {
      openLoginModal();
    }
  };

  return (
    <section className="my-6 p-6">
      <h1 className="text-center font-bold text-chaletGreen ">
        Calorie Calculator
      </h1>
      <p className="w-[50%] text-center mx-auto my-2">
        By inputting your age, gender, height, weight, and activity level, you
        receive tailored calorie recommendations to help you achieve your health
        goals. Powered by trusted formulas, our tool empowers informed decisions
        for a balanced and healthier lifestyle.
      </p>
      <div className="p-3">
        <div className="border bg-white border-gray-400 shadow-lg p-6 rounded-md w-[50%] mx-auto">
          <div className="flex justify-between ">
            <div className="w-[30%] flex flex-col space-y-2">
              <label className="font-semibold">Height in cm</label>
              <input
                type="number"
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                min={1}
                name="height"
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%] flex flex-col space-y-2">
              <label className="font-semibold">Weight unit</label>
              <DropdownSelect
                options={weightUnit}
                onChange={(unit) => handleDropdownChange(unit, "weightUnit")}
              />
            </div>
            <div className="w-[30%] flex flex-col space-y-2">
              <label className="font-semibold">Weight</label>
              <input
                type="number"
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                min={1}
                name="weight"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="my-5 flex justify-between">
            <div className="w-[30%] flex flex-col space-y-2">
              <label className="font-semibold">Age</label>
              <input
                type="number"
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                min={1}
                name="age"
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%] space-y-2">
              <label className="font-semibold">Gender</label>
              <DropdownSelect
                options={gender}
                onChange={(gender) => handleDropdownChange(gender, "gender")}
              />
            </div>
            <div className="w-[30%] flex flex-col space-y-2">
              <label className="font-semibold">Activity level</label>
              <DropdownSelect
                options={activityLevels}
                onChange={(activityLevel) =>
                  handleDropdownChange(activityLevel, "activityLevel")
                }
              />
            </div>
          </div>
          <div className=" flex my-6">
            <Button
              className="rounded-full  py-3 font-semibold px-6 shadow-lg bg-orangeRoughy hover:bg-orange-700 text-white w-[30%] mx-auto disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={!isDataValid || isPending}
              onClick={handleSubmit}
            >
              {isPending ? "Calculating..." : "Show my results"}
            </Button>
          </div>
        </div>
      </div>
      <hr className="border my-3 border-gray-300" />
      <div className="p-6 text-center flex flex-col">
        <h1 className="font-bold text-chaletGreen">Your Results</h1>
        <div className="container mx-auto grid grid-cols-4 gap-3  py-4">
          {calorieResponseArray.map((goal, key) => (
            <Card
              key={key}
              calorieCount={goal.value}
              calorieKey={goal.key}
              calculateMealPlan={(calories: number, text: string) =>
                calculateMealPlan(calories, text)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
