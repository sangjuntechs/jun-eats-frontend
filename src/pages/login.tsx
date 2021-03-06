/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { gql, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { Helmet } from "react-helmet-async";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

export const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, { onCompleted });
  const onSubmit = (data: any) => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  const [redBorder, setRedBorder] = useState(false);

  useEffect(() => {
    if (!isValid) {
      setRedBorder(true);
    } else {
      setRedBorder(false);
    }
  });

  return (
    <div className="h-full flex items-center flex-col mt-16 lg:mt-28">
      <Helmet>
        <title>????????? : Jun Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <div className="flex flex-row mb-10">
          <p className="text-4xl">Jun</p>{" "}
          <p className="text-4xl ml-1 text-indigo-600 font-bold">Eats</p>
        </div>
        <h4 className="w-full text-2xl mb-5 font-medium">
          ??????????????? Jun Eats ?????????.
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 mt-5 w-full"
        >
          <input
            {...register("email", {
              required: "?????? ???????????????.",
              pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            })}
            name="email"
            required
            type="email"
            placeholder="?????????"
            className={`p-3 border-2 text-lg font-light border-gray-300 transition-colors ${
              redBorder
                ? "focus:border-red-600 focus:outline-none border-2"
                : "focus:outline-none border-2 focus:border-green-500 focus:border-opacity-50 "
            } `}
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"????????? ?????? ????????? ??????????????????."} />
          )}
          <input
            {...register("password", {
              required: "?????? ???????????????.",
              minLength: 10,
            })}
            name="password"
            required
            type="password"
            placeholder="????????????"
            className={`p-3 border-2 text-lg font-light border-gray-300 transition-colors ${
              redBorder
                ? "focus:border-red-600 focus:outline-none border-2"
                : "focus:outline-none border-2 focus:border-green-500 focus:border-opacity-50 "
            } `}
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage={"??????????????? 10?????? ??????????????? ?????????."} />
          )}
          <Button
            canClick={isValid}
            loading={loading}
            actionText={"????????????"}
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div className="text-gray-700 text-sm mt-5">
          ????????? ????????????????{" "}
          <Link
            to="/create-account"
            className="text-indigo-600 hover:underline"
          >
            {" "}
            ????????? ???????????????!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
