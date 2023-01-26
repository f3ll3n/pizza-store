import React, { useEffect, useState } from "react";
import FullPizzaSkeleton from "./FullPizzaSkeleton";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./FullPizza.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";

const FullPizza: React.FC =  () => {
  const dispatch = useDispatch()
  const [activeSizeIndex, setActiveSizeIndex] = useState(0);
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);
  //TODO: Применить isError
  const [isError, setIsError] = useState(false);
  const typeNames = ["тонкое", "традиционное"];
  const [currentId, setCurrentId] = useState("");
  const [data, setData] = useState(Object);
  const cartItem: {value: number} = useSelector((state: any) =>
    state.cart.items.find((obj: { id: string; }) => obj.id === currentId),
  );
  const addedValue = cartItem ? cartItem.value : 0;
  //TODO: Вынести в React здесь и в PizzaBlock
  useEffect(() => {
    setCurrentId(`${data.id}_${activeSizeIndex}_${activeTypeIndex}`);
  }, [data, activeTypeIndex, activeSizeIndex]);

  const { id } = useParams();
  useEffect(() => {
    async function fetchPizzaItem() {
      try {
        const { data } = await axios.get(
          `https://63ab80f2fdc006ba605f873f.mockapi.io/items/${id}`,
        );
        setData(data);
      } catch (err) {
        setIsError(true);
      }
    }
    fetchPizzaItem();
  }, [id]);

 
    return (
      <div className={styles.root}>
        <div className={styles.back}>
          <Link to="/" className={styles.closePizza}>{"< "}Вернуться назад </Link>
        </div>
        {
          !data.types && !data.sizes ? (
            <FullPizzaSkeleton />
          ) : (
            <div className={styles.pizzaMain}>
          <div className={styles.pizzaLeft}>
            <img className={styles.pizzaImg} src={data.imageUrl} alt={data.title} />
          </div>
          <div className={styles.pizzaRight}>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <div className="pizza-block__selector">
              <ul>
                {data.types.map((type: number, index: number) => {
                  return (
                    <li
                      className={activeTypeIndex === index ? "active" : ""}
                      onClick={() => {
                        setActiveTypeIndex(index);
                      }}
                      key={index}
                    >
                      {typeNames[type]}
                    </li>
                  );
                })}
              </ul>
              <ul>
                {data.sizes.map((size: any, index: number) => {
                  return (
                    <li
                      className={activeSizeIndex === index ? "active" : ""}
                      onClick={() => {
                        setActiveSizeIndex(index);
                      }}
                      key={index}
                    >
                      {size} см.
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.price}>
            <p className="pizza-block__price">Цена: {Math.round(data.price + (data.price * activeSizeIndex) / 2)} ₽</p>
            <button 
            className="button button--outline button--add"
              onClick={() => {
              dispatch(
                addItem({
                  title: data.title,
                  img: data.imageUrl,
                  price: Math.round(data.price + (data.price * activeSizeIndex) / 2),
                  size: activeSizeIndex,
                  type: activeTypeIndex,
                  value: 1,
                  id: currentId,
                }),
              );
            }} >
               <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить в корзину
            <i>{addedValue}</i>
            </span>
            </button>
            </div>
            
          </div>
        </div>
          )
        }
        
      </div>
    );
};

export default FullPizza;
