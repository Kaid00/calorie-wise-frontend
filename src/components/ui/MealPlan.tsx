import { createMealPlan, fetchMealPLan } from "@/services";
import { MealPlanResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Logo from "@/assets/logo.png";
import Button from "./Button";
import { useSupabaseSession } from "@/hooks";

type MealPlanProps = {
  calories: number;
  target: string;
  navigate: () => void;
};
function MealPlan({ calories, target, navigate }: MealPlanProps) {
  const [isSavingPLan, setIsSavingPLan] = useState(false);
  const { mutate, isPending, data } = useMutation({
    mutationFn: (data: number) => fetchMealPLan(data),
  });
  useEffect(() => {
    mutate(calories, {
      onSuccess(data) {
        console.log(data);
      },
    });
  }, []);

  const session = useSupabaseSession();

  const saveMealPlan = async () => {
    setIsSavingPLan(true);
    const mealPlan = createMealPlan(session?.user?.id, target, data?.meals);
    console.log(mealPlan);
    setIsSavingPLan(false);
    navigate();
  };

  return (
    <div className="p-4 ">
      {isPending && (
        <div className="flex flex-col text-center">
          <img src={Logo} alt="logo" className="size-[60px] mb-3 mx-auto" />
          <h3 className="font-semibold">Calculating your meal plan....</h3>
        </div>
      )}{" "}
      {!isPending && (
        <div className="p-2 space-y-4 text-center">
          <h3 className="font-Montserrat font-bold text-orangeRoughy">
            Here is your 24 hour meal plan
          </h3>
          {data?.meals.map((meal, index) => (
            <div
              className="border rounded-md shadow-md text-center p-4 space-y-4"
              key={index}
            >
              <h4 className="font-semibold">{meal.title}</h4>
              <p>
                <span className="font-semibold mx-3">Serving:</span>
                {meal.servings}
              </p>
            </div>
          ))}
          <div className="flex  text-sm justify-center space-x-3">
            <p>
              <span className="font-semibold text-orangeRoughy mx-1">
                Calories
              </span>
              <span>:{data?.nutrients?.calories}</span>
            </p>
            <p>
              <span className="font-semibold text-orangeRoughy mx-1">
                Carbohydrates
              </span>
              <span>:{data?.nutrients?.carbohydrates}</span>
            </p>
            <p>
              <span className="font-semibold text-orangeRoughy mx-1">Fat</span>
              <span>:{data?.nutrients?.fat}</span>
            </p>
            <p>
              <span className="font-semibold text-orangeRoughy mx-1">
                Protein
              </span>
              <span>:{data?.nutrients?.protein}</span>
            </p>
          </div>
          <div className=" flex my-6">
            <Button
              className="rounded-full  py-3 font-semibold px-6 shadow-lg bg-orangeRoughy hover:bg-orange-700 text-white  mx-auto disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={isSavingPLan}
              onClick={saveMealPlan}
            >
              {isSavingPLan ? "Saving..." : "Save Meal plan"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
export default MealPlan;
