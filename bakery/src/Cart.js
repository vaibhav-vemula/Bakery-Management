import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import map from "./images/empty-cart.png";
import { getTable, setCustomer, setOrderIds } from "./redux/ducks/table";
import axios from "axios";
import { setPrevProducts, removeALL } from "./redux/ducks/product";

const Cart = () => {
  const cc = useSelector((state) => state.products);
  const { count, addedItems, total, prevTotal } = cc;

  const [fdata, sendData] = useState({ table: 8 });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTable({ bakeryid: 1 }));
  }, [dispatch]);

  const ttt = useSelector((state) => state.tables.tables);
  const bakeryid = useSelector((state) => state.tables.bakeryid);

  const onchange = (e) => {
    sendData((st) => ({
      ...st,
      [e.target.name]: e.target.value,
      bakeryid,
    }));
  };

  const sub = (e) => {
    e.preventDefault();

    axios.post("http://localhost:9000/tab", fdata).then((response) => {
      dispatch(setCustomer(response.data.api_data.customer_id));
      console.log(response.data.api_data.customer_id);
    });
  };
  const cid = useSelector((state) => state.tables.customerID);
  console.log("cid");
  console.log(cid);

  const itemssss = useSelector((state) => state.products.addedItems);

  const orderItems = () => {
    console.log(itemssss);
    var ttt = {
      table: fdata.table,
      customer_id: cid,
      bakeryid,
      items: itemssss,
    };
    console.log(ttt);
    axios.post("http://localhost:9000/order", ttt).then((response) => {
      dispatch(setOrderIds(response.data.api_data[0].order_id));
      dispatch(setPrevProducts());
      console.log(response.data.api_data[0].order_id);
    });
  };

  const oid = useSelector((state) => state.tables.orderIDs);
  console.log("oiddddddddddddddd");
  console.log(oid);

  const prev = useSelector((state) => state.products.prevItems);
  console.log(prev);

  const endDine = () => {

    var fff = {
      table: fdata.table,
      customer_id: cid,
      bakeryid,
      orderids:oid
    };
    axios.post("http://localhost:9000/tabupdate", fff).then((response) => {
      dispatch(setCustomer(null));
      dispatch(setOrderIds([]));
      dispatch(removeALL())
      // console.log(response.data.api_data.customer_id);
      console.log(response.data.api_data)
    });
  };
  
  return (
    <>
      <div id="side_column">
        <div className="side_column_section">
          {!cid ? (
            <>
              <p className="text-base pb-3">
                Please fill out the following details to proceed with your order
              </p>
              <form onSubmit={sub}>
                <div className="flex justify-center flex-wrap content-center">
                  <h5 className="text-base">
                    Table -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </h5>
                  <div className="relative inline-block w-24 text-gray-700">
                    <select
                      className="w-24 h-6 pl-3 pr-6 placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                      name="table"
                      onChange={onchange}
                    >
                      <option value="na" defaultChecked hidden>
                        --
                      </option>
                      {ttt &&
                        ttt.map((table) => {
                          return (
                            <option key={table} value={table}>
                              Table {table}
                            </option>
                          );
                        })}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <input
                    className="bg-gray-900 w-11/12 h-8 px-3 mb-2 text-base text-gray-700 mt-4 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type="tel"
                    placeholder="Name"
                    name="name"
                    onChange={onchange}
                  />

                  <input
                    className="bg-gray-900 w-11/12 h-8 px-3 mb-2 text-base text-gray-700 mt-1 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type="tel"
                    placeholder="Phone Number"
                    name="phone"
                    onChange={onchange}
                  />

                  <button className="button_01 fr">Submit</button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h4 className="text-xl">Your Cart</h4>
              {count <= 0 && addedItems.length === 0 ? (
                <div>
                  <a href="/">
                    <img src={map} alt="" />
                  </a>
                  <p>
                    Good food is always cooking! Go ahead, order some yummy
                    items from the menu.
                  </p>
                </div>
              ) : (
                <div className="h-full">
                  <div className="h-64">
                    {addedItems.map((item, index) => {
                      return (
                        <div key={index}>
                          <h5 className="text-base">
                            {index + 1}.&nbsp;{item.pname}&nbsp;-&nbsp;
                            {item.quantity}
                          </h5>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-base pb-2 leading-5">
                    Total - {total}
                    <span className="text-xs">*</span> <br />{" "}
                    <span className="text-xs">*Exclusion of taxes</span>{" "}
                  </div>
                  <div className="text-center">
                    <button
                      onClick={orderItems}
                      className="button_02 mr-0 pb-2"
                    >
                      Order Items
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="side_column_bottom"></div>
      </div>
      {prev.length > 0 && (
        <div id="side_column">
          <h4 className="text-xl">Your Orders</h4>
          <div className="h-64">
            {prev.map((item, index) => {
              return (
                <div key={index}>
                  <h5 className="text-base">
                    {index + 1}.&nbsp;{item.pname}&nbsp;-&nbsp;{item.quantity}
                  </h5>
                </div>
              );
            })}
          </div>
          <div className="text-base pb-2 leading-5">
            Total - {prevTotal}
            
          </div>
          <button onClick={endDine} className="button_01 ml-9">
            Bill
          </button>
          <div className="side_column_bottom"></div>
        </div>
      )}

      <div className="cleaner"></div>
    </>
  );
};

export default Cart;
