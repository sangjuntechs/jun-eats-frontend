import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import RestaurantsComp from "../../components/restaurants";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { category, categoryVariables } from "../../__generated__/category";
import BurgerImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/fast-food-icons-freeburger_107425.png";
import ChickenImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/meat_food_chicken_icon_146854 (1).png";
import SushiImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/549sushi_100336.png";
import PastaImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/72_85243.png";
import KoreanImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/3377053-bibimbub-cooking-food-japan_107429.png";
import CoffeeImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/1455739604_Kitchen_Bold_Line_Color_Mix-18_icon-icons.com_53420.png";
import SoupImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/spicy_shrimp_soup_food_icon_124102.png";
import NightImg from "/Users/sangjun/Documents/jun-eats-frontend/src/img/640crescentmoon_100402.png";
import { Helmet } from "react-helmet-async";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategorysPart
      }
    }

    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantsPart
      }
      category {
        ...CategorysPart
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;


interface ICategoryParams {
  slug: string;
}

const Category = () => {
  const [page, setPage] = useState(1);

  const onNextPageClick = () => {
    setPage(page + 1);
  };

  const onPrevPageClick = () => {
    setPage(page - 1);
  };
  const params = useParams<ICategoryParams>();
  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page,
          slug: params.slug,
        },
      },
    }
  );
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <Helmet><title>{params.slug} : Jun Eats</title></Helmet>
      <div className="flex flex-wrap justify-center items-center pt-10">
            {data?.allCategories.categories?.slice(0, 8).map((category) => {
              return (
                <Link key={category.id} to={`/category/${category.slug}`}>
                <div
                  key={category.id}
                  className="flex justify-center items-center mx-5 my-2 flex-col"
                >
                  <img
                    className="p-1 w-16 h-16 bg-cover rounded-full bg-indigo-400 transition-colors hover:bg-indigo-500 cursor-pointer"
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
                  <div>{category.slug === params.slug ? <div className="w-16 border-b-4 border-indigo-600"></div> : ''}</div>
                </div>
                </Link>
              );
            })}
          </div>
          <div className="flex py-20 text-3xl font-light"><p className="text-3xl font-medium text-indigo-600 mr-2">{params.slug}</p> 맛집 검거완료 👍🏻</div>
      
      <div className="grid xl:grid-cols-3 sm:gap-x-2 md:gap-y-10 md:w-10/12 mt-20 grid-cols-1 gap-y-7 w-11/12 sm:grid-cols-2">
      {!loading && data?.category.restaurants?.map((restaurant) => {
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
      <div className="grid grid-rows-1 grid-cols-3 py-16 items-center justify-center md:w-3/12 w-11/12">
        {page > 1 ? (
          <button
            onClick={onPrevPageClick}
            className="text-2xl transition-colors hover:text-indigo-600 text-center"
          >
            &larr;
          </button>
        ) : (
          <p className="text-xs text-center">첫 번째 페이지 입니다.</p>
        )}
        <span className="text-sm mx-5 text-center">
          Pages {page} of {data?.category.totalPages}
        </span>
        {page !== data?.category.totalPages ? (
          <button
            onClick={onNextPageClick}
            className="text-2xl transition-colors hover:text-indigo-600"
          >
            &rarr;
          </button>
        ) : (
          <p className="text-xs text-center">마지막 페이지 입니다.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
