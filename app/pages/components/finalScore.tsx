import type { NextPage } from 'next';
import { finalProps } from '../interfaces';
import PlayerCard from './playerCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons'

const FinalScore: NextPage<finalProps> = ({ position, username, score }) => {
  switch (position) {
    case (1): return (
      <div className="firstPlace">
      <PlayerCard self={false} gameState={'final'} isHost={false}
      username={username} score={score} position={'first'} />
      <FontAwesomeIcon className="firstMedal fa-2x" icon={faMedal} />
      </div>
    );
    case (2): return (
      <div className="secondPlace">
      <PlayerCard self={false} gameState={'final'} isHost={false}
       username={username} score={score} position={'second'} />
       <FontAwesomeIcon className="secondMedal fa-2x" icon={faMedal} />
       </div>
    );
    case (3): return (
      <div className="thirdPlace">
      <PlayerCard self={false} gameState={'final'} isHost={false}
       username={username} score={score} position={'third'} />
       <FontAwesomeIcon className="thirdMedal fa-2x" icon={faMedal} />
       </div>
    );
    default: return (
      <PlayerCard self={false} gameState={'final'} isHost={false}
      username={username} score={score} position={'loser'} />
    );
  }
};

export default FinalScore;
