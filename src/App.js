import 'regenerator-runtime/runtime';
import React from 'react';
import { isSignedIn } from './utils';
import './global.css';
import SignInView from './views/SignInView';
import LoginLandingView from './views/LoginLandingView';


export default function App() {
  if (!isSignedIn()) {
    return <SignInView />;
  }

  return <LoginLandingView />;


}


