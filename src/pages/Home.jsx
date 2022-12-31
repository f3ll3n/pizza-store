import React, { useEffect, useState } from "react";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://63ab80f2fdc006ba605f873f.mockapi.io/items")
      .then(res => {
        return res.json();
      })
      .then(json => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0)
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((pizzaItem, index) => (
              <PizzaBlock {...pizzaItem} key={index} />
            ))}
      </div>
    </div>
  );
};

export default Home;
