/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    role="button"
    className={`text-lg font-medium text-white p-3 transition-colors ${
      canClick
        ? "hover:bg-indigo-700 bg-indigo-600"
        : "bg-gray-300 pointer-events-none"
    }`}
  >
    {loading ? "잠시만 기다려 주세요.." : actionText}
  </button>
);
