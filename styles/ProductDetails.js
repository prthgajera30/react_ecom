import styled from "styled-components";

export const DetailsStyle = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    width: 40%;
  }
`;

export const ProductInfo = styled.div`
  width: 40%;
  button {
    font-size: 1rem;
    padding: 0.7rem 1rem;
    cursor: pointer;
  }
  h2 {
    padding-bottom: 1rem;
  }
  h3 {
    margin-top: 2rem;
  }
  p {
    font-size: smaller;
  }
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  button {
    background: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
  }
  p {
    width: 1rem;
    text-align: center;
  }
  span {
    color: var(--secondary);
    font-weight: bold;
  }
  svg {
    color: #494949;
  }
`;

export const Buy = styled.button`
  width: 100%;
`;
