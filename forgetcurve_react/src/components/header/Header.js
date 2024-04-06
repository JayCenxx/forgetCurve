import React from "react";
import { FiPlus } from "react-icons/fi";
import { FaLayerGroup } from "react-icons/fa";
import SearchBar from "./SearchBar";
import CollapsibleMenu from "./CollapsibleMenu";
import { buttonStyle } from "../../style/styles";

const Header = () => {
  return (
    <main className="bg-white shadow flex justify-between items-center px-6 py-4">
      <CollapsibleMenu />

      {/* home title  */}
      <section className="flex items-center space-x-3">
        <h1 className="text-xl font-bold text-blue-600">Unitycard</h1>
        {/* ... Other elements like menu or logo */}
      </section>

      {/* button collection , buttons ll be hidden VP<640px, else it ll display*/}
      <section className="px-6 sm:flex hidden items-center justify-start space-x-3  ">
        {/* My Set button */}
        <button className={`${buttonStyle.pill_container} ${buttonStyle.colorRing}`}>
          <FaLayerGroup className="text-lg" />
          <span className={buttonStyle.pill_span}>My Sets</span>
        </button>

        {/* Add Button */}
        <button className={`${buttonStyle.pill_container} ${buttonStyle.colorRing}`}>
          <FiPlus className="text-lg " />
          <span className={buttonStyle.pill_span}>New</span>
        </button>
      </section>

      {/* search bar */}
      <section className="flex-grow px-3 ">
        <SearchBar></SearchBar>
      </section>

      <section className="flex items-center space-x-3">
        {/*Login Button */}
        <button className={`${buttonStyle.round_container} ${buttonStyle.colorRing}`}>
          <span className={`${buttonStyle.round_span}`}>Login</span>
        </button>
      </section>
    </main>
  );
};

export default Header;
