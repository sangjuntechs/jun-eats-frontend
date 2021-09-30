import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <h2>페이지를 찾을 수 없습니다.</h2>
      <h4>유효한 접근이 아닙니다. 처음부터 다시 시도해주십시오. (jun Eats)</h4>
      <Link to='/'>홈으로 돌아가기 &rarr;</Link>
    </div>
  );
};

export default NotFound;
