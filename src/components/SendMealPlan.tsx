import { useContext, useRef, useState } from "react";
import Button from "./ui/Button";
import { MealPlanResponse, SendMealPlanRequest } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { sendMealPLan } from "@/services";
import { ModalContext } from "@/context";
import { toast } from "react-toastify";

type SendMealPLanProps = {
  mealPLan: MealPlanResponse;
};
function SendMealPlan({ mealPLan }: SendMealPLanProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const isInputValid = email.length > 5 && name.length > 5;

  const { closeModal } = useContext(ModalContext);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SendMealPlanRequest) => sendMealPLan(data),
  });

  const handleSendMealPlan = () => {
    const mealPLanEmail: SendMealPlanRequest = {
      emailid: email,
      meals: mealPLan?.meals,
      nutrients: mealPLan?.nutrients,
    };
    if (isInputValid) {
      mutate(mealPLanEmail, {
        onSuccess: () => {
          toast.success("Meal plan sent to email");
          closeModal();
        },
        onError: () => {
          toast.error("Error sending meal plan to email. try again");
        },
      });
    }
  };

  return (
    <div className="rounded-md  shadow-sm p-2 text-center">
      <h4 className="font-Montserrat font-bold text-blue-500 my-3">
        DO YOU WANT HEALTHY MEAL PLANS TO HELP YOU HIT YOUR DAILY CALORIE GOAL?
      </h4>
      <p className="my-3">
        Enter your name and email to get meal plans striaght to your email
      </p>
      <form className="flex flex-col space-y-5">
        <div>
          <input
            type="text"
            onChange={(e) => setName(e?.target.value)}
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
            minLength={5}
            name="name"
            placeholder="Enter fullname"
            required
          />
        </div>
        <div>
          <input
            onChange={(e) => setEmail(e?.target.value)}
            type="email"
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
            name="email"
            minLength={5}
            placeholder="Enter email"
            required
          />
        </div>
        <Button
          className="rounded-full  py-3 font-semibold px-6 my-4  shadow-lg bg-orangeRoughy hover:bg-orange-700 text-white  mx-auto disabled:bg-gray-600 disabled:cursor-not-allowed"
          onClick={handleSendMealPlan}
          disabled={!isInputValid || isPending}
        >
          {isPending ? "Sending.." : "Send to email"}
        </Button>
      </form>
    </div>
  );
}

export default SendMealPlan;
