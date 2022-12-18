import { useStateContext } from "../lib/context";
import {
  CartWrapper,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
} from "../styles/CartStyle";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { Quantity } from "../styles/ProductDetails";

export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove } = useStateContext();
  return (
    <CartWrapper onClick={() => setShowCart(false)}>
      <CartStyle onClick={(e) => e.stopPropagation()}>
        {cartItems.length < 1 && (
          <EmptyStyle>
            <h1> You have more shopping to do </h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        {cartItems.length >= 1 &&
          cartItems.map((Item) => {
            return (
              <Card key={Item.Slug}>
                <img
                  src={Item.Image.data[0].attributes.formats.thumbnail.url}
                  alt=""
                />
                <CardInfo>
                  <h3>{Item.Title}</h3>
                  <h3>{Item.Price} €</h3>
                  <Quantity>
                    <span>Quantity</span>
                    <button onClick={() => onRemove(Item)}>
                      <AiFillMinusCircle />
                    </button>
                    <p>{Item.quantity}</p>
                    <button onClick={() => onAdd(Item, 1)}>
                      <AiFillPlusCircle />
                    </button>
                  </Quantity>
                </CardInfo>
              </Card>
            );
          })}
      </CartStyle>
    </CartWrapper>
  );
}
