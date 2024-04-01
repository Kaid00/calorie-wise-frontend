import Button from "@/components/ui/Button";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import foodImage from "@/assets/food.png";

export const Route = createLazyFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="mt-14 max-w-6xl mx-auto ">
      <div className="p-5 flex">
        <div className="text-chaletGreen  w-[50%]">
          <h1 className=" font-bold text-5xl">Get A Customised</h1>
          <h1 className="text-orangeRoughy font-Montserrat font-extrabold text-7xl my-3">
            Diet Plan
          </h1>
          <p className=" text-lg">
            Unlock the power of informed nutrition with our calorie calculator
            and personalized diet plans. Take charge of your health journey
            today and discover a path tailored to your unique needs. Empower
            yourself to make healthier choices and achieve your wellness goals.
            Start your journey towards a balanced lifestyle now.
          </p>
          <div className="my-4">
            <Link to="/calorie">
              <Button className="rounded-full text-lg py-3 font-semibold px-6   shadow-lg bg-orangeRoughy text-white w-[50%] mx-auto">
                Get started
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 flex justify-center">
          <div>
            <img src={foodImage} />
          </div>
        </div>
      </div>
    </div>
  );
}
