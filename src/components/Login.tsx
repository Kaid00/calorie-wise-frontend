/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSupabaseSession } from "@/hooks";

import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiEyeOff, HiEye, HiLockClosed } from "react-icons/hi";
import Button from "./ui/Button";
import { supabase } from "@/constant";
import { useMutation } from "@tanstack/react-query";
import { fetchRandomPassword } from "@/services";
import { toast } from "react-toastify";

type LoginProps = {
  closeMOdal: () => void;
};
export default function Login({ closeMOdal }: LoginProps) {
  const session = useSupabaseSession();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (session) {
      closeMOdal();
    }
  }, [session]);

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const { mutate, isPending, data } = useMutation({
    mutationFn: fetchRandomPassword,
  });

  const handleSignupSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "/",
      },
    });
    if (data.user) {
      toast.success("Signup successfull, verify email");
    }
    if (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    setIsLoading(false);
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleGenerateRandomPassword = () => {
    mutate(null, {
      onSuccess: (data) => {
        setPassword(data?.password);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error generating password");
      },
    });
  };

  if (!session) {
    return (
      <div className="container mx-auto max-w-md text-center">
        {isLoginForm ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-orangeRoughy">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="my-3">
                <input
                  type="email"
                  onChange={(e) => setEmail(e?.target?.value)}
                  className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                  minLength={5}
                  name="email"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                  name="password"
                  minLength={5}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-2 top-3 text-gray-400  focus:outline-none"
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
              <Button
                className=" py-1 font-semibold px-6 shadow-lg bg-orangeRoughy hover:bg-orange-700 text-white  mx-auto disabled:bg-gray-600 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logining in.." : "Login"}
              </Button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-orangeRoughy">
              Sign Up
            </h2>
            <form onSubmit={handleSignupSubmit}>
              <div className="my-3">
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                  minLength={5}
                  name="name"
                  placeholder="Enter email"
                  required
                />
              </div>
              <button
                className="text-xs my-2 relative text-left mr-auto font-semibold flex items-center px-2"
                onClick={handleGenerateRandomPassword}
                type="button"
              >
                {isPending
                  ? "Generating random password"
                  : "Generate random password"}
                <span className="mx-2">
                  <HiLockClosed />
                </span>
              </button>
              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                  name="password"
                  minLength={5}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-2 top-3 text-gray-400  focus:outline-none"
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
              <Button
                className=" py-3 font-semibold px-6 shadow-lg bg-orangeRoughy hover:bg-orange-700 text-white  mx-auto disabled:bg-gray-600 disabled:cursor-not-allowed"
                disabled={isLoading}
                onClick={handleSignupSubmit}
              >
                {isLoading ? "Signing up.." : "Sign up"}
              </Button>
            </form>
          </>
        )}

        <div className="flex items-center justify-center mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center bg-white border border-gray-400 px-4 py-2 rounded-md shadow-md hover:bg-gray-100"
          >
            <FcGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>

        <hr className="my-8" />

        <div className="text-center">
          <button
            onClick={toggleForm}
            className="text-blue-500 hover:underline"
          >
            {isLoginForm
              ? "Don't have an account? Sign up instead"
              : "Already have an account? Login instead"}
          </button>
        </div>
      </div>
    );
  } else {
    return <div>Logged in</div>;
  }
}
