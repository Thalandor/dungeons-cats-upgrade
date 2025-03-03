import { useNavigate } from "react-router-dom";
import { useKeyPress } from "../hooks/useKeyPress";
import List from "../components/market-list/List";
import styles from "./Market.module.scss";
import { ICharacterSolidity, useCharacter } from "../hooks/useCharacter";
import { useEffect, useState } from "react";
import { useCharacterContext } from "../providers/Character";

const Market = () => {
  const [allCharacters, setAllCharacters] = useState<ICharacterSolidity[]>([]);
  const [ownedCharacters, setOwnedCharacters] = useState<ICharacterSolidity[]>(
    []
  );
  const navigate = useNavigate();
  useKeyPress(() => navigate("/"), ["Escape"]);
  const { getAllCharacters, buyCharacter, abandonCharacter } = useCharacter();
  const { ownedCharacters: ownCharacters } = useCharacterContext();
  useEffect(() => {
    (async () => {
      const characters = await getAllCharacters();
      setAllCharacters(
        characters.filter(
          (c) => !ownCharacters.find((oc) => c.name === oc.name)
        )
      );
      setOwnedCharacters(ownCharacters);
    })();
  }, [getAllCharacters, ownCharacters]);
  const onBuyHandler = async (tokenId: number, price: bigint) => {
    await buyCharacter(tokenId, price);
  };

  const onAbandonHandler = async (tokenId: number) => {
    await abandonCharacter(tokenId);
  };

  return (
    <div className={styles.container}>
      <div>
        Own
        <List list={ownedCharacters} onClick={onAbandonHandler} />
      </div>
      <div>
        Buy
        <List list={allCharacters} onClick={onBuyHandler} />
      </div>
    </div>
  );
};

export default Market;
