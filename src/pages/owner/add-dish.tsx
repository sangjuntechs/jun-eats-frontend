import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  createDish,
  createDishVariables,
} from "../../__generated__/createDish";
import { MY_RESTAURANTS_QUERY } from "./my-restaurant";

interface IDishForm {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
}

interface IParams {
  restaurantId: string;
}

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

export const AddDish = () => {
  const history = useHistory();
  const { restaurantId } = useParams<IParams>();
  const [createDishMutation, { loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
      refetchQueries: [{
          query: MY_RESTAURANTS_QUERY,
          variables: {
              input: {
                  id: +restaurantId,
              }
          }
      }]
  });

  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<IDishForm>({
    mode: "onChange",
  });

  const onSubmit = () => {
    const { name, description, price, ...rest } = getValues();
    const optionObjects = optionNumber.map((theId) => ({
      name: rest[`${theId}-OptionName`],
      extra: +rest[`${theId}-OptionExtra`],
    }));
    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
          option: optionObjects,
        },
      },
    });
    history.goBack();
  };

  const [optionNumber, setOptionNumber] = useState<number[]>([]);
  const optionClick = () => {
    setOptionNumber((curr) => [Date.now(), ...curr]);
  };

  const optionDelClick = (idForDelete: number) => {
    setOptionNumber((current) => current.filter((id) => id !== idForDelete));
    //@ts-ignore
    setValue(`${idForDelete}-OptionName`, "");
    //@ts-ignore
    setValue(`${idForDelete}-OptionExtra`, "");
  };

  return (
    <div>
      <form
        className="grid gap-3 grid-rows-1 max-w-screen-md mx-auto px-6 mt-32"
        onSubmit={handleSubmit(onSubmit)}
        placeholder="메뉴 이름"
      >
        <p className="font-medium text-xl">음식점 메뉴 추가</p>
        <input
          className="p-3 border-2 text-lg font-light border-gray-300 transition-colors"
          type="text"
          placeholder="메뉴 이름"
          {...register("name", { required: "이름은 필수 항목입니다." })}
        />
        {errors.name?.message && (
          <FormError errorMessage={errors.name.message} />
        )}
        <input
          className="p-3 border-2 text-lg font-light border-gray-300 transition-colors"
          type="number"
          placeholder="음식 가격"
          min={0}
          {...register("price", { required: "가격은 필수 항목입니다." })}
        />
        {errors.price?.message && (
          <FormError errorMessage={errors.price.message} />
        )}
        <input
          className="p-3 border-2 text-lg font-light border-gray-300 transition-colors"
          type="text"
          placeholder="음식 설명"
          {...register("description", { required: "설명은 필수 항목입니다." })}
        />
        {errors.description?.message && (
          <FormError errorMessage={errors.description.message} />
        )}
        <div className="mt-5 mb-5">
          <h4 className="text-md mb-3 font-medium">음식 옵션 추가</h4>
          <span
            onClick={optionClick}
            className="px-3 py-2 bg-gray-800 text-white hover:bg-gray-600 transition-colors cursor-pointer"
          >
            옵션 추가하기
          </span>
          {optionNumber.length !== 0 &&
            optionNumber.map((id) => {
              return (
                <div key={id} className="mt-3">
                  <input
                    className="p-2 m-2 focus:outline-none focus:border-gray-600 border-2"
                    //@ts-ignore
                    {...register(`${id}-OptionName`, {})}
                    type="text"
                    placeholder="옵션 이름"
                  />
                  <input
                    className="p-2 m-2 focus:outline-none focus:border-gray-600 border-2"
                    //@ts-ignore
                    {...register(`${id}-OptionExtra`, {})}
                    type="number"
                    placeholder="옵션 추가 가격"
                    defaultValue={0}
                    min={0}
                  />
                  <span
                    onClick={() => optionDelClick(id)}
                    className="bg-gray-800 py-3 px-3 text-white cursor-pointer"
                  >
                    옵션 삭제
                  </span>
                </div>
              );
            })}
        </div>
        <Button loading={loading} canClick={isValid} actionText="메뉴 생성" />
      </form>
    </div>
  );
};
