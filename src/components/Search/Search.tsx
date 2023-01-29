import React, {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";

import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { setSearchValue } from "../../redux/slices/filterSlice";

import styles from "./Search.module.scss";

const Search: React.FC = () => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  //TODO: How to do arrow function into the first argument with dispatch scope.
  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 400),
    [],
  );

  const onChangeInput = (event: string) => {
    setValue(event);
    updateSearchValue(event);
  };

  const onClickClear = () => {
    onChangeInput("");
    inputRef.current?.focus();
  };

  return (
    <label className={styles.root}>
      <input
        ref={inputRef}
        value={value}
        onChange={event => onChangeInput(event.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы ..."
      />
      <img
        className={styles.icon}
        src="https://www.svgrepo.com/show/448592/search.svg"
        alt="Иконка поиска"
      />
      {value && (
        <img
          onClick={() => onClickClear()}
          className={styles.iconClose}
          src="https://www.svgrepo.com/show/446990/close.svg"
          alt="Иконка очистки текста"
        />
      )}
    </label>
  );
};

export default Search;
