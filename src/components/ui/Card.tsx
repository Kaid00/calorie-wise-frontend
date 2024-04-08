import { CalorieResponseKeys } from "@/types";
import { formatEnumKey } from "@/utils";
import { FaWeight } from "react-icons/fa";
import {
  GiMuscleFat,
  GiWeightScale,
  GiMuscleUp,
  GiWeightLiftingUp,
} from "react-icons/gi";
import Button from "./Button";

const renderIcon = (calorieKey: string) => {
  switch (calorieKey) {
    case CalorieResponseKeys.ExtremeWeightGain:
      return <GiMuscleFat size={40} />;
    case CalorieResponseKeys.Maintenance:
      return <FaWeight size={40} />;
    case CalorieResponseKeys.ExtremeWeightLoss:
      return <GiWeightScale size={40} />;
    case CalorieResponseKeys.MildWeightGain:
      return <GiMuscleUp size={40} />;
    case CalorieResponseKeys.MildWeightLoss:
      return <GiWeightLiftingUp size={40} />;
    case CalorieResponseKeys.WeightGain:
      return <GiWeightScale size={40} />;
    case CalorieResponseKeys.WeightLoss:
      return <FaWeight size={40} />;
    default:
      break;
  }
};

type CardProps = {
  calorieKey: string;
  calorieCount: number;
  calculateMealPlan: (calories: number, text: string) => void;
};

function Card({ calorieCount, calorieKey, calculateMealPlan }: CardProps) {
  return (
    <div className=" border rounded-md shadow-md p-4">
      <div className=" mb-1 flex justify-center  p-4 text-orangeRoughy">
        {renderIcon(calorieKey)}
      </div>
      <div>
        <h3 className="font-bold font-Montserrat">
          {formatEnumKey(calorieKey ?? "")}
        </h3>
        <h4>{calorieCount} calories</h4>
      </div>
      <div className="my-3">
        <Button
          className=" py-2 text-sm px-4 font-semibold shadow-lg bg-orangeRoughy hover:bg-orange-700 text-white  mx-auto disabled:bg-gray-600 disabled:cursor-not-allowed"
          onClick={() =>
            calculateMealPlan(calorieCount, formatEnumKey(calorieKey ?? ""))
          }
        >
          Calculate diet plan
        </Button>
      </div>
    </div>
  );
}

export default Card;
