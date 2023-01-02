import React, { useEffect, useState } from "react";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";

const Home = ({ searchValue }) => {
  //TODO: Filter by category
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  useEffect(() => {
    console.log(categoryId, 'categoryId');
    let sort;
    let order;
    setIsLoading(true);
    if(sortType.sortProperty.includes('-')){
      sort = sortType.sortProperty.replace('-', '');
      order = 'desc';
    }
    else{
      sort = sortType.sortProperty;
      order = 'asc'
    }
    fetch(
      `https://63ab80f2fdc006ba605f873f.mockapi.io/items?${categoryId === 0 ? '' : `&category=${categoryId}`}&sortBy=${sort}&order=${order}`,
    )
    .then(res => {
      return res.json();
    })
    .then(json => {
      setItems(json);
      setIsLoading(false);
    });
  }, [sortType, categoryId])
  // const APIquery = path => {
  //   setIsLoading(true);
  //   !path ? path = "items?sortBy=rating&order=desc" : path = path;
  //   fetch(
  //     `https://63ab80f2fdc006ba605f873f.mockapi.io/${path}`,
  //   )
  //   .then(res => {
  //     return res.json();
  //   })
  //   .then(json => {
  //     setItems(json);
  //     setIsLoading(false);
  //   });
  // };

  useEffect(() => {
    // APIquery();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories onSelectCategory={(id) => setCategoryId(id)}/>
        <Sort handleSort={(value) => setSortType(value)} />
      </div>
      <h2 className="content__title">  {searchValue ? `> ${searchValue}` : "Все пиццы"}</h2>
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
