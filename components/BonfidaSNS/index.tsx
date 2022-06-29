import { FavouriteDomain, NAME_OFFERS_ID } from "@bonfida/name-offers";
import { performReverseLookup } from "@bonfida/spl-name-service";
import { PublicKey, clusterApiUrl, Connection } from "@solana/web3.js";

const findFavoriteDomainName = async (owner: PublicKey) => {
  try {
    const [favKey] = await FavouriteDomain.getKey(
      NAME_OFFERS_ID,
      new PublicKey(owner)
    );

    const connection = new Connection(clusterApiUrl("mainnet-beta"));
    const favourite = await FavouriteDomain.retrieve(connection, favKey);

    const reverse = await performReverseLookup(
      connection,
      favourite.nameAccount
    );

    //return reverse;
    console.log(reverse)
  } catch (err) {
    console.log(err);
  }
};

export default findFavoriteDomainName;