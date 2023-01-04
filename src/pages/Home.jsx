import React, { useEffect, useState } from "react";

import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import Pagination from "../components/Pagination/Pagination";

const Home = ({ searchValue }) => {
  //TODO: Filter by category
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const sort = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";
    setIsLoading(true);
    fetch(
      `https://63ab80f2fdc006ba605f873f.mockapi.io/items?${category}&sortBy=${sort}&order=${order}${search}`,
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        setItems(json);
        setIsLoading(false);
      });
  }, [sortType, categoryId, searchValue]);
  const pizzas = items.map((pizzaItem, index) => (
    <PizzaBlock {...pizzaItem} key={index} />
  ));
  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories onSelectCategory={id => setCategoryId(id)} />
        <Sort handleSort={value => setSortType(value)} />
      </div>
      <h2 className="content__title">Все пиццы"</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination />
    </div>
  );
};

export default Home;
