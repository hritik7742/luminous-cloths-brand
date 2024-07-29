import React from 'react';
import styled from 'styled-components';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${'' /* height: 100vh; */}
  background-color: #f8f8f8;
  text-align: center;
  color: #333;
`;

const IconWrapper = styled.div`
  font-size: 5rem;
  color: #ff6b6b;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 20px 0;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 1rem;
  color: white;
  background-color: #ff6b6b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4c4c;
  }
`;

const ProductNotFound = ({ onBack }) => {
  return (
    <NotFoundContainer>
      <IconWrapper>
        <FaExclamationTriangle />
      </IconWrapper>
      <Title>Product Not Found</Title>
      <Message>Our website is currently undergoing updates. The category you selected will be updated soon. Please stay connected with us for the latest updates.</Message>
      <Button onClick={onBack}>Upcoming..</Button>
    </NotFoundContainer>
  );
};

export default ProductNotFound;
