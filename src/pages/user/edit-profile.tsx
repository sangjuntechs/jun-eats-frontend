/* eslint-disable no-useless-escape */
import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { useMe } from "../../hooks/useMe";
import {
  editProfile,
  editProfileVariables,
} from "../../__generated__/editProfile";

interface IFormProps {
  email?: string;
  password?: string;
}

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

const EditProfile = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const history = useHistory();

  const [changeProfile, setChangeProfile] = useState(false);

  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok, error },
    } = data;
    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;

      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              verified
              email
            }
          `,
          data: {
            email: newEmail,
            verified: false,
          },
        });
      }
    }
    if (error) {
      history.push("/editprofile-error");
    }
  };

  const [editProfile, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, { onCompleted });

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
    },
  });

  const onSubmit = () => {
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
        },
      },
    });
    setChangeProfile(true);
  };

  return (
    <div className="flex justify-center items-center flex-col mt-16 md:mt-44">
      <Helmet>
          <title>?????? ?????? ?????? : Jun Eats</title>
      </Helmet>
      <h1 className="font-medium text-2xl mb-5">?????? ?????? ??????</h1>
      <p className="text-sm text-gray-500">
        ????????? ????????? ????????? ?????? ????????? ????????? ???????????????. 
      </p>
      <p className="text-sm text-gray-500 mb-3 px-3 md:p-0">
        ??????????????? ????????? ???????????? ??????????????? ?????? ?????? ????????? ?????????.
      </p>
      <form
        className="grid gap-3 max-w-screen-sm w-screen p-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("email", {
            pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
          })}
          className="p-3 border-2 text-lg font-light border-gray-300 transition-colors focus:outline-none focus:border-gray-500"
          type="email"
          name="email"
          placeholder="?????????"
        />
        {errors.email?.type === "pattern" && (
          <FormError errorMessage={"????????? ?????? ????????? ??????????????????."} />
        )}
        <input
          {...register("password", {
            minLength: 10,
          })}
          className="p-3 border-2 text-lg font-light border-gray-300 transition-colors focus:outline-none focus:border-gray-500"
          type="password"
          name="password"
          placeholder="????????????"
        />
        {errors.password?.type === "minLength" && (
            <FormError errorMessage={"??????????????? 10?????? ??????????????? ?????????."} />
          )}
        <Button loading={loading} actionText="????????? ??????" canClick={isValid} />
        {changeProfile ? <p className="text-red-500 text-xs">???????????? ???????????? ???????????????.</p> : ""}
      </form>
    </div>
  );
};

export default EditProfile;
