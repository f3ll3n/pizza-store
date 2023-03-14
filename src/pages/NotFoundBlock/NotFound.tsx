import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>:(</span>
        <br />
        Ничего не найдено
      </h1>
      <p>
        К сожалению данная страница отсутствует в нашем
        интернет&#8288;-&#8288;магазине
      </p>
      <Link to="/" className={styles.button}>
        Перейти на главную
      </Link>
    </div>
  );
};

export default NotFound;
