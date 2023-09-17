import React from "react";
import styles from "./Search.module.scss";
import { useContext } from "react";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";

function Search() {
  const [value, setValue] = React.useState("");
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 0),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title />
        <g data-name='Layer 2' id='Layer_2'>
          <path d='M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z' />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder='Поиск пиццы...'
      />
      {value && (
        <svg
          onClick={() => onClickClear()}
          className={styles.clearIcon}
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          viewBox='0 0 24 24'
        >
          <g id='info' />
          <g id='icons'>
            <path
              d='M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z'
              id='exit'
            />
          </g>
        </svg>
      )}
    </div>
  );
}

export default Search;
