import styles from "./Stats.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { IStats } from "../character/Character";

interface Props {
  stats: IStats;
}

const star = <FontAwesomeIcon icon={faStar} className={styles.star} />;

const Stats: React.FC<Props> = ({ stats }: Props) => {
  const renderStars = (value: bigint) => {
    const stars = [];
    for (let i = 0; i < value; i++) {
      stars.push(<span key={`star_${i}`}>{star}</span>);
    }

    return stars;
  };

  return (
    <div className={styles.container}>
      <div>
        <span>Strength </span>
        {renderStars(stats.strength)}
      </div>
      <div>
        <span>Dexterity </span>
        {renderStars(stats.dexterity)}
      </div>
      <div>
        <span>Constitution </span>
        {renderStars(stats.constitution)}
      </div>
      <div>
        <span>Intelligence </span>
        {renderStars(stats.intelligence)}
      </div>
      <div>
        <span>Wisdom </span>
        {renderStars(stats.wisdom)}
      </div>
      <div>
        <span>Charisma </span>
        {renderStars(stats.charisma)}
      </div>
    </div>
  );
};

export default Stats;
