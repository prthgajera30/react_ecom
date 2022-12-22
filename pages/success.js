import { useRouter } from "next/router";
import Image from "next/image";
import kitten from "/public/kindpng_6866117.png";
import styled from "styled-components";
import { motion } from "framer-motion";

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    }
  );
  return { props: { order } };
}
export default function Success({ order }) {
  const route = useRouter();
  console.log(order);
  return (
    <Wrapper>
      <Card
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.75 } }}
        initial={{ opacity: 0, scale: 0.75 }}
      >
        <h1>Thank you for your Order!</h1>
        <h2>A confirmation email has been sent to</h2>
        <h2>{order.customer_details.email}</h2>
        <InfoWrapper>
          <Address>
            <h3>Address</h3>
            {Object.entries(order.customer_details.address).map(
              ([key, val]) => (
                <p key={key}>
                  {key} : {val}
                </p>
              )
            )}
          </Address>
          <OrderInfo>
            <h3>Products</h3>
            {order.line_items.data.map((item) => (
              <div key={item.id}>
                <p>Product: {item.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price.unit_amount / 100} €</p>
              </div>
            ))}
          </OrderInfo>
        </InfoWrapper>
        <button onClick={() => route.push("/")}>Continue Shopping...</button>
        <Image src={kitten} alt="Cute_Kitten" width={200} height={300}></Image>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 2rem 5rem;
`;

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 2rem;
  padding: 3rem 3rem;
  h1 {
    color: var(--primary);
    margin-bottom: 1rem;
  }
  h2 {
    color: var(--secondary);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  button {
    background: var(--primary);
    color: white;
    font-weight: 500;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    cursor: pointer;
  }
  img {
    margin-right: 2.5rem;
  }
`;
const Address = styled.div`
  font-size: 1rem;
  width: 100%;
  padding: 0 2rem;
`;
const OrderInfo = styled.div`
  padding: 0 2rem;
  font-size: 1rem;
  width: 100%;
  div {
    padding-bottom: 1rem;
  }
`;
const InfoWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
`;
