import { useStateContext } from "../lib/context";
import {
  Card,
  CardInfo,
  CartStyle,
  CartWrapper,
  Checkout,
  EmptyStyle,
  Cards,
} from "../styles/CartStyle";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { Quantity } from "../styles/ProductDetails";
import getStripe from "../lib/getStripe";

// Animation variants

const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

const cards = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

//Payments

export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } =
    useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    });
    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };
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
        <Cards layout variants={cards} animate="show" initial="hidden">
          {cartItems.length >= 1 &&
            cartItems.map((Item) => {
              return (
                <Card layout variants={card} key={Item.Slug}>
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
        </Cards>
        {cartItems.length >= 1 && (
          <Checkout layout>
            <h3>Subtotal: €{parseFloat(totalPrice.toFixed(2))}</h3>
            <button onClick={handleCheckout}>Purchase</button>
          </Checkout>
        )}
      </CartStyle>
    </CartWrapper>
  );
}
