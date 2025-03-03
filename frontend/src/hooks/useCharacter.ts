import { useWeb3Context } from "../providers/Web3";
import { ContractABI, ContractAddress } from "../config/contract";
import { IStats } from "../components/character/Character";
import { Contract } from "ethers";
import { useCallback } from "react";

export interface ICharacterSolidity {
  name: string;
  portrait: string;
  skin: string;
  stats: IStats;
  price: bigint;
  tokenId: number;
}

export const useCharacter = () => {
  const { provider, signer, currentAccount } = useWeb3Context();

  const getOwnedCharacters = useCallback(async () => {
    if (provider) {
      const nftContract = new Contract(ContractAddress, ContractABI, provider);
      const characters: ICharacterSolidity[] =
        await nftContract.getOwnedCharacters({ from: currentAccount });
      return characters;
    }
    return [];
  }, [currentAccount, provider]);

  const getAllCharacters = useCallback(async () => {
    if (provider) {
      const nftContract = new Contract(ContractAddress, ContractABI, provider);
      const characters: ICharacterSolidity[] =
        await nftContract.getAllCharacters({ from: currentAccount });
      return characters;
    }
    return [];
  }, [currentAccount, provider]);

  const buyCharacter = useCallback(
    async (tokenId: number, price: bigint) => {
      const nftContract = new Contract(ContractAddress, ContractABI, signer);
      await nftContract.buyCharacter(tokenId, {
        from: currentAccount,
        value: price.toString(),
      });
    },
    [currentAccount, signer]
  );

  const abandonCharacter = useCallback(
    async (tokenId: number) => {
      const nftContract = new Contract(ContractAddress, ContractABI, signer);
      await nftContract.abandonCharacter(tokenId, {
        from: currentAccount,
      });
    },
    [currentAccount, signer]
  );

  return {
    getOwnedCharacters,
    getAllCharacters,
    buyCharacter,
    abandonCharacter,
  };
};
