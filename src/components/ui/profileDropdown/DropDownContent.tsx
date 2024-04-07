import { supabase } from "@/constant";
import { AiOutlineLogout } from "react-icons/ai";

type DropDownContentProp = {
  toggleDropDown: () => void;
};

function DropDownContent({ toggleDropDown }: DropDownContentProp) {
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div
        className=" font-semibold mt-4 absolute right-2  bg-white ml-5 py-2 z-50 list-none divide-y divide-gray-100 rounded-lg shadow-lg border border-deepPurple border-b-2 animate-fade-in-down"
        onMouseLeave={toggleDropDown}
      >
        <ul className="w-[220px] text-center ">
          <button
            className="flex px-5 cursor-pointer items-baseline py-3 hover:bg-deepPurple hover:text-orangeRoughy"
            onClick={signOut}
          >
            <AiOutlineLogout className="w-5 h-5 my-auto" />
            <span className=" mx-2">Logout </span>
          </button>
        </ul>
      </div>
    </>
  );
}

export default DropDownContent;
