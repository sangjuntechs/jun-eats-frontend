/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  createRestaurant,
  createRestaurantVariables,
} from "../../__generated__/createRestaurant";
import { MY_RESTAURANTS_QUERY } from "./my-restaurant";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
      restaurantId
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

export const AddRestaurant = () => {
  const [redBorder, setRedBorder] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!isValid) {
      setRedBorder(true);
    } else {
      setRedBorder(false);
    }
  });

  const client = useApolloClient();
  const history = useHistory();
  const onCompleted = (data: createRestaurant) => {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;
    if (ok) {
      const { name, address, categoryName } = getValues();
      setUploading(false);
      const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });
      client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        data: {
          myRestaurants: {
            ...queryResult.myRestaurants,
            restaurants: [
              {
                address,
                category: {
                  name: categoryName,
                  __typename: "Category",
                },
                coverImage:
                  imageUrl,
                id: restaurantId,
                isPromoted: false,
                name,
                __typename: "Restaurant",
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
      });
      history.push('/');
    }
  };

  const [createRestaurantMutation, { data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
  });

  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IFormProps>({
    mode: "onChange",
  });
  const [uploading, setUploading] = useState(false);
  const onSubmit = async () => {
    try {
      setUploading(true);
      const { file, name, address, categoryName } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: coverImage } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      setImageUrl(coverImage)
      createRestaurantMutation({
        variables: {
          input: {
            name,
            categoryName,
            address,
            coverImage,
          },
        },
      });
      setUploading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-screen-2xl mx-auto">
      <form
        className="grid gap-3 grid-rows-1 max-w-screen-md mx-auto px-6 mt-32"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-medium text-2xl mb-3">
          Jun Eats??? ???????????? ???????????????!
        </h1>
        <input
          className={`p-3 border-2 text-lg font-light border-gray-300 transition-colors ${
            redBorder
              ? "focus:border-red-600 focus:outline-none border-2"
              : "focus:outline-none border-2 focus:border-green-500 focus:border-opacity-50 "
          } `}
          type="text"
          placeholder="????????? ??????"
          {...register("name", { required: "?????? ???????????????." })}
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
          placeholder="??????"
          {...register("address", { required: "?????? ???????????????." })}
        />
        {errors.address?.message && (
          <FormError errorMessage={errors.address.message} />
        )}
        <select
          className={`p-3 border-2 text-lg font-light border-gray-300 transition-colors ${
            redBorder
              ? "focus:border-red-600 focus:outline-none border-2"
              : "focus:outline-none border-2 focus:border-green-500 focus:border-opacity-50 "
          } `}
          placeholder="????????? ????????????"
          {...register("categoryName", { required: "?????? ???????????????." })}
        >
          <option value="??????">??????</option>
          <option value="??????">??????</option>
          <option value="??????">??????</option>
          <option value="???????????????">???????????????</option>
          <option value="??????">??????</option>
          <option value="??????">??????</option>
          <option value="??????,?????????">??????/?????????</option>
          <option value="???,???">???/???</option>
        </select>
        {errors.categoryName?.message && (
          <FormError errorMessage={errors.categoryName.message} />
        )}
        <div>
          <input
            type="file"
            accept="/image/*"
            {...register("file", { required: true })}
          />
        </div>
        <Button
          loading={uploading}
          canClick={isValid}
          actionText="????????? ??????"
        />
        {data?.createRestaurant?.error && (
          <FormError errorMessage={data.createRestaurant.error} />
        )}
      </form>
    </div>
  );
};
