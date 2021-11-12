import React from "react";
import { restaurant_restaurant_restaurant_menu_option } from "/Users/sangjun/Documents/jun-eats-frontend/src/__generated__/restaurant";

interface IDishProps {
  id?: number;
  name: string;
  price: number;
  description: string;
  isCustomer?: boolean;
  option?: restaurant_restaurant_restaurant_menu_option[] | null;
  orderStart?: boolean;
  addItemToOrder?: (dishId: number) => void;
  isSelected?: boolean;
  removeFromOrder?: (dishId: number) => void;
}

export const DishComp: React.FC<IDishProps> = ({
  id = 0,
  description,
  name,
  price,
  isCustomer = false,
  option,
  orderStart = false,
  addItemToOrder,
  isSelected = false,
  removeFromOrder,
  children:dishOptions,
}) => {
  const onClick = () => {
    if (orderStart) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };
  return (
    <div
      className={`flex flex-col p-7 border-gray-300 ${
        isSelected ? "bg-gray-200 border" : "hover:border-gray-600 border"
      }  cursor-pointer mb-14 justify-center`}
    >
      <p className="font-medium text-xl">
        {name}
      </p>
      <p className="text-sm text-gray-600 font-light">{description}</p>
      <p className="mt-6 font-mono">{price} 원</p>
      {orderStart && (
          <button
            className="px-3 py-1 bg-indigo-600 text-sm font-bold text-white hover:bg-indigo-500 transition-colors w-20 mt-1"
            onClick={onClick}
          >
            {isSelected ? "담기 취소" : "담기"}
          </button>
        )}
      {isCustomer && option?.length !== 0 && (
        <div>
          <p className="mt-5 font-medium">음식 옵션</p>
          {dishOptions}
        </div>
      )}
    </div>
  );
};
