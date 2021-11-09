import React from "react";
import { restaurant_restaurant_restaurant_menu_option } from "/Users/sangjun/Documents/jun-eats-frontend/src/__generated__/restaurant";

interface IDishProps {
  name: string;
  price: number;
  description: string;
  isCustomer?: boolean;
  option?: restaurant_restaurant_restaurant_menu_option[] | null;
}

export const DishComp: React.FC<IDishProps> = ({
  description,
  name,
  price,
  isCustomer = false,
  option,
}) => {
  console.log(option)
  return (
    <div className="flex flex-col p-7 border border-gray-300 hover:border-gray-600 cursor-pointer mb-14 justify-center">
      <p className="font-medium text-xl">{name}</p>
      <p className="text-sm text-gray-600 font-light">{description}</p>
      <p className="mt-6 font-mono">{price} 원</p>
      {isCustomer && option?.length !== 0 && <div>
        <p className='mt-5 font-medium'>음식 옵션</p>
        {option?.map((opt, index) => {
        return (
          <>
          <span className='text-gray-500 mr-2 flex items-center mt-1' key={index}>
            <p className='mr-2'>{opt.name}</p>
            <p className='text-xs'>+{opt.extra}원</p>
            </span>
          </>
        )
      })}</div>}
    </div>
  );
};
