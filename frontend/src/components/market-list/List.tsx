import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./List.module.scss";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import { ICharacterSolidity } from "../../hooks/useCharacter";

interface Props {
  list: ICharacterSolidity[];
  onClick: (token: number, price: bigint) => Promise<void>;
}
const List: React.FC<Props> = ({ list, onClick }) => {
  return (
    <div className={styles.container}>
      {list.map((character) => (
        <div key={character.name} className={styles.row}>
          <div className={styles.img}>
            <img src={character.portrait}></img>
          </div>
          <div className={styles.name}>{character.name}</div>
          <div
            className={styles.icon}
            onClick={() => onClick(character.tokenId, character.price)}
          >
            <FontAwesomeIcon icon={faDollar} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
