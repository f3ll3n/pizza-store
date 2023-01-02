import React, { useState } from 'react'

import styles from './Search.module.scss';

const Search = ({ searchValue, setSearchValue }) => {
     
  return (
    <label className={styles.root}>
        <input value={searchValue} onChange={event => setSearchValue(event.target.value)} className={styles.input} placeholder='Поиск пиццы ...' />
        <img className={styles.icon} src="https://www.svgrepo.com/show/448592/search.svg" alt="Иконка поиска" />
        {searchValue&& (
            <img onClick={() => setSearchValue("")} className={styles.iconClose} src="https://www.svgrepo.com/show/446990/close.svg" alt="Иконка очистки текста"/>
        )}
    </label>
  )
}

export default Search;
