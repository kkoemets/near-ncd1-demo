import { context, storage } from 'near-sdk-as';
import { AccountId, MEME_KEY, Timestamp } from './utils';

@nearBindgen
export class Nft {
  creator: AccountId = context.predecessor;
  created_at: Timestamp = context.blockTimestamp;

  constructor(
    public title: string,
    public data: string,
  ) {
  }

  // ----------------------------------------------------------------------------
  // Basic functions
  // ----------------------------------------------------------------------------

  static create(title: string, data: string): void {
    // data has to have identifier from valid content provider
    assert(is_valid_meme_data(data), 'Data is not valid, must start with valid 9gag.com URL');

    // save the meme to storage
    const meme = new Nft(title, data);
    this.set(meme);
  }

  static get(): Nft {
    return storage.getSome<Nft>(MEME_KEY);
  }

  static set(meme: Nft): void {
    storage.set(MEME_KEY, meme);
  }
}

/**
 * Handle validation and extraction of meme data
 */
function is_valid_meme_data(data: string): bool {
  return !!data;
}
