/* eslint-disable react-hooks/exhaustive-deps */
import { gql, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
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
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();
  const [loginMutation, { data }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION);
  const onSubmit = (data: any) => {
    console.log(data);
    const { email, password } = getValues();
    loginMutation({
      variables: {
        email,
        password,
      },
    });
  };
  const [redBorder, setRedBorder] = useState(false);

  useEffect(() => {
    if (
      errors.password?.type === "minLength" ||
      errors.password?.message ||
      errors.email?.message
    ) {
      setRedBorder(true);
    } else {
      setRedBorder(false);
    }
  });

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-20 pb-24 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">로그인</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 mt-5 px-10"
        >
          <input
            {...register("email", { required: "필수 항목입니다." })}
            name="email"
            required
            type="email"
            placeholder="Email"
            className={`bg-gray-100 shadow-inner py-3 px-3 rounded-lg focus:outline-none border-2 ${
              redBorder
                ? "focus:border-red-600 focus:outline-none border-2"
                : "focus:outline-none border-2 focus:border-green-500 focus:border-opacity-50 "
            }`}
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register("password", {
              required: "필수 항목입니다.",
              minLength: 10,
            })}
            name="password"
            required
            type="password"
            placeholder="Password"
            className={`bg-gray-100 shadow-inner py-3 px-3 rounded-lg ${
              redBorder
                ? "focus:border-red-600 focus:outline-none border-2"
                : "focus:outline-none border-2 focus:border-green-500 focus:border-opacity-50 "
            } `}
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage={"비밀번호는 10글자 이상이여야 합니다."} />
          )}
          <button className="py-3 px-3 bg-gray-800 text-white rounded-md hover:opacity-80">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
