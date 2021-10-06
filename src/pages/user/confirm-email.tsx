/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  verifyEmail,
  verifyEmailVariables,
} from "../../__generated__/verifyEmail";
import { useMe } from "../../hooks/useMe";
import { useHistory } from "react-router-dom";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

const ConfirmEmail = () => {
  const history = useHistory();
  const { data: userData } = useMe();
  const client = useApolloClient();
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok, error },
    } = data;
    if (ok && userData?.me.id) {
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
      history.push("/");
    }
    if(error) {
     history.push("/verify-error")
    }
  };
  const [verifyEmail] = useMutation<
    verifyEmail,
    verifyEmailVariables
  >(VERIFY_EMAIL_MUTATION, { onCompleted });

  useEffect(() => {
    const [_, code] = window.location.href.split("code=");
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, []);

  return (
    <div className="flex items-center h-screen justify-center flex-col absolute w-screen top-0 bg-white">
      <h1 className="text-xl font-medium mb-3 text-indigo-600">
        이메일을 인증하고 있습니다.
      </h1>
      <h3 className="text-sm">
        인증이 완료될 동안 페이지를 끄지 말고 기다려주세요 👨🏻‍💻
      </h3>
    </div>
  );
};

export default ConfirmEmail;
