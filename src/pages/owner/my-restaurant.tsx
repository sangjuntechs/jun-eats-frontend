import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { myRestaurants } from "../../__generated__/myRestaurants";

const MY_RESTAURANTS_QUERY = gql`
  query myRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantsPart
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const MyRestaurant = () => {
  const { data } = useQuery<myRestaurants>(MY_RESTAURANTS_QUERY);
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>내 음식점 : Jun Eats</title>
      </Helmet>
      {data?.myRestaurants.ok && data.myRestaurants.restaurants.length === 0 ? (
        <div className="flex items-start justify-start flex-col max-w-screen-2xl px-10 mx-auto mt-32">
          <h2 className="font-normal text-3xl">내 음식점</h2>
          <p className='pt-3 text-lg'>현재 운영 중인 음식점이 없습니다. 새로운 음식점을 생성해보세요!</p>
          <Link to='/add-restaurant'>
          <p className='text-indigo-600 cursor-pointer hover:underline text-sm'>새로운 음식점 만들기 &rarr;</p>
          </Link>
        </div>
      ) : (
        "음식점 있음"
      )}
    </div>
  );
};
