import { u128, VMContext } from 'near-sdk-as';
import * as util from '../utils';
import * as contract from '../../assembly';

/**
 * == CONFIG VALUES ============================================================
 */
const TITLE = 'usain refrain';
const DATA = 'data64png';
const MUSEUM_ACCOUNT_ID = 'museum'; // TODO: Refactor more match domain
const CREATOR_ACCOUNT_ID = 'alice';
const CONTRIBUTOR_ACCOUNT_ID = 'bob';
const ONE_NEAR = u128.from('1000000000000000000000000');
const ATTACHED_DEPOSIT = u128.mul(ONE_NEAR, u128.from(10));

/**
 * == HELPER FUNCTIONS =========================================================
 */
const setPredecessor = (): void => {
  VMContext.setPredecessor_account_id(MUSEUM_ACCOUNT_ID);
};

const useContributorAsPredecessor = (): void => {
  VMContext.setPredecessor_account_id(CONTRIBUTOR_ACCOUNT_ID);
};

const attachMinBalance = (): void => {
  VMContext.setAttached_deposit(util.MIN_ACCOUNT_BALANCE);
};

const doInitialize = (): void => {
  attachMinBalance();
  setPredecessor();
  contract.init(TITLE, DATA);
};

/**
 * == UNIT TESTS ==============================================================
 */

describe('meme initialization', () => {
  beforeEach(setPredecessor);

  it('creates a new meme with proper metadata', () => {
    attachMinBalance();

    contract.init(TITLE, DATA);
    // const m = contract.get_meme()
    //
    // expect(m.title).toBe(TITLE)
    // expect(m.data).toBe(DATA)
    // expect(m.category).toBe(CATEGORY)
    // expect(m.total_donations).toBe(u128.Zero)
    // expect(m.vote_score).toBe(0)
  });

  it('prevents double initialization', () => {
    attachMinBalance();

    contract.init(TITLE, DATA);

    expect(() => {
      contract.init(TITLE, DATA);
    }).toThrow('Contract is already initialized');
  });

  it('requires title not to be blank', () => {
    attachMinBalance();

    expect(() => {
      contract.init('', DATA);
    }).toThrow('Meme title may not be blank');
  });

  it('requires a minimum balance', () => {
    expect(() => {
      contract.init(TITLE, DATA);
    }).toThrow('Minimum account balance must be attached to initialize this contract (3 NEAR)');
  });

});
