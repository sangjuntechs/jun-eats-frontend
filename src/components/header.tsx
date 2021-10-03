import React from "react";

const Header = () => {
  return (
    <header className="py-5">
      <div className="w-full mx-auto max-w-screen-2xl">
      <div className="flex flex-row">
          <p className="text-3xl">Jun</p>{" "}
          <p className="text-3xl ml-1 text-indigo-600 font-bold">Eats</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
