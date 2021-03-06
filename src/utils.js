import { connect, Contract, keyStores, WalletConnection } from 'near-api-js';
import getConfig from './config';

const nearConfig = getConfig(process.env.NODE_ENV || 'development');

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearConfig));

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near);

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId();

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    // TODO: Here can define methods
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['getGreeting'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['setGreeting'],
  });
}

function reloadPage() {
  return window.location.replace(window.location.origin + window.location.pathname);
}

export function logout() {
  window.walletConnection.signOut();
  reloadPage();
}

export function login() {
  window.walletConnection.requestSignIn(nearConfig.contractName);
}

export function isSignedIn() {
  return window.walletConnection.isSignedIn();
}

export const { networkId } = getConfig(process.env.NODE_ENV || 'development');
