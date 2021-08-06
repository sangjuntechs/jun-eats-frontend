import React from "react";

const LoginPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">로그인</h3>
        <form className="flex flex-col mt-5 px-10">
          <input
            placeholder="email"
            className="bg-gray-100 shadow-inner mb-3 py-3 px-3 rounded-lg focus:outline-none border-2 focus:border-green-500 focus:border-opacity-50"
          />
          <input
            placeholder="password"
            className="bg-gray-100 shadow-inner py-3 px-3 rounded-lg focus:outline-none border-2 focus:border-green-500 focus:border-opacity-50"
          />
          <button className="py-3 px-3 bg-gray-800 text-white mt-3 rounded-md hover:opacity-80">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
