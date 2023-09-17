import React from "react";
import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setFilters } from "../Redux/slices/filterSlice";
import { fetchPizzas } from "../Redux/slices/pizzaSlice";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import qs from "qs";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const { items, status } = useSelector((state) => state.pizza);
  const { categoryId, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}&` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        category,
        search,
        sortType,
        currentPage,
      })
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === sortType);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sortType,
        categoryId: categoryId,
        currentPage: currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          id={categoryId}
          onClickCategory={(id) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === "error" ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалени, не удалось получить питци, попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className='content__items'>
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination />
    </div>
  );
}

export default Home;
