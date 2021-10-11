import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import BurgerImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/fast-food-icons-freeburger_107425.png";
import ChickenImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/meat_food_chicken_icon_146854 (1).png";
import SushiImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/549sushi_100336.png";
import PastaImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/72_85243.png";
import KoreanImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/3377053-bibimbub-cooking-food-japan_107429.png";
import CoffeeImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/1455739604_Kitchen_Bold_Line_Color_Mix-18_icon-icons.com_53420.png";
import SoupImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/spicy_shrimp_soup_food_icon_124102.png";
import NightImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/640crescentmoon_100402.png";
import RestaurantsComp from "../../components/restaurants";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";

const RESTAURANT_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategorysPart
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantsPart
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface IPropsSearch {
  searchTerm: string;
}

const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANT_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });

  const onNextPageClick = () => {
    setPage(page + 1);
  };

  const onPrevPageClick = () => {
    setPage(page - 1);
  };

  const history = useHistory();

  const { register, handleSubmit, getValues } = useForm<IPropsSearch>();

  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname:'/search',
      search: `?term=${searchTerm}`
    })
  };

  return (
    <div>
      <Helmet>
        <title>Jun Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="w-full bg-gray-700 py-20 flex flex-col items-center justify-around md:py-40 md:flex-row"
      >
        <div className="flex flex-col justify-center items-center">
          <p className="md:text-3xl text-base font-normal text-white mb-3 md:font-bold tracking-wide">
            우리 뭐 먹을까? 금방 와!
          </p>
          <p className="text-white md:text-sm text-xs">
            주저하지 말고 Jun Eats에서 시키자!
          </p>
        </div>
        <input
          {...register("searchTerm", {
            required: true,
          })}
          className="md:p-5 md:text-lg border-2 md:font-medium transition-colors md:w-3/12 rounded-xl text-white bg-gray-800 focus:border-indigo-600 focus:outline-none p-3 md:mt-0 mt-5 text-sm"
          type="search"
          placeholder="음식점을 검색해보세요!"
        />
      </form>
      {!loading && (
        <div className="flex justify-around items-center mt-12 flex-col max-w-screen-3xl mx-auto w-full">
          <div className="flex flex-wrap justify-center items-center">
            {data?.allCategories.categories?.slice(0, 8).map((category) => {
              return (
                <Link key={category.id} to={`/category/${category.slug}`}>
                <div
                  key={category.id}
                  className="flex justify-center items-center mx-5 my-2 flex-col"
                >
                  <img
                    className="p-1 w-16 h-16 md:w-24 md:p-2 md:h-24 bg-cover rounded-full bg-indigo-400 transition-colors hover:bg-indigo-500 cursor-pointer"
                    src={
                      category.slug === "패스트푸드"
                        ? `${BurgerImg}`
                        : category.slug === "치킨"
                        ? `${ChickenImg}`
                        : category.slug === "일식"
                        ? `${SushiImg}`
                        : category.slug === "양식"
                        ? `${PastaImg}`
                        : category.slug === "한식"
                        ? `${KoreanImg}`
                        : category.slug === "커피,디저트"
                        ? `${CoffeeImg}`
                        : category.slug === "찜,탕"
                        ? `${SoupImg}`
                        : category.slug === "야식"
                        ? `${NightImg}`
                        : ""
                    }
                    alt="categoryImg"
                  />
                  <p className="text-sm mt-2 font-semibold">{category.name}</p>
                </div>
                </Link>
              );
            })}
          </div>
          <div className="grid xl:grid-cols-3 sm:gap-x-2 md:gap-y-10 md:w-10/12 mt-20 grid-cols-1 gap-y-7 w-11/12 sm:grid-cols-2">
            {data?.restaurants.results?.map((restaurant) => {
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
          <div className="grid grid-rows-1 grid-cols-3 py-16 items-center justify-center">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="text-2xl transition-colors hover:text-indigo-600"
              >
                &larr;
              </button>
            ) : <p className="text-xs">첫 번째 페이지 입니다.</p>}
            <span className="text-sm mx-5">
              Pages {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="text-2xl transition-colors hover:text-indigo-600"
              >
                &rarr;
              </button>
            ) : <p className="text-xs">마지막 페이지 입니다.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
