import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import { editOrder, editOrderVariables } from "../../__generated__/editOrder";
import { getOrder, getOrderVariables } from "../../__generated__/getOrder";
import { OrderStatus } from "../../__generated__/globalTypes";
import { orderUpdates } from "../../__generated__/orderUpdates";

const GET_ORDER = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
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
  }
`;

const ORDER_SUBSCRIPTION = gql`
  subscription orderUpdates($input: OrderUpdatesInput!) {
    orderUpdates(input: $input) {
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

const EDIT_ORDER = gql`
  mutation editOrder($input: EditOrderInput!) {
    editOrder(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

export const Order = () => {
  const params = useParams<IParams>();
  const [editOrderMutation] = useMutation<editOrder, editOrderVariables>(
    EDIT_ORDER
  );
  const { data: userData } = useMe();
  const { data, subscribeToMore } = useQuery<getOrder, getOrderVariables>(
    GET_ORDER,
    {
      variables: {
        input: {
          id: +params.id,
        },
      },
    }
  );

  useEffect(() => {
    if (data?.getOrder.ok) {
      subscribeToMore({
        document: ORDER_SUBSCRIPTION,
        variables: {
          input: {
            id: +params.id,
          },
        },
        updateQuery: (
          prev,
          {
            subscriptionData: { data },
          }: { subscriptionData: { data: orderUpdates } }
        ) => {
          if (!data) return prev;
          return {
            getOrder: {
              ...prev.getOrder,
              order: {
                ...data.orderUpdates,
              },
            },
          };
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onButtonClick = (newStatus: OrderStatus) => {
    editOrderMutation({
      variables: {
        input: {
          id: +params.id,
          status: newStatus,
        },
      },
    });
  };

  return (
    <div className="max-w-screen-2xl flex items-center justify-center">
      <Helmet>
        <title>주문 확인 | Jun Eats</title>
      </Helmet>
      <div className="flex md:h-4/6 md:w-6/12 border border-gray-400 flex-col mt-32 p-4 mb-32 h-5/6 w-10/12">
        <div className="text-3xl font-semiblod text-indigo-600 text-center p-3">
          주문을 확인해주세요.
          <p className="text-indigo-600 text-base">
            주문번호 {data?.getOrder.order?.id}
          </p>
        </div>
        <h2 className="text-xl p-2 mt-3">
          {data?.getOrder.order?.restaurant?.name} 주문서
          {userData?.me.role === "Owner" && " (매장용)"}
        </h2>
        {data?.getOrder.order?.items.map((item, index) => {
          return (
            <div className="flex mt-5 flex-col border-b p-2">
              <h2 className="text-2xl font-serif font-semibold flex p-2">
                #{index + 1}
              </h2>
              <h3>{item.dish.name}</h3>
              <h3 className="text-sm">{item.dish.price} 원</h3>
            </div>
          );
        })}
        <p className="text-indigo-600 p-2 text-base font-semibold mt-3">
          배달원 연락처 :{" "}
          {data?.getOrder.order?.driver?.email
            ? data?.getOrder.order?.driver?.email
            : "아직 배정되지 않았습니다."}
        </p>
        {userData?.me.role === "Client" && (
          <p className="text-indigo-600 p-2 pt-0 text-base font-semibold">
            배달 상태 :{" "}
            {data?.getOrder.order?.status === "Pending"
              ? "주문 확인중"
              : data?.getOrder.order?.status === "Cooking"
              ? "조리 중"
              : data?.getOrder.order?.status === "Cooked"
              ? "조리 완료"
              : data?.getOrder.order?.status === "PickedUp"
              ? "픽업 완료"
              : data?.getOrder.order?.status === "Delivered"
              ? "배달 완료"
              : ""}
          </p>
        )}
        {userData?.me.role === "Delivery" && (
          <p className="text-indigo-600 p-2 pt-0 text-base font-semibold">
            배달 상태 :{" "}
            {data?.getOrder.order?.status === "Pending"
              ? "주문 확인중"
              : data?.getOrder.order?.status === "Cooking"
              ? "조리 중"
              : data?.getOrder.order?.status === "Cooked"
              ? "조리 완료"
              : data?.getOrder.order?.status === "PickedUp"
              ? "픽업 완료"
              : data?.getOrder.order?.status === "Delivered"
              ? "배달 완료"
              : ""}
          </p>
        )}
        {userData?.me.role === "Owner" && (
          <p className="text-indigo-600 p-2 pt-0 text-base font-semibold">
            배달 상태 :{" "}
            {data?.getOrder.order?.status === "PickedUp"
              ? "픽업 완료"
              : data?.getOrder.order?.status === "Delivered"
              ? "배달 완료"
              : ""}
          </p>
        )}
        {userData?.me.role === "Owner" && (
          <>
            {data?.getOrder.order?.status === OrderStatus.Pending && (
              <button
                onClick={() => onButtonClick(OrderStatus.Cooking)}
                className="py-2 px-3 bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors"
              >
                주문 수락
              </button>
            )}
            {data?.getOrder.order?.status === OrderStatus.Cooking && (
              <button
                onClick={() => onButtonClick(OrderStatus.Cooked)}
                className="py-2 px-3 bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors"
              >
                조리완료 알람 보내기
              </button>
            )}
          </>
        )}
        {userData?.me.role === "Delivery" && (
          <>
            {data?.getOrder.order?.status === OrderStatus.Cooked && (
              <button
                onClick={() => onButtonClick(OrderStatus.PickedUp)}
                className="py-2 px-3 bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors"
              >
                픽업 완료
              </button>
            )}
            {data?.getOrder.order?.status === OrderStatus.PickedUp && (
              <button
                onClick={() => onButtonClick(OrderStatus.Delivered)}
                className="py-2 px-3 bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors"
              >
                배달 완료
              </button>
            )}
          </>
        )}
        <h3 className="text-2xl font-serif mt-5 text-right p-2 pb-0">
          총 주문금액 {data?.getOrder.order?.total}원
        </h3>
        <p className="text-right text-sm">
          (추가 옵션가격이 추가된 가격입니다.)
        </p>
      </div>
    </div>
  );
};
