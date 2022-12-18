import styled from "styled-components";

export const CartWrapper = styled.div`
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

export const CartStyle = styled.div`
  width: 40%;
  background-color: #f1f1f1;
  padding: 2rem 5rem;
  overflow-y: scroll;
  position: relative;
`;
