import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/slices/filterSlice";


const Categories: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const categoryID = useSelector((state: any) => state.filter.category);
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                dispatch(setCategory(index));
              }}
              className={categoryID === index ? "active" : ""}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;
