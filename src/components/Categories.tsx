import React from "react";
import { setCategoryId } from "../Redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../Redux/slices/filterSlice";

const Categories: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const { categoryId } = useSelector(selectFilter);

  const categories = [
    "Все",
    "Мясные",
    "Вегатерианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className='categories'>
      <ul>
        {categories.map((value, index) => (
          <li
            key={value}
            onClick={() => dispatch(setCategoryId(index.toString()))}
            className={Number(categoryId) === index ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
