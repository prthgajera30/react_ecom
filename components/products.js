import { ProductStyle } from "../styles/ProductStyle";
import Link from "next/link";

export default function Products({ product }) {
  const { Title, Price, Image, Slug } = product.attributes;
  console.log(Image);
  return (
    <ProductStyle>
      <Link href={`product/${Slug}`}>
        <div>
          <img src={Image.data[0].attributes.formats.small.url} alt={Title} />
        </div>
      </Link>
      <h2>{Title} </h2>
      <h3>{Price} €</h3>
    </ProductStyle>
  );
}
