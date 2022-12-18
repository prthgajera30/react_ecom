import { ProductStyle } from "../styles/ProductStyle";

export default function Products({ product }) {
  const { Title, Price, Image } = product.attributes;
  console.log(Image);
  return (
    <ProductStyle>
      <div>
        <img src={Image.data[0].attributes.formats.small.url} />
      </div>
      <h2>{Title} </h2>
      <h3>{Price} €</h3>
    </ProductStyle>
  );
}
