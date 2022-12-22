import { useStateContext } from "../lib/context";
import {
  Card,
  CardInfo,
  CartStyle,
  CartWrapper,
  Checkout,
  EmptyStyle,
} from "../styles/CartStyle";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { Quantity } from "../styles/ProductDetails";

export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } =
    useStateContext();
  return (
    <CartWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => setShowCart(false)}
    >
      <CartStyle
        initial={{ x: "50%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2> You have more shopping to do &#128540; </h2>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        {cartItems.length >= 1 &&
          cartItems.map((Item) => {
            return (
              <Card
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
                key={Item.Slug}
              >
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
        {cartItems.length >= 1 && (
          <Checkout>
            <h3>Subtotal: {totalPrice} €</h3>
            <button>Purchase</button>
          </Checkout>
        )}
      </CartStyle>
    </CartWrapper>
  );
}
