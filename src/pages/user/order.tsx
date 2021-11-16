import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { getOrder, getOrderVariables } from "../../__generated__/getOrder";

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

interface IParams {
  id: string;
}

export const Order = () => {
  const params = useParams<IParams>();
  const { data } = useQuery<getOrder, getOrderVariables>(GET_ORDER, {
    variables: {
      input: {
        id: +params.id,
      },
    },
  });
  console.log(data);

  return (
    <div className="max-w-screen-2xl flex items-center justify-center">
      <div className="flex md:h-4/6 md:w-6/12 border border-gray-400 flex-col mt-32 p-4 mb-32 h-5/6 w-10/12">
        <div className='text-3xl font-semiblod text-indigo-600 text-center p-3'>
          주문을 확인해주세요.
          <p className='text-indigo-600 text-base'>주문번호 {data?.getOrder.order?.id}</p>
        </div>
        <h2 className='text-xl p-2 mt-3'>{data?.getOrder.order?.restaurant?.name} 주문서</h2>
        {data?.getOrder.order?.items.map((item, index) => {
          return (
            <div className='flex mt-5 flex-col border-b p-2'>
              <h2 className='text-2xl font-serif font-semibold flex p-2'>#{index + 1}</h2>
              <h3>{item.dish.name}</h3>
              <h3 className='text-sm'>{item.dish.price} 원</h3>
            </div>
          );
        })}
        <p className='text-indigo-600 p-2 text-base font-semibold mt-3'>배달원 연락처 : {data?.getOrder.order?.driver?.email ? data?.getOrder.order?.driver?.email :"아직 배정되지 않았습니다."}</p>
        <p className='text-indigo-600 p-2 pt-0 text-base font-semibold'>배달 상태 : {data?.getOrder.order?.status}</p>
        <h3 className="text-2xl font-serif mt-5 text-right p-2 pb-0">총 주문금액 {data?.getOrder.order?.total}원</h3>
        <p className='text-right text-sm'>(추가 옵션가격이 추가된 가격입니다.)</p>
      </div>
    </div>
  );
};
