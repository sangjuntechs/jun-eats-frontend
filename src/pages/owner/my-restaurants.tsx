import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../__generated__/myRestaurant";

export const MY_RESTAURANTS_QUERY = gql`
  query myRestaurant($input: MyRestaurantsInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantsPart
        menu {
          ...DishesPart
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const MyRestaurants = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANTS_QUERY,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    }
  );
  console.log(data)
  return (
    <div>
      <div
        className="w-full py-48 bg-center"
        style={{
          backgroundImage: `url(${data?.myRestaurant?.restaurant?.coverImage})`,
        }}
      ></div>
      <div className="md:max-w-screen-xl mx-auto mt-6 px-5">
        <h2 className="font-semibold text-2xl mb-3">
          {data?.myRestaurant.restaurant?.name}
        </h2>
        <h3 className="text-sm text-gray-500">
          {data?.myRestaurant.restaurant?.address}
        </h3>
        <h4 className="text-sm text-gray-500">
          {data?.myRestaurant.restaurant?.category?.name}
        </h4>
        <div className="mt-8 ml-0">
          <Link
            to={`/restaurants/${data?.myRestaurant.restaurant?.id}/add-dish`}
            className="text-white bg-gray-800 p-4 mr-2 hover:bg-gray-600 transition-colors"
          >
            음식점 메뉴 추가
          </Link>
          <Link
            to={``}
            className="text-white bg-indigo-600 p-4 hover:bg-indigo-500 transition-colors"
          >
            프로모션 광고권 구입
          </Link>
        </div>
        <div>
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <p className="text-lg font-light mt-12">
              아직 아무런 메뉴가 없습니다. 메뉴를 등록해주세요!
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
