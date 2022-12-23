import { useRouter } from "next/router";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import styled from "styled-components";

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
console.log(stripe);
export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);
    console.log(session);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });
    return { props: { orders: paymentIntents.data } };
  },
});

export default function Profile({ user, orders }) {
  const route = useRouter();
  return (
    user && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button onClick={() => route.push("/api/auth/logout")}>Logout</button>
        <div>
          {orders.map((order) => (
            <Order>
              <h2>Order Number: {order.id}</h2>
              <h2>{order.amount}</h2>
              <h2>Receipt Email: {user.email}</h2>
            </Order>
          ))}
        </div>
      </div>
    )
  );
}

const Order = styled.div`
  background: white;
  margin: 2rem 0;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`;
