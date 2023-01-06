import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FormError } from "../components/UI/FormError";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../api/types/LoginMutation";
import testLogo from "../images/ruby.svg";
import { Button } from "../components/UI/Button";
import { Link } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginAccountInput: LoginAccountInput!) {
    loginAccount(input: $loginAccountInput) {
      ok
      error
      token
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({ mode: "onBlur" });
  const onCompleted = (data: LoginMutation) => {
    const {
      loginAccount: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  function onSubmitHandler() {
    if (loading) return;
    const { email, password } = getValues();
    loginMutation({
      variables: {
        loginAccountInput: {
          email,
          password,
        },
      },
    });
  }

  return (
    <div className="flex h-screen flex-col items-center">
      <div className="mt-12 flex w-full max-w-screen-sm flex-col items-center px-5 md:mt-36">
        <img src={testLogo} alt="test-logo" className="w-20" />
        <h3 className="mt-8 w-full text-3xl font-semibold">Welcome back!</h3>
        <p className="text-md mt-4 w-full">
          Login using your account credentials
        </p>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="mt-4 mb-5 flex w-full flex-col"
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
              })}
              placeholder="password"
              type="password"
              required
            />
            {errors.password?.message && (
              <FormError errorMessage={errors.password.message} />
            )}
          </div>
          <Button actionText="Log In" canClick={isValid} loading={loading} />
          {loginMutationResult?.loginAccount.error && (
            <FormError errorMessage={loginMutationResult.loginAccount.error} />
          )}
        </form>
        <div className="">
          New Customer?{" "}
          <Link to="/sign-up" className="link font-semibold">
            Create Snapsnacks Account!
          </Link>
        </div>
      </div>
    </div>
  );
}
