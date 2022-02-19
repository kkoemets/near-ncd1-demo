import { VMContext } from 'near-sdk-as';
import * as contract from '../../assembly';

/**
 * == CONFIG VALUES ============================================================
 */
const TITLE = 'usain refrain';
const DATA = 'data64png';
const MUSEUM_ACCOUNT_ID = 'museum'; // TODO: Refactor more match domain

/**
 * == HELPER FUNCTIONS =========================================================
 */
const setPredecessor = (): void => {
  VMContext.setPredecessor_account_id(MUSEUM_ACCOUNT_ID);
};

/**
 * == UNIT TESTS ==============================================================
 */

describe('meme initialization', () => {
  beforeEach(setPredecessor);
  it('requires a minimum balance', () => {
    expect(() => {
      contract.init(TITLE, DATA);
    }).toThrow(
      'Minimum account balance must be attached to initialize this contract (3 NEAR)',
    );
  });
});
