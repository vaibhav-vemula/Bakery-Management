import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./redux/ducks/product";

const ItemCard = (props) => {
  const dispatch = useDispatch();
  const [indcount, setIndCount] = useState(props.countt);
  const cid = useSelector((state) => state.tables.customerID);
  
  const inc = () => {
    if (cid === null) {
      alert("Enter your details before proceeding");
    } else {
      dispatch(increment(props.data.productID));
      setIndCount(indcount + 1);
    }
  };
  const dec = () => {
    dispatch(decrement(props.data.productID));
    setIndCount(indcount - 1);
  };
// var ct = props.countt 
  const ress = (ccc) =>{

    // setIndCount(0)
    return true

  }

  return (
    <>
      <div className="popular_meal_box">
        <a href="/">
          <img className="h-28 w-48 rounded-xl" src={props.data.image} alt="" />
        </a>
        <h3>{props.data.pname}</h3>
        <p>{props.data.description}</p>
        <div className="price">Price: &#x20B9; {props.data.price}</div>
        {props.countt === 0 ? (ress(props.countt) && <button onClick={inc}>Add to cart</button>) :(<>
          {indcount === 0 ? (
          <button onClick={inc}>Add to cart</button>
        ) : (
          <div className="relative flex space-x-2 float-right w-12 gap-2 bottom-3 mr-4">
            <button onClick={dec} className="text-3xl">
              -
            </button>
            <p className="text-3xl">{indcount}</p>
            <button onClick={inc} className="text-3xl">
              +
            </button>
          </div>
        )}</>)}
        
      </div>
    </>
  );
};

export default ItemCard;
