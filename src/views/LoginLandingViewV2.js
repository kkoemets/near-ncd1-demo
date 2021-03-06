import React from 'react';
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

const Header = styled.div`
`;

const StyledButton = styled.button`
`;

function LoginLandingViewV2() {
  const { accountId } = window;
  const drawingRef = React.createRef();

  // if (drawingRef.current)
  //   drawingRef.current.dataUrl = 'image/png;base64,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';

  return <>
    <Header>Hi, {accountId}! Here you can draw and create a NFT!</Header>
    <StyledButton onClick={logout}>Logout</StyledButton>
    <StyledButton onClick={() => {
      console.log(JSON.stringify(drawingRef));
      const { current } = drawingRef;
      console.log(current.toDataURL());
    }}>Save to blockchain</StyledButton>
    <Container>
      <Drawing
        ref={drawingRef}
      />
    </Container>
  </>;
}

export default LoginLandingViewV2;
