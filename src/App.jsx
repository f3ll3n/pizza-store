import React from "react";

import Categories from "./components/Categories/Categories";
import Sort from "./components/Sort/Sort";
import Header from "./components/Header/Header";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";

import "./scss/app.scss";
//№2 lesson: to kartoteka: npm устанавливает плагины, npx устанавливает js программы, запускает их и сразу после отработки удаляет.
function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            <PizzaBlock title="Мексиканская" price="500" />
            <PizzaBlock title="Мексиканская" price="500" />
            <PizzaBlock title="Мексиканская" price="500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
