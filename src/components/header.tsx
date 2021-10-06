import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useMe } from "../hooks/useMe";

interface IHeaderUser {
  email: string;
}

const Header: React.FC<IHeaderUser> = ({ email }) => {
  const history = useHistory();
  const { data } = useMe();
  const onClickLogOut = () => {
    isLoggedInVar(false);
    localStorage.setItem(LOCALSTORAGE_TOKEN, "");
    history.push('/');
    window.location.reload();
  };
  return (
    <>
      {!data?.me.verified ? (
        <div className="bg-red-500 p-5 text-white text-xs text-center transition-colors">
          <span>
            아직 이메일 인증이 된 계정이 아닙니다. 이메일 인증을 해주세요!
          </span>
        </div>
      ) : (
        ""
      )}
      <header className="py-6">
        <div className="w-full mx-auto max-w-screen-xl flex justify-between items-center px-6 2xl:px-0">
          <Link to='/'>
          <div className="flex flex-row">
            <p className="text-3xl">Jun</p>
            <p className="text-3xl ml-1 text-indigo-600 font-bold">Eats</p>
          </div>
          </Link>
          <div className="flex justify-center items-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 text-xs mr-5 font-semibold px-4 rounded-md" onClick={onClickLogOut}>로그아웃</button>
            <Link to="/edit-profile">
              <div className="flex flex-col justify-center items-center cursor-pointer text-xl hover:text-indigo-600">
                <FontAwesomeIcon
                  icon={faUser}
                  className="transition-colors mb-1"
                />
                <span className="text-xs transition-colors hidden md:flex">
                  {email}
                </span>
                <span className="text-xs transition-colors hidden md:flex text-green-400">
                  {data?.me.verified ? "메일 인증이 완료된 계정입니다." : ""}
                </span>
              </div>
            </Link>
            
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
