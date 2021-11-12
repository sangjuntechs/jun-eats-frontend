import React from "react";

interface IDishOptionProps {
  isSelected: boolean;
  isOptionSelected: boolean;
  name: string;
  extra?: number | null;
  dishId: number;
  addOptionToItem: (dishId: number, optionName: string) => void;
  removeOptionFromItem: (dishId: number, optionName: string) => void;
}

export const DishOption: React.FC<IDishOptionProps> = ({
  isOptionSelected,
  isSelected,
  name,
  extra,
  dishId,
  addOptionToItem,
  removeOptionFromItem,
}) => {
  const onClick = () => {
    if(isOptionSelected) {
        removeOptionFromItem(dishId, name)
    } else {
        addOptionToItem(dishId, name)
    }
    
  }
  return (
    <span
      onClick={onClick}
      className={`px-3 py-1 text-white text-sm inline-block mr-2 mt-1  transition-colors items-center ${
        isOptionSelected ? "" : "opacity-60"
      } ${isSelected ? "bg-indigo-600 hover:bg-indigo-500" : "bg-gray-400"}`}
    >
      <p className="mr-2">{name}</p>
      <p className="text-xs">+{extra}원</p>
    </span>
  );
};
