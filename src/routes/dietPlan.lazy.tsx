/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSupabaseSession } from "@/hooks";
import { getMealPlans } from "@/services";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/dietPlan")({
  component: DietPlan,
});

function DietPlan() {
  const [mealPlans, setMealPLans] = useState<any[]>([]);
  const [loadingMealPlans, setIsLoadingMealPLans] = useState(false);
  const session = useSupabaseSession();

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
                        className="w-[200px]  mx-auto  object-cover"
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
