import { gql, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { DishComp } from "../../components/Dish";
import {
  DISH_FRAGMENT,
  ORDERS_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from "../../fragments";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../__generated__/myRestaurant";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";
import { pendingOrders } from "../../__generated__/pendingOrders";

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
        order {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;

const PENDING_ORDERS_SUBSCRIPTION = gql`
  subscription pendingOrders {
    pendingOrders {
      id
      total
      status
      driver {
        email
      }
      customer {
        email
      }
      restaurant {
        name
      }
      items {
        dish {
          price
          name
          option {
            name
            extra
          }
        }
      }
    }
  }
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

  const { data: subscriptionData } = useSubscription<pendingOrders>(
    PENDING_ORDERS_SUBSCRIPTION
  );
  const history = useHistory();
  useEffect(() => {
    if (subscriptionData?.pendingOrders.id) {
      history.push(`/orders/${subscriptionData.pendingOrders.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionData]);

  console.log(data);

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
            ????????? ?????? ??????
          </Link>
          <Link
            to={``}
            className="text-white bg-indigo-600 p-4 hover:bg-indigo-500 transition-colors"
          >
            ???????????? ????????? ??????
          </Link>
        </div>
        <div>
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <p className="text-lg font-light mt-12">
              ?????? ????????? ????????? ????????????. ????????? ??????????????????!
            </p>
          ) : (
            <>
              <div className="grid xl:grid-cols-3 xl:w-full sm:gap-x-2 md:w-full xl:gap-5 mt-20 grid-cols-1 sm:grid-cols-2 gap-x-3 mx-auto w-full">
                {data?.myRestaurant.restaurant?.menu.map((dish) => (
                  <DishComp
                    key={dish.id}
                    name={dish.name}
                    description={dish.description}
                    price={dish.price}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="mt-32 mb-20">
          <h4 className="text-center text-2xl font-light">?????? ?????? ?????? ??????</h4>
          <div className="max-w-screen-lg mx-auto w-full mt-10">
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={30}
              height={550}
              width={window.innerWidth}
              containerComponent={<VictoryVoronoiContainer />}
            >
              <VictoryLine
                labels={({ datum }) => `${datum.y} ???`}
                labelComponent={
                  <VictoryLabel
                    style={{ fontSize: 20 }}
                    renderInPortal
                    dy={-25}
                  />
                }
                data={data?.myRestaurant.restaurant?.order.slice(3,10).map((order) => ({
                  x: order.createAt,
                  y: order.total,
                }))}
                style={{ data: { strokeWidth: 4 } }}
              />
              <VictoryAxis
                style={{ tickLabels: { fontSize: 18 } }}
                tickFormat={(tick) => new Date(tick).toLocaleDateString("ko")}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    </div>
  );
};
