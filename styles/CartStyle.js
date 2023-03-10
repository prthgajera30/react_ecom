import styled from "styled-components";

const { motion } = require("framer-motion");

export const CartWrapper = styled(motion.div)`
  position: fixed;
  right: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  top: 0;
`;

export const CartStyle = styled(motion.div)`
  width: 28%;
  background-color: #f1f1f1;
  padding: 1rem 2rem;
  overflow-y: auto;
  position: relative;
`;

export const Card = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
  padding: 2rem;
  margin: 2rem 0;

  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0,
    rgba(60, 64, 67, 0.15) 0 1px 3px 1px;

  img {
    width: 6rem;
    height: 8rem;
  }
`;

export const CardInfo = styled(motion.div)`
  width: 50%;

  div {
    display: flex;
    justify-content: space-between;
  }
  button {
    padding: 0 0.5rem;
  }
`;

export const EmptyStyle = styled(motion.div)`
  position: relative;
  top: 0;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  svg {
    font-size: 10rem;
    color: var(--secondary);
  }

  h1 {
    font-size: 2rem;
    padding: 2rem;
  }
`;

export const Checkout = styled(motion.div)`
  button {
    padding: 0.5rem 0;
    width: 100%;
    margin-top: 2rem;
    cursor: pointer;
  }
`;

export const Cards = styled(motion.div)``;
