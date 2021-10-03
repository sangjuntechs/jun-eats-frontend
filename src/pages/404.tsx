import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <div className="position absolute top-0 bg-white h-screen flex items-center justify-center flex-col w-screen z-10">
      <Helmet>
          <title>404 not found : Jun Eats</title>
      </Helmet>
      <h2 className="text-2xl mb-2 font-semibold">페이지를 찾을 수 없습니다.</h2>
      <h4 className="text-base font-medium mb-5">유효한 접근이 아닙니다. 처음부터 다시 시도하거나 종료하여주십시오.</h4>
      <Link className="hover:underline text-sm text-indigo-600" to='/'>Jun Eats 홈으로 돌아가기 &rarr;</Link>
    </div>
  );
};

export default NotFound;
