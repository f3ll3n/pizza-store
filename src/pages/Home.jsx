import React, { useEffect, useState } from "react";
import axios from "axios";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import Pagination from "../components/Pagination/Pagination";
import { setCurrentPage } from "../redux/slices/filterSlice";
import { addItem } from "../redux/slices/cartSlice";

const Home = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.filter.currentPage);
  const categoryID = useSelector((state) => state.filter.category);
  const sortBy = useSelector(state => state.filter.sort);
  const searchValue = useSelector(state => state.filter.search);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    window.scrollTo(0, 0);
    const sort = sortBy.sortProperty.replace("-", "");
    const order = sortBy.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryID > 0 ? `category=${categoryID}` : "";
    const search = searchValue ? `search=${searchValue}` : "";
    setIsLoading(true); 

    axios
      .get(`https://63ab80f2fdc006ba605f873f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${order}&${search}`)
      .then(response => {
        setItems(response.data);
        setIsLoading(false);
      })

  }, [sortBy, categoryID, searchValue, currentPage]); 

  const pizzas = items.map((pizzaItem, index) => (
    <PizzaBlock {...pizzaItem} key={index} />
  ));

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  //TODO: Hide pagination if backend have < 2 pages
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={(number => dispatch(setCurrentPage(number)))}/>
    </div>
  );
};

export default Home;
