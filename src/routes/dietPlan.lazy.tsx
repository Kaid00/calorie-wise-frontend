/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "@/components/ui/Button";
import { useSupabaseSession } from "@/hooks";
import { fetchEstimatedDays, getMealPlans } from "@/services";
import { EstimatedDayRequest } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/dietPlan")({
  component: DietPlan,
});

function DietPlan() {
  const [mealPlans, setMealPLans] = useState<any[]>([]);
  const [loadingMealPlans, setIsLoadingMealPLans] = useState(false);
  const [activeFormIndex, setShowActiveFormIndex] = useState(-1);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [targetWeight, setTargetWeight] = useState(0);
  const session = useSupabaseSession();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: EstimatedDayRequest) => fetchEstimatedDays(data),
  });
  useEffect(() => {
    async function getPlans() {
      if (session.user.id) {
        setIsLoadingMealPLans(true);
        const mealPLans = await getMealPlans(session.user.id);
        if (mealPLans) {
          setMealPLans(mealPLans);
        }
      }
      setIsLoadingMealPLans(false);
    }
    getPlans();
  }, [session?.user?.id]);

  const handleFetchEstimatedDays = (e: any, calories: number) => {
    e.preventDefault();

    mutate(
      {
        current_weight: currentWeight,
        target_weight: targetWeight,
        diet_calories: Math.floor(calories),
      },
      {
        onSuccess: (data) => {
          console.log(data?.estimated_days);
          toast.info(
            `It will take you ${data?.estimated_days} days to reach your target goal following this meal plan`
          );
        },
        onError: (error: any) => {
          toast.error(error.response.data.error);
        },
      }
    );
  };

  console.log(mealPlans);

  return (
    <div className="text-center">
      {loadingMealPlans && <div>Loading meal plans.....</div>}
      {mealPlans.length < 1 && !loadingMealPlans && <div>No meal plan set</div>}
      {mealPlans.length >= 1 && !loadingMealPlans && (
        <div>
          <h3 className="font-semibold text-orangeRoughy">Saved Meal plans</h3>
          {mealPlans.map((mealPLan, key) => (
            <div key={key} className="p-3 border  shadow-sm my-3 ">
              <h3 className="my-2 font-Montserrat text-orangeRoughy font-bold">
                {mealPLan.title}
              </h3>
              <div className="px-4">
                <div className="flex justify-center items-center space-x-6">
                  {mealPLan.plans.map((plan: any, index: number) => (
                    <div key={index} className="text-sm w-[300px]">
                      <img
                        className="w-[200px]  mx-auto  object-cover my-2"
                        src={`https://img.spoonacular.com/recipes/${plan.id}-556x370.jpg`}
                      />
                      <p className="font-semibold text-chaletGreen">
                        {plan?.title}
                      </p>
                      <a
                        href={plan?.sourceUrl}
                        className="text-blue-800 font-semibold "
                      >
                        view meal details
                      </a>
                    </div>
                  ))}
                </div>
                <div className="p-3 my-2 flex  flex-col item-center content-center justify-center text-gray-700">
                  <button
                    className="font-semibold flex spce-x-4 items-center mx-auto"
                    onClick={() => setShowActiveFormIndex(key)}
                  >
                    <span>Want to know how long it will take?</span>
                    <span className="mx-2">
                      <FaCaretDown />
                    </span>
                  </button>
                  <hr />

                  {activeFormIndex === key && (
                    <form
                      className="mx-auto w-[300px]"
                      onSubmit={(event) =>
                        handleFetchEstimatedDays(event, mealPLan?.calories ?? 0)
                      }
                    >
                      <div className="my-5 flex-col justify-between space-y-4">
                        <h6 className="text-orangeRoughy font-semibold">
                          Enter your target weight to find out
                        </h6>
                        <div className=" flex flex-col space-y-2">
                          <label className="font-semibold">
                            Current weight
                          </label>
                          <input
                            type="number"
                            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                            min={1}
                            name="weight"
                            required
                            onChange={(e) =>
                              setCurrentWeight(parseInt(e?.target?.value))
                            }
                          />
                        </div>
                        <div className=" flex flex-col space-y-2">
                          <label className="font-semibold">Target weight</label>
                          <input
                            type="number"
                            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                            min={1}
                            required
                            name="weight"
                            onChange={(e) =>
                              setTargetWeight(parseInt(e?.target?.value))
                            }
                          />
                        </div>
                      </div>
                      <div className=" flex my-6">
                        <Button
                          className=" py-2 font-semibold px-4  text-sm bg-orangeRoughy hover:bg-orange-700 text-white  mx-auto disabled:bg-gray-600 disabled:cursor-not-allowed"
                          type="submit"
                          disabled={isPending}
                        >
                          {isPending ? "Calculating..." : "Calculate"}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
