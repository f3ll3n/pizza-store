import React, { useEffect } from "react";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import Pagination from "../components/Pagination/Pagination";
import { fetchPizzas } from "../redux/slices/pizzasSlice";
import { setCurrentPage } from "../redux/slices/filterSlice";

const Home = () => {
  const dispatch = useDispatch();
  //TODO: сделать деструктуризацию
  const currentPage = useSelector(state => state.filter.currentPage);
  const categoryID = useSelector(state => state.filter.category);
  const sortBy = useSelector(state => state.filter.sort);
  const searchValue = useSelector(state => state.filter.search);

  const { items, status } = useSelector(state => state.pizzas);

  useEffect(() => {
    window.scrollTo(0, 0);
    const sort = sortBy.sortProperty.replace("-", "");
    const order = sortBy.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryID > 0 ? `category=${categoryID}` : "";
    const search = searchValue ? `search=${searchValue}` : "";
    dispatch(fetchPizzas({ currentPage, category, sort, order, search }));
  }, [sortBy, categoryID, searchValue, currentPage, dispatch]);

  const pizzas = items.map((pizzaItem, index) => (
    <PizzaBlock {...pizzaItem} key={index} />
  ));

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading" ? skeletons : pizzas}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={number => dispatch(setCurrentPage(number))}
      />
    </div>
  );
};

export default Home;
