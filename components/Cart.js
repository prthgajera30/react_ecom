import { useStateContext } from "../lib/context";
import { CartWrapper, CartStyle } from "../styles/CartStyle";

export default function Cart() {
  const { cartItems } = useStateContext();
  return (
    <CartWrapper>
      <CartStyle>
        {cartItems.length < 1 && (
          <div>
            <h1> Shopping Cart</h1>
          </div>
        )}
        {cartItems.length >= 1 &&
          cartItems.map((Item) => {
            return (
              <div>
                <img src="" alt="" />
                <div>
                  <h3>{Item.Title}</h3>
                  <h3>{Item.Price}</h3>
                </div>
              </div>
            );
          })}
      </CartStyle>
    </CartWrapper>
  );
}
