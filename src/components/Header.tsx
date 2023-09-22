import React from "react";
import logoSvg from "../assets/img/pizza-logo.svg";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import { setFilters } from "../Redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { initialState } from "../Redux/slices/filterSlice";
import {
  setSearchValue,
  setDisplayedSearchValue,
} from "../Redux/slices/filterSlice";
import CartButton from "./CartButton";

import { selectCart } from "../Redux/slices/cartSlice";

const Header: React.FC = () => {
  const { items } = useSelector(selectCart);
  const dispatch = useDispatch();
  const location = useLocation();
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
      console.log(localStorage.getItem("cart"));
    }
    isMounted.current = true;
  }, [items]);
  return (
    <div className='header'>
      <div className='container'>
        <Link to='/'>
          <div
            className='header__logo'
            onClick={() => {
              dispatch(setSearchValue(""));
              dispatch(setFilters(initialState));
              dispatch(setDisplayedSearchValue(""));
            }}
          >
            <img width='38' src={logoSvg} alt='Pizza logo' />
            <div>
              <h1>Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        {location.pathname !== "/cart" && <Search />}
        {location.pathname !== "/cart" && <CartButton />}
      </div>
    </div>
  );
};

export default Header;
