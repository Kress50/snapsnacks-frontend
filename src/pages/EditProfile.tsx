import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  EditAccountMutation,
  EditAccountMutationVariables,
} from "../api/types/EditAccountMutation";
import { Button } from "../components/UI/Button";
import { FormError } from "../components/UI/FormError";
import { useMeQuery } from "../hooks/useMeQuery";

const EDIT_ACCOUNT_MUTATION = gql`
  mutation EditAccountMutation($editAccountInput: EditAccountInput!) {
    editProfile(input: $editAccountInput) {
      ok
      error
    }
  }
`;

interface IEditAccountForm {
  email?: string;
  password?: string;
}

const EditProfile = () => {
  const { data: userData, refetch } = useMeQuery();
  const onCompleted = async (data: EditAccountMutation) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      await  refetch();
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IEditAccountForm>({
    mode: "onChange",
    defaultValues: { email: userData?.me.email },
  });
  const { email, password } = getValues();

  const [editAccountMutation, { data: editAccountMutationResult, loading }] =
    useMutation<EditAccountMutation, EditAccountMutationVariables>(
      EDIT_ACCOUNT_MUTATION,
      { onCompleted }
    );

  function submitHandler() {
    editAccountMutation({
      variables: {
        editAccountInput: { email, ...(password !== "" && { password }) },
      },
    });
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-screen-sm flex-col items-center px-5">
        <h4 className="w-full text-xl font-semibold">Edit Profile</h4>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="mt-4 mb-5 flex w-full flex-col"
        >
          <div className="mb-4 flex flex-col">
            <input
              className="input"
              {...register("email", {
                pattern:
                  // eslint-disable-next-line no-useless-escape
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              placeholder="email"
              type="email"
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
              {...register("password")}
              placeholder="password"
              type="password"
            />
            {errors.password?.message && (
              <FormError errorMessage={errors.password.message} />
            )}
          </div>
          <Button
            actionText="Update Profile"
            canClick={isValid}
            loading={loading}
          />
          {editAccountMutationResult?.editProfile.error && (
            <FormError
              errorMessage={editAccountMutationResult.editProfile.error}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
