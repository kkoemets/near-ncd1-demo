import React, { useState } from 'react';
import styled from 'styled-components';
import { logout } from '../utils';
import Drawing from 'react-drawing';

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ffffff;
  padding: 10px;
`;

const Header = styled.div``;

const StyledButton = styled.button``;

function LoginLandingViewV2() {
  const { accountId } = window;
  const [drawingRef, setDrawingRef] = useState(React.createRef());
  const [drawing, setDrawing] = useState(<Drawing ref={drawingRef} />);

  return (
    <>
      <Header>Hi, {accountId}! Here you can draw and create a NFT!</Header>
      <StyledButton onClick={logout}>Logout</StyledButton>
      <StyledButton
        onClick={() => {
          const { current } = drawingRef;
          console.log(current.toDataURL());
        }}
      >
        Save to blockchain
      </StyledButton>
      <StyledButton
        onClick={() => {
          const refObject = React.createRef();
          setDrawingRef(refObject);
          setDrawing(<Drawing key={Date.now().toString()} ref={refObject} />);
        }}
      >
        Reset
      </StyledButton>
      <Container>{drawing}</Container>
    </>
  );
}

export default LoginLandingViewV2;
