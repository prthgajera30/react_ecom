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

export default function ProductDetails() {
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
  const { Title, Description, Image } = data.products.data[0].attributes;

  return (
    <DetailsStyle>
      <img src={Image.data[0].attributes.formats.medium.url} alt={Title} />
      <ProductInfo>
        <h2>{Title}</h2>
        <p>{Description}</p>
        <Quantity>
          <span>Quantity</span>
          <button>
            <AiFillMinusCircle />
          </button>
          <p>0</p>
          <button>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy>Add to Cart</Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
