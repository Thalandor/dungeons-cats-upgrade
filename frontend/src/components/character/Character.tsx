import { ICharacterSolidity } from "../../hooks/useCharacter";
import Stats from "../stats/Stats";
import styles from "./Character.module.scss";

export interface IStats {
  strength: bigint;
  dexterity: bigint;
  constitution: bigint;
  intelligence: bigint;
  wisdom: bigint;
  charisma: bigint;
}

interface Props {
  selectedCharacter: ICharacterSolidity;
}

const Character: React.FC<Props> = ({ selectedCharacter }) => {
  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <div>{selectedCharacter.name}</div>
      </div>
      <div className={styles.characterInfo}>
        <div className={styles.skin}>
          <img src={selectedCharacter.skin} />
        </div>
        <div className={styles.stats}>
          <Stats stats={selectedCharacter.stats} />
        </div>
      </div>
    </div>
  );
};

export default Character;
