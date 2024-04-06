import { Link } from "@tanstack/react-router";
import Button from "../ui/Button";
import Logo from "@/assets/logo.png";
import { useSupabaseSession } from "@/hooks";

function Navbar() {
  const session = useSupabaseSession();

  return (
    <nav className=" p-3">
      <div className="max-w-6xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex space-x-2 items-center ">
          <img src={Logo} alt="logo" className="size-[40px] mb-3" />
          <h2 className="text-orangeRoughy font-bold font-Montserrat">
            Calorie wise
          </h2>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-chaletGreen text-lg">
            <Link
              to="/calorie"
              className="[&.active]:font-bold [&.active]:text-orangeRoughy"
            >
              Calorie
            </Link>
            {session && (
              <Link
                to="/dietPlan"
                className="[&.active]:font-bold [&.active]:text-orangeRoughy"
              >
                Diet plan
              </Link>
            )}
          </ul>
        </div>
        <div>
          {!session ? (
            <Button className="rounded-3xl text-sm ring-1 py-2 px-4 ring-orangeRoughy bg-white text-orangeRoughy shadow-lg hover:bg-orangeRoughy hover:text-white">
              Login/Signup
            </Button>
          ) : (
            <h5>{session?.user?.email}</h5>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
