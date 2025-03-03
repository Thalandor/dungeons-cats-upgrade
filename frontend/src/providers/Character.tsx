import React, {
  PropsWithChildren,
  useState,
  useEffect,
  useContext,
} from "react";
import { useWeb3Context } from "./Web3";
import { Contract } from "ethers";
import { ContractABI, ContractAddress } from "../config/contract";
import { ICharacterSolidity, useCharacter } from "../hooks/useCharacter";
import { toast } from "react-toastify";

interface OwnedCharactersContextProps {
  ownedCharacters: ICharacterSolidity[];
}

const CharacterContext = React.createContext<OwnedCharactersContextProps>({
  ownedCharacters: [],
});

export const CharacterProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [ownedCharacters, setOwnedCharacters] = useState<ICharacterSolidity[]>(
    []
  );
  const { provider } = useWeb3Context();
  const { getAllCharacters, getOwnedCharacters } = useCharacter();

  useEffect(() => {
    let nftContract: Contract;
    (async () => {
      if (provider) {
        const handleCharacterAbandoned = async (name: string) => {
          setOwnedCharacters((ownedCharacters) => {
            if (ownedCharacters.find((c) => c.name === name)) {
              toast(`${name} has been killed miserably :(`);
              return ownedCharacters.filter((oc) => oc.name !== name);
            } else {
              return ownedCharacters;
            }
          });
        };
        const handleCharacterBought = async (buyer: string, name: string) => {
          const allCharacters = await getAllCharacters();
          if (!ownedCharacters.find((c) => c.name === name)) {
            const newCharacter = allCharacters.find((ac) => ac.name == name);
            if (newCharacter) {
              setOwnedCharacters((ownedCharacters) => {
                if (!ownedCharacters.find((c) => c.name === name)) {
                  const newCharacter = allCharacters.find(
                    (ac) => ac.name == name
                  );
                  if (newCharacter) {
                    toast(`${name} has been added to the party!!`);
                    return [...ownedCharacters, newCharacter];
                  }
                }
                return ownedCharacters;
              });
            }
          }
        };

        nftContract = new Contract(ContractAddress, ContractABI, provider);

        const characters = await getOwnedCharacters();
        setOwnedCharacters(characters);
        nftContract.removeAllListeners();

        nftContract.on("CharacterBought", handleCharacterBought);
        nftContract.on("CharacterAbandoned", handleCharacterAbandoned);
      }
    })();

    return () => {
      nftContract?.off("CharacterBought");
      nftContract?.off("CharacterAbandoned");
    };
  }, []);

  return (
    <CharacterContext.Provider value={{ ownedCharacters }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => useContext(CharacterContext);
