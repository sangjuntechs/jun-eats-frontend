import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import RestaurantsComp from "../../components/restaurants";
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
    <div className='flex max-w-screen-2xl mx-auto justify-center items-center'>
      <Helmet>
        <title>내 식당 : Jun Eats</title>
      </Helmet>
      {data?.myRestaurants.ok && data.myRestaurants.restaurants.length === 0 ? (
        <div className="mt-32 mx-5 xl:mx-0">
          <h2 className="font-normal text-3xl">내 식당</h2>
          <p className='pt-3 text-lg'>현재 운영 중인 식당이 없습니다. 새로운 음식점을 생성해보세요!</p>
          <Link to='/add-restaurant'>
          <p className='text-indigo-600 cursor-pointer hover:underline text-sm inline-block'>새로운 식당 만들기 &rarr;</p>
          </Link>
        </div>
      ) : (
        <div className="grid xl:grid-cols-3 sm:gap-x-2 md:gap-y-10 md:w-10/12 mt-20 grid-cols-1 gap-y-7 w-11/12 sm:grid-cols-2 justify-center items-center">
            <div className="grid text-3xl font-medium mx-auto">나의 음식점</div>
            {data?.myRestaurants.restaurants?.map((restaurant) => {
              return (
                <RestaurantsComp
                  key={restaurant.id}
                  id={restaurant.id + ""}
                  coverImage={restaurant.coverImage}
                  name={restaurant.name}
                  address={restaurant.address}
                  categoryName={restaurant.category?.name}
                />
              );
            })}
          </div>
      )}
    </div>
  );
};
