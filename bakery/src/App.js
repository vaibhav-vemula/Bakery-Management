import React from "react";
import Navbar from "./Navbar";
import Content from "./Content";
import Footer from "./Footer";

const App = () => {
  return (
    <>
      <div id="container_wrapper_outter">
        <div id="container_wrapper_inner">
          <div id="container">
            <Navbar />
            <Content />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
