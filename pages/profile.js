import { useRouter } from "next/router";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);
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
      <ProfileWrapper>
        <ProfileHead>
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          <button onClick={() => route.push("/api/auth/logout")}>Logout</button>
        </ProfileHead>
        <br />
        {orders.map((order) => (
          <Order>
            <h3>
              Order Number
              <p> : {order.id}</p>
            </h3>
            <h3>
              Amount
              <p> : {formatMoney(order.amount)}</p>
            </h3>
            <h3>
              Receipt Email
              <p> : {user.email}</p>
            </h3>
          </Order>
        ))}
      </ProfileWrapper>
    )
  );
}

const Order = styled.div`
  background: white;
  margin: 1rem 0;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  border-radius: 1rem;

  p {
    display: inline;
    font-weight: normal;
  }
`;

const ProfileWrapper = styled.div`
  button {
    padding: 0.5rem 3rem;
    margin: 1.5rem 0;
  }
`;

const ProfileHead = styled.div`
  display: flex;
  justify-content: space-between;
`;
