import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const FullPizza = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    async function fetchPizzaItem() {
      try {
        const { data } = await axios.get(
          `https://63ab80f2fdc006ba605f873f.mockapi.io/items/${id}`,
        );
        setData(data);
        console.log(data);
      } catch (err) {
        console.log("ошибка при получении пиццы " + err);
      }
    }

    fetchPizzaItem();
  }, [id]);

  if (!data) {
    return "загрузка";
  }
  return (
    <div className="pizza-block">
      <img src={data.imageUrl} alt={data.title} />
      <h2>{data.title}</h2>
      <p>{data.description}</p>
    </div>
  );
};

export default FullPizza;
