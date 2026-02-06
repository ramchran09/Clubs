import { useState } from "react";

export default function Login({setShowLogin}) {
  const [mode, setMode] = useState("login"); // "login" | "signup"

  return (
    <>
      {mode === "login" && <LoginComp onSwitch={() => setMode("signup")} />}
      {mode === "signup" && <SignupComp onSwitch={() => setMode("login")} />}
    </>
  );
}

//
// ---------------- LOGIN COMPONENT ----------------
//
function LoginComp({ onSwitch }) {
  return (
    <div className="bg-sky-100 flex justify-center items-center h-screen">

      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt="Placeholder"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>

        <form>
          {/* Username */}
          <div className="mb-4 bg-sky-100">
            <label htmlFor="username" className="block text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Remember Me */}
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="text-green-900 ml-2">
              Remember Me
            </label>
          </div>

          {/* Forgot Password */}
          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </form>

        {/* Switch to Signup */}
        <div className="mt-6 text-green-500 text-center">
          <button
            onClick={onSwitch}
            className="hover:underline"
          >
            Sign up Here
          </button>
        </div>
      </div>
    </div>
  );
}

//
// ---------------- SIGNUP COMPONENT ----------------
//
function SignupComp({ onSwitch }) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
      <div className="lg:flex items-center space-x-16">

        {/* Left Section */}
        <div className="w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg">

          <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
            Sign Up
          </h2>

          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <button
              onClick={onSwitch}
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Sign in here
            </button>
          </p>

          <form className="my-8 text-sm">

            {/* Name */}
            <div className="flex flex-col my-4">
              <label htmlFor="name" className="text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                className="mt-2 p-2 border border-gray-300 rounded text-sm text-gray-900"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col my-4">
              <label htmlFor="email" className="text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                className="mt-2 p-2 border border-gray-300 rounded text-sm text-gray-900"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col my-4">
              <label htmlFor="password" className="text-gray-700">Password</label>

              <div className="relative flex items-center mt-2">
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  className="flex-1 p-2 border pr-10 border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-2 bg-transparent flex items-center justify-center text-gray-700"
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col my-4">
              <label htmlFor="password_confirmation" className="text-gray-700">
                Password Confirmation
              </label>

              <div className="relative flex items-center mt-2">
                <input
                  type={showConfirm ? "text" : "password"}
                  id="password_confirmation"
                  className="flex-1 p-2 pr-10 border border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Enter your password again"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-2 bg-transparent flex items-center justify-center text-gray-700"
                >
                  {showConfirm ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center">
              <input type="checkbox" id="remember_me" className="mr-2 rounded" />
              <label htmlFor="remember_me" className="text-gray-700">
                I accept the{" "}
                <a href="#" className="text-blue-600 hover:underline">terms</a> and{" "}
                <a href="#" className="text-blue-600 hover:underline">privacy policy</a>
              </label>
            </div>

            {/* submit */}
            <div className="my-4 flex items-center justify-end space-x-4">
              <button  className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 uppercase">
                Sign Up
              </button>
            </div>
          </form>
        </div>


        <div className="flex items-center justify-center">
          <svg
            className="text-blue-600 w-5/6"
            style={{ transform: "scale(-1,1)" }}
            viewBox="0 0 832 500"
          >

          </svg>
        </div>
      </div>
    </div>
  );
}
