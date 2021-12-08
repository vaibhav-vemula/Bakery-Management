import React from "react";
import Cart from "./Cart";
import Items from "./Items";

const Content = () => {
  return (
    <>
      <div id="content_wrapper">
        <div id="content">
          <Items />
          <Cart />
        </div>
        <div className="cleaner"></div>
        <div className="content_bottom"></div>
      </div>
    </>
  );
};

export default Content;
