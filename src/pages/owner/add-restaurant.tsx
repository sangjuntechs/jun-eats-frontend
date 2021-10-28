import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  createRestaurant,
  createRestaurantVariables,
} from "../../__generated__/createRestaurant";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
}

export const AddRestaurant = () => {
  const [redBorder, setRedBorder] = useState(false);

  useEffect(() => {
    if (!isValid) {
      setRedBorder(true);
    } else {
      setRedBorder(false);
    }
  });

  const [createRestaurantMutation, { loading, data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION);
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IFormProps>({
    mode: "onChange",
  });
  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="max-w-screen-2xl mx-auto">
      <form
        className="grid gap-3 grid-rows-1 max-w-screen-md mx-auto px-6 mt-32"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-medium text-2xl mb-3">Jun Eats에 음식점을 등록하세요!</h1>
        <input
          className={`p-3 border-2 text-lg font-light border-gray-300 transition-colors ${
            redBorder
              ? "focus:border-red-600 focus:outline-none border-2"
              : "focus:outline-none border-2 focus:border-green-500 focus:border-opacity-50 "
          } `}
          type="text"
          placeholder="음식점 이름"
          {...register("name", { required: "필수 항목입니다." })}
        />
        {errors.name?.message && (
          <FormError errorMessage={errors.name.message} />
        )}
        <input
          className={`p-3 border-2 text-lg font-light border-gray-300 transition-colors ${
            redBorder
              ? "focus:border-red-600 focus:outline-none border-2"
              : "focus:outline-none border-2 focus:border-green-500 focus:border-opacity-50 "
          } `}
          type="text"
          placeholder="주소"
          {...register("address", { required: "필수 항목입니다." })}
        />
        {errors.address?.message && (
          <FormError errorMessage={errors.address.message} />
        )}
        <input
          className={`p-3 border-2 text-lg font-light border-gray-300 transition-colors ${
            redBorder
              ? "focus:border-red-600 focus:outline-none border-2"
              : "focus:outline-none border-2 focus:border-green-500 focus:border-opacity-50 "
          } `}
          type="text"
          placeholder="음식점 카테고리"
          {...register("categoryName", { required: "필수 항목입니다." })}
        />
        {errors.categoryName?.message && (
          <FormError errorMessage={errors.categoryName.message} />
        )}
        <Button loading={loading} canClick={isValid} actionText="음식점 생성" />
      </form>
    </div>
  );
};
