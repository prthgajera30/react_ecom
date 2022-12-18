import {ProductStyle} from "../styles/ProductStyle";

export default function Products({product}){
    const { Title, Price, Image} = product.attributes
    return(
        <ProductStyle>
            <div>
                <img src={process.env.NEXT_PUBLIC_BACKEND_URL+Image.data[0].attributes.formats.small.url}/>
            </div>
            <h2>{Title}</h2>
            <h3>{Price}</h3>
        </ProductStyle>
    )
}
