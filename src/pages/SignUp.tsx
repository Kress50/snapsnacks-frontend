import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FormError } from "../components/UI/FormError";
import { Button } from "../components/UI/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserRole } from "../api/types/globalTypes";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "../api/types/CreateAccountMutation";
import { Logo } from "../components/UI/Logo";
import { Helmet } from "react-helmet-async";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ISignUpForm {
  email: string;
  password: string;
  role: UserRole;
}

export default function SignUp() {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ISignUpForm>({
    mode: "onBlur",
    defaultValues: { role: UserRole.Client },
  });
  const navigate = useNavigate();
  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      navigate("/");
    }
  };
  const [
    createAccountMutation,
    { data: createAccountMutationResult, loading },
  ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted }
  );

  function onSubmitHandler() {
    if (loading) return;
    const { email, password, role } = getValues();
    createAccountMutation({
      variables: {
        createAccountInput: {
          email,
          password,
          role,
        },
      },
    });
  }

  return (
    <>
      <Helmet>
        <title>SignUp | Snapsnacks</title>
      </Helmet>
      <div className="flex h-screen flex-col items-center">
        <div className="mt-12 flex w-full max-w-screen-sm flex-col items-center px-5 md:mt-36">
          <Logo size="w-36" />
          <h3 className="mt-8 w-full text-3xl font-semibold">Welcome!</h3>
          <p className="text-md mt-4 w-full">
            Create your account using credentials
          </p>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="mt-4 mb-5 flex w-full flex-col"
          >
            <div className="mb-4 flex flex-col">
              <input
                className="input"
                {...register("email", {
                  required: "Email is required",
                  pattern:
                    // eslint-disable-next-line no-useless-escape
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                placeholder="email"
                type="email"
                required
              />
              {errors.email?.message && (
                <FormError errorMessage={errors.email.message} />
              )}
              {errors.email?.type === "pattern" && (
                <FormError errorMessage="This email is not valid" />
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
            <select
              className="input mb-4"
              {...register("role", {
                required: "Role is required",
              })}
              required
            >
              {Object.keys(UserRole).map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
            {errors.role?.message && (
              <FormError errorMessage={errors.role.message} />
            )}
            <Button actionText="Sign Up" canClick={isValid} loading={loading} />
            {createAccountMutationResult?.createAccount.error && (
              <FormError
                errorMessage={createAccountMutationResult.createAccount.error}
              />
            )}
          </form>
          <div>
            Already a Customer?{" "}
            <Link to="/" className="link font-semibold">
              Log In Now!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
