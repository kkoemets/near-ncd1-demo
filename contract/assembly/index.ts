import { context, Context, logging, storage, u128 } from 'near-sdk-as';

/**
 * == PUBLIC METHODS ==========================================================
 *
 * The contract's public API.
 */
import { MEME_KEY, MIN_ACCOUNT_BALANCE } from './utils';
import { Nft } from './models';

/**
 * Initialize NFC with basic metadata
 *
 * @param title the name of the meme
 * @param data the data containing some unique identifier of the meme used for rendering
 * @param category the category of the meme
 */
export function init(title: string, data: string): void {
  // contract may only be initialized once
  assert(!is_initialized(), 'Contract is already initialized.');

  // storing meme metadata requires some storage staking (balance locked to offset cost of data storage)
  assert(
    u128.ge(context.attachedDeposit, MIN_ACCOUNT_BALANCE),
    'Minimum account balance must be attached to initialize this contract (3 NEAR), use --amount 3',
  );

  // title has to be at least 1 character
  assert(title.length > 0, 'Meme title may not be blank');

  // create the meme using incoming metadata
  Nft.create(title, data);
}


/**
 * Track whether or not the meme has been initialized.
 */
function is_initialized(): bool {
  return storage.hasKey(MEME_KEY);
}


/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

const DEFAULT_MESSAGE = 'Hi';

// Exported functions will be part of the public interface for your smart contract.
// Feel free to extract behavior to non-exported functions!
export function getGreeting(accountId: string): string | null {
  // This uses raw `storage.get`, a low-level way to interact with on-chain
  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
  return storage.get<string>(accountId, DEFAULT_MESSAGE);
}

export function setGreeting(message: string): void {
  const accountId = Context.sender;
  // Use logging.log to record logs permanently to the blockchain!
  logging.log(`Saving greeting "${message}" for account "${accountId}"`);
  storage.set(accountId, message);
}

export function saveNft(imgData: string): void {
  const accountId = Context.sender;
  storage.set(accountId, imgData);
}

export function getNft(accountId: string): string | null {
  // This uses raw `storage.get`, a low-level way to interact with on-chain
  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
  return storage.get<string | null>(accountId);
}
