/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import { gql, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { Helmet } from "react-helmet-async";
import { UserRole } from "../__generated__/globalTypes";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

const CreateAccount = () => {
  const {
    register,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const History = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert("회원가입이 되었습니다! 로그인 화면으로 돌아갑니다.")
      History.push("/login");
    }
  };

  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted }
  );
  const onSubmit = (data: any) => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
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
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>회원가입 : Jun Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <div className="flex flex-row mb-10">
          <p className="text-4xl">Jun</p>{" "}
          <p className="text-4xl ml-1 text-indigo-600 font-bold">Eats</p>
        </div>
        <h4 className="w-full text-2xl mb-5 font-medium">
          Jun Eats 회원이 되어보세요!
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 mt-5 w-full"
        >
          <input
            {...register("email", {
              required: "필수 항목입니다.",
              pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            })}
            name="email"
            required
            type="email"
            placeholder="이메일"
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
            <FormError errorMessage={"유효한 메일 형식을 입력해주세요."} />
          )}
          <input
            {...register("password", {
              required: "필수 항목입니다.",
              minLength: 10,
            })}
            name="password"
            required
            type="password"
            placeholder="비밀번호"
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
            <FormError errorMessage={"비밀번호는 10글자 이상이여야 합니다."} />
          )}
          <select
            {...register("role", { required: true })}
            className="p-3 border-2 text-lg font-light border-gray-300 transition-colors focus:border-gray-500 focus:outline-none"
          >
            {Object.keys(UserRole).map((role, index) => {
              return <option key={index}>{role}</option>;
            })}
          </select>

          <Button
            canClick={isValid}
            loading={loading}
            actionText={"계정 생성"}
          />
          {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult.createAccount.error}
            />
          )}
        </form>
        <div className="text-gray-700 text-sm mt-5">
          이미 계정이 있으신가요?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            {" "}
            지금 로그인 하세요!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
