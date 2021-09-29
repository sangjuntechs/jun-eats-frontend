import React from "react";
import { isLoggedInVar } from "../apollo";

export const LoggedInRouter = () => {
  const onClick = () => {
    isLoggedInVar(false);
  };

  return (
    <div>
      <h1>로그인 끝냈다 이제 홈화면 ㄱㄱ 상준아;</h1>
      <button onClick={onClick}>click to logout</button>
    </div>
  );
};
