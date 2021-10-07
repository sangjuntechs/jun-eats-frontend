import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import BurgerImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/fast-food-icons-freeburger_107425.png";
import ChickenImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/meat_food_chicken_icon_146854 (1).png";
import SushiImg from '/Users/sangjun/Documents/jun-eats-frontend/src/img/549sushi_100336.png';
import PastaImg from '/Users/sangjun/Documents/jun-eats-frontend/src/img/72_85243.png';

const RESTAURANT_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

const Restaurants = () => {
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANT_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });

  console.log(data);
  return (
    <div>
      <Helmet>
        <title>Jun Eats</title>
      </Helmet>
      <form className="w-full bg-gray-700 py-40 flex items-center justify-center">
        <input
          className="p-5 text-lg font-medium transition-colors focus:outline-none w-3/12 rounded-xl text-white bg-gray-800"
          type="search"
          placeholder="음식점을 검색해보세요!"
        />
      </form>
      {!loading && (
        <div className="flex justify-around items-center flex-wrap mt-6 px-2">
          {data?.allCategories.categories?.map((category) => {
            return (
              <div className="flex flex-col justify-between items-center m-3">
                <img
                  className="w-20 h-20 bg-cover rounded-full bg-indigo-400 transition-colors hover:bg-indigo-500 cursor-pointer"
                  src={
                    category.slug === "패스트푸드"
                      ? `${BurgerImg}`
                      : category.slug === "치킨"
                      ? `${ChickenImg}`
                      : category.slug === "일식"
                      ? `${SushiImg}`
                      : category.slug === '양식'
                      ? `${PastaImg}`
                      : ""
                  }
                  alt="categoryImg"
                />
                <p className="text-sm mt-2 font-semibold">{category.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Restaurants;
