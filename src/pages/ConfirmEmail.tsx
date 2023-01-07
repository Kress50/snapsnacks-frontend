import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyEmail, verifyEmailVariables } from "../api/types/verifyEmail";
import Loading from "../components/Loading";
import { useMeQuery } from "../hooks/useMeQuery";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($verifyEmailInput: VerifyEmailInput!) {
    verifyEmail(input: $verifyEmailInput) {
      ok
      error
    }
  }
`;

const ConfirmEmail = () => {
  const { data: userData } = useMeQuery();
  const client = useApolloClient();
  const navigate = useNavigate();

  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
    }
    navigate("/");
  };

  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    {
      onCompleted,
    }
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, code] = window.location.href.split("code=");
    verifyEmail({ variables: { verifyEmailInput: { code } } });
  }, [verifyEmail]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Loading />
      <h2 className="text-xl font-semibold">Confirming email...</h2>
      <h4 className="text-sm">Don't close this page</h4>
    </div>
  );
};

export default ConfirmEmail;
