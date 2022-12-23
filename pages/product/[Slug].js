import { useRouter } from "next/router";
import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "../../lib/context";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function ProductDetails() {
  // fetching default qty state
  const { qty, increaseQty, decreaseQty, onAdd, setQty } = useStateContext();

  // reset quantity
  useEffect(() => {
    setQty(1);
  }, []);
  // fetching slug
  const { query } = useRouter();

  // fetching graphQL data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { Slug: query.Slug },
  });
  const { data, fetching, error } = results;

  //check for data coming in

  if (fetching) return <p> Loading ...</p>;
  if (error) return <p> Error {error.message}</p>;

  //extract the data
  const { Title, Description, Image, Price } = data.products.data[0].attributes;

  // Creat Toast
  const notify = () => {
    toast.success(`${Title} added to the cart`, {
      duration: 1500,
      icon: "😊",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };
  return (
    <DetailsStyle>
      <img src={Image.data[0].attributes.formats.medium.url} alt={Title} />
      <ProductInfo>
        <h2>{Title}</h2>
        <p>{Description}</p>
        <h3>Price: €{Price}</h3>
        <Quantity>
          <span>Quantity:</span>
          <button>
            <AiFillMinusCircle onClick={decreaseQty} />
          </button>
          <p>{qty}</p>
          <button>
            <AiFillPlusCircle onClick={increaseQty} />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(data.products.data[0].attributes, qty);
            notify();
          }}
        >
          Add to Cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
