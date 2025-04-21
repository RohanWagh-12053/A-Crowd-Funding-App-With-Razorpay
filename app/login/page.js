"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"


export default function LoginPopup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(errors);
  }, [errors]);

 const { data: session } = useSession()
 const router = useRouter()
 
 useEffect(() => {
  if (session) {
    router.push("/dashboard"); // ✅ Redirect inside useEffect
  }
}, [session, router]); // ✅ Dependencies added

  return (
    <div
      id="login-popup"
      tabIndex="-1"
      className="bg-black/50 overflow-y-auto relative top-0 right-0 left-0 z-50 h-full flex items-center justify-center"
    >
      <div className="relative p-4 w-full max-w-md">
        <div className="relative bg-black border text-white rounded-lg shadow-lg shadow-gray-500">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5"
          >
            ✕
          </button>
          <div className="p-5">
            <h3 className="text-2xl mb-0.5 font-medium">
              Login to your account
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              You must be logged in to perform this action.
            </p>
            <div className="mt-7 flex flex-col gap-2">
              <button onClick={()=>{if(signIn("github")){ console.log("Signed in")}}} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border bg-white p-2 text-sm font-medium text-black">
                <img
                  src="https://www.svgrepo.com/show/512317/github-142.svg"
                  alt="GitHub"
                  className="h-[18px] w-[18px]"
                />{" "}
                Continue with GitHub
              </button>
              <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border bg-white p-2 text-sm font-medium text-black">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-[18px] w-[18px]"
                />{" "}
                Continue with Google
              </button>
              <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border bg-white p-2 text-sm font-medium text-black">
                <img
                  src="https://www.svgrepo.com/show/448234/linkedin.svg"
                  alt="LinkedIn"
                  className="h-[18px] w-[18px]"
                />{" "}
                Continue with LinkedIn
              </button>
            </div>
            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-200">
              <div className="h-px w-full bg-slate-200"></div> OR{" "}
              <div className="h-px w-full bg-slate-200"></div>
            </div>
            <form
              onSubmit={handleSubmit((data) => console.log(data))}
              className="w-full flex flex-col items-center"
            >
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
                type="email"
                placeholder="Email Address"
                className="block w-full rounded-lg border px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-black"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="Password"
                className="mt-2 block w-full rounded-lg border px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-black"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              <p className="mb-3 mt-2 text-sm text-gray-500 w-full">
                <a
                  href="/forgot-password"
                  className="text-blue-500 hover:text-blue-600 "
                >
                  Forgot your password?
                </a>
              </p>
              <button
                type="submit"
                className="text-gray-900  bg-gradient-to-r from-teal-300 to-lime-300 hover:bg-gradient-to-r hover:from-lime-300 hover:to-teal-300  focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
              >
                Continue
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-slate-300">
              Don't have an account?{" "}
              <a href="/signup" className="font-medium text-[#4285f4]">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
