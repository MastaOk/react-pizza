import React from "react";
import logoSvg from "../assets/img/pizza-logo.svg";
import { Link } from "react-router-dom";
import Search from "./Search";
import { setFilters } from "../Redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { initialState } from "../Redux/slices/filterSlice";
import {
  setSearchValue,
  setDisplayedSearchValue,
} from "../Redux/slices/filterSlice";
import { selectCart } from "../Redux/slices/cartSlice";
import CartButton from "./CartButton";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(selectCart);
  const totalCount = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

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
        <Search />
        <CartButton />
      </div>
    </div>
  );
};

export default Header;
