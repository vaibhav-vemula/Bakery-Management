import React, { useEffect } from "react";
import ItemCard from "./ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./redux/ducks/product";

const Items = () => {
  // const itemss = useSelector((state) => state.counter.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products.items);
  console.log('jjjjj', products);
  const countt = useSelector((state) =>state.products.count);
  if (products) {
    products.sort(function (a, b) {
      return a.productID - b.productID;
    });
  }

  return (
    <>
      <div id="main_column">
        <div className="section_w590">
          <h2>Menu</h2>
          <div className="section_w590_content">
            <p style={{ fontSize: "17px", lineHeight: "1.5" }}>
              This bakery is home to all time favorites, like Chocolate and
              Blueberry Tarts, Belgium Cheesecake and their signature dish--the
              Red Velvet Pastry. One can sip a cup of Hot Chocolate while
              watching theart of pizza-making in their outdoor arrangements, and
              also take back home a box of delicious home-made chocolates.{" "}
            </p>
            <div className="cleaner_h20"></div>
            <div className="grid grid-cols-3 gap-4">
              {products &&
                products.map((data, index) => {
                  return <ItemCard key={index} data={data} countt={countt} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Items;
