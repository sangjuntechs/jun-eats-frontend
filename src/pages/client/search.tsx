/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import RestaurantsComp from "../../components/restaurants";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantsPart
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

const Search = () => {
  const location = useLocation();
  const [_, searchTerm] = location.search.split("?term=");

  const history = useHistory();
  const [queryReadyToFetch, { loading, data, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);
  useEffect(() => {
    const [_, searchTerm] = location.search.split("?term=");
    if (!searchTerm) {
      return history.replace("/");
    }
    queryReadyToFetch({
      variables: {
        input: {
          page: 1,
          query: searchTerm,
        },
      },
    });
  }, []);
  console.log(loading, data, called);

  return (
    <div className="w-full flex justify-center items-center">
      <Helmet>
        <title>검색 : Jun Eats</title>
      </Helmet>
      <div className="grid xl:grid-cols-3 sm:gap-x-2 md:gap-y-10 md:w-10/12 mt-20 grid-cols-1 gap-y-7 w-11/12 sm:grid-cols-2">
        {data?.searchRestaurant.restaurants?.map((restaurant) => {
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
    </div>
  );
};

export default Search;
