import styled from "styled-components";

export const ProductStyle = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  //padding: 1.5rem;
  margin: 1.2rem;
  transition: transform 0.3s ease;
  border: 0.5px solid #ccc;
  border-radius: 10px;
  overflow: hidden;

  :hover {
    transform: scale(1.05);
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }

  img {
    width: 100%;
    cursor: pointer;
  }

  h2,
  h3 {
    padding: 0.5rem 1rem;
  }
`;
