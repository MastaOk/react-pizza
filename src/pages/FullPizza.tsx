import React from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    </div>
  );
};

export default FullPizza;
