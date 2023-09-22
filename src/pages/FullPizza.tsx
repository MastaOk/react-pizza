import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: String;
    price: string;
  }>();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://64ffb07218c34dee0cd3e71c.mockapi.io/items/` + id
        );
        setPizza(data);
      } catch (error) {
        alert("такой пицци нету");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <></>;
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <p>описание </p>
      <h4>{pizza.price} ₽</h4>
      <Link to='/' className='button button--outline button--add go-back-btn'>
        <svg
          width='8'
          height='14'
          viewBox='0 0 8 14'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7 13L1 6.93015L6.86175 1'
            stroke='#D3D3D3'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
        </svg>

        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default FullPizza;
