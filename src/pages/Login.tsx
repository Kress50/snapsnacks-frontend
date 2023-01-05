import React from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
  email?: string;
  password?: string;
}

export default function Login() {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();

  function onSubmitHandler() {
    console.log(getValues());
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="w-full max-w-lg rounded-lg bg-white py-8 text-center shadow-md">
        <h3 className="text-3xl font-semibold text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="mt-8 flex flex-col px-5"
        >
          <div className="mb-4 flex flex-col">
            <input
              className="input"
              {...register("email", { required: "Email is required" })}
              placeholder="email"
              required
              type="email"
            />
            {errors.email?.message && (
              <span className="error mt-1">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <input
              className="input"
              {...register("password", {
                required: "Password is required",
                minLength: 8,
              })}
              placeholder="password"
              required
              type="password"
            />
            {errors.password?.message && (
              <span className="error mt-1">{errors.password.message}</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="error mt-1">
                Password must be at least 8 characters long
              </span>
            )}
          </div>
          <button className="btn mt-4">Log In</button>
        </form>
      </div>
    </div>
  );
}
