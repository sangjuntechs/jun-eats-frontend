import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

interface IHeaderUser{
    email: string;
}

const Header:React.FC<IHeaderUser> = ({email}) => {
  return (
    <header className="py-5">
      <div className="w-full mx-auto max-w-screen-2xl flex justify-between items-center px-6 2xl:px-0">
        <div className="flex flex-row">
          <p className="text-3xl">Jun</p>{" "}
          <p className="text-3xl ml-1 text-indigo-600 font-bold">Eats</p>
        </div>
        <div className="flex flex-col justify-center items-center">
        <Link to="/my-profile">
        <FontAwesomeIcon icon={faUser} className="cursor-pointer text-xl hover:text-indigo-600 transition-colors"/>
        </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
