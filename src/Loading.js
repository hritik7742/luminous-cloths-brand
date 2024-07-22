// Loading.js
import React from 'react';
import Logoanimategif from '../src/image/logoanimate.gif'

const Loading = () => {
  return (
    <div style={loadingContainerStyle}>
     
      <img src={Logoanimategif} alt="Loading" style={gifStyle} />
    </div>
  );
};

const loadingContainerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  zIndex: 9999,
};

const logoStyle = {
  width: '200px', // Adjust size as needed
  marginBottom: '20px',
};

const gifStyle = {
  width: '100px', // Adjust size as needed
};

export default Loading;
