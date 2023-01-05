import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/UI/FormError";

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
              type="email"
              required
            />
            {errors.email?.message && (
              <FormError errorMessage={errors.email.message} />
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
              type="password"
              required
            />
            {errors.password?.message && (
              <FormError errorMessage={errors.password.message} />
            )}
            {errors.password?.type === "minLength" && (
              <FormError errorMessage="Password must be at least 8 characters long" />
            )}
          </div>
          <button className="btn mt-4">Log In</button>
        </form>
      </div>
    </div>
  );
}
