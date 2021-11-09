import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { DishComp } from "../../components/Dish";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  restaurant,
  restaurantVariables,
} from "../../__generated__/restaurant";

interface IRestaurantProps {
  id: string;
}

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
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

const triggerStartOrder = () => {
  
}

const RestaurantDetail = () => {
  const params = useParams<IRestaurantProps>();
  const { data } = useQuery<restaurant, restaurantVariables>(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +params.id,
      },
    },
  });
  const ResName = data?.restaurant.restaurant?.name;

  return (
    <div>
      <Helmet>
        <title>{`${ResName} : Jun Eats`}</title>
      </Helmet>
      <header>
        <div
          className="w-full py-40 bg-center"
          style={{
            backgroundImage: `url(${data?.restaurant?.restaurant?.coverImage})`,
          }}
        >
          <div className="items-start w-4/12 py-12 pl-44 bg-white">
            <h2 className="font-semibold text-2xl mb-3">
              {data?.restaurant.restaurant?.name}
            </h2>
            <h3 className="text-sm text-gray-500">
              {data?.restaurant.restaurant?.address}
            </h3>
            <h4 className="text-sm text-gray-500">
              {data?.restaurant.restaurant?.category?.name}
            </h4>
          </div>
        </div>
      </header>
      <button onClick={triggerStartOrder} className='mt-16 ml-3 bg-indigo-600 text-white py-3 px-4 xl:ml-20 hover:bg-indigo-500 transition-colors'>주문 시작</button>
      <div className="grid xl:grid-cols-3 xl:max-w-screen-2xl sm:gap-x-2 md:w-full xl:gap-5 mt-12 grid-cols-1 sm:grid-cols-2 gap-x-3 mx-auto w-full">
        {data?.restaurant.restaurant?.menu.length !== 0
          ? data?.restaurant.restaurant?.menu.map((dish, index) => (
              <DishComp
                key={index}
                name={dish.name}
                description={dish.description}
                price={dish.price}
                isCustomer={true}
                option={dish.option}
              />
            ))
          : "메뉴를 준비 중 입니다."}
      </div>
    </div>
  );
};

export default RestaurantDetail;
