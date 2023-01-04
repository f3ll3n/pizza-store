import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFoundBlock/NotFound";

import "./scss/app.scss";

//№2 lesson: to kartoteka: npm устанавливает плагины, npx устанавливает js программы, запускает их и сразу после отработки удаляет.
function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <Header setSearchValue={setSearchValue} searchValue={searchValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
