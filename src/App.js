import 'regenerator-runtime/runtime';
import React from 'react';
import { isSignedIn } from './utils';
import './global.css';
import SignInView from './views/SignInView';
import LoginLandingViewV2 from './views/LoginLandingViewV2';


export default function App() {
  if (!isSignedIn()) {
    return <SignInView />;
  }

  return <LoginLandingViewV2 />;
}


