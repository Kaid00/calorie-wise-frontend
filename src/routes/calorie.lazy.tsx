/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import DropdownSelect from "@/components/ui/DropdownSelect";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/calorie")({
  component: Calorie,
});

function Calorie() {
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
            <div className="w-[30%] space-y-2">
              <label className="font-semibold">Unit</label>
              <DropdownSelect options={[]} onChange={() => {}} />
            </div>
            <div className="w-[30%] space-y-2">
              <label className="font-semibold">Gender</label>
              <DropdownSelect options={[]} onChange={() => {}} />
            </div>
            <div className="w-[30%] flex flex-col space-y-2">
              <label className="font-semibold">Weight</label>
              <input
                type="number"
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                min={1}
              />
            </div>
          </div>
          <div className="my-5">
            <div className="space-y-2">
              <label className="font-semibold">Activity level</label>
              <DropdownSelect options={[]} onChange={() => {}} />
            </div>
          </div>
          <div className=" flex my-6">
            <Button className="rounded-full  py-3 font-semibold px-6 shadow-lg bg-orangeRoughy hover:bg-orange-700 text-white w-[30%] mx-auto">
              Show my results
            </Button>
          </div>
        </div>
      </div>
      <hr className="border my-3 border-gray-300" />
      <div className="p-6 text-center">
        <h1 className="font-bold text-chaletGreen">Your Results</h1>
      </div>
    </section>
  );
}
