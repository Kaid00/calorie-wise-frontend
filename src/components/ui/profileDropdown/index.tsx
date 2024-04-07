import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useState } from "react";
import DropDownContent from "./DropDownContent";
import { useSupabaseSession } from "@/hooks";

function ProfileDropdown() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const session = useSupabaseSession();

  return (
    <div>
      <button
        type="button"
        className={`focus-visible:ring-offset-orange-300  relative w-full  rounded-sm pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm `}
        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
      >
        <div>
          <div>
            <div className="mx-2  block">
              <h5 className="truncate text-xs font-bold">
                {session?.user?.email}
              </h5>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex cursor-default items-center pr-2 ">
              {!showProfileDropdown ? (
                <AiFillCaretDown
                  className="h-5 w-5 text-deepPurple"
                  aria-hidden="true"
                />
              ) : (
                <AiFillCaretUp
                  className="h-5 w-5 text-deepPurple"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </div>
      </button>

      {showProfileDropdown && (
        <DropDownContent
          toggleDropDown={() => setShowProfileDropdown(!showProfileDropdown)}
        />
      )}
    </div>
  );
}

export default ProfileDropdown;
