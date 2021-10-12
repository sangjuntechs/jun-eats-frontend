import React from 'react'

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
    className={`text-lg font-medium text-white p-3 transition-colors ${
      canClick ? "hover:bg-indigo-700 bg-indigo-600" : "bg-gray-300 pointer-events-none"
    }`}
  >
    {loading ? "Loading.." : actionText}
  </button>
);
