import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchPizzas } from "../redux/slices/pizzasSlice";
import { setCurrentPage } from "../redux/slices/filterSlice";

import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import Pagination from "../components/Pagination/Pagination";

const Home = () => {
  const dispatch = useDispatch();

  const { currentPage, category, sort, search } = useSelector(
    state => state.filter,
  );

  const { items, status } = useSelector(state => state.pizzas);

  useEffect(() => {
    window.scrollTo(0, 0);
    const sortBy = sort.sortProperty.replace("-", "");
    const orderBy = sort.sortProperty.includes("-") ? "asc" : "desc";
    const categoryBy = category > 0 ? `category=${category}` : "";
    const searchBy = search ? `search=${search}` : "";
    dispatch(
      fetchPizzas({ currentPage, categoryBy, sortBy, orderBy, searchBy}),
    );
  }, [currentPage, category, sort, search, dispatch]);

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
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка :(</h2>
          <p>К сожалению не удалось получить пиццы</p>
        </div>
      ) : (
        //TODO: Refactor this ternary operator for code cleanliness
        <div className="content__items">
          {status === "loading" ? (
            skeletons
          ) : status === "success" && items.length ? (
            pizzas
          ) : (
            <div className="content__not-found">
              <h2>
                Пиццы{" "}
                {search && (
                  <>
                    по запросу <span> "{search}" </span>{" "}
                  </>
                )}
                не найдены
              </h2>
            </div>
          )}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={(number: number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
};

export default Home;
