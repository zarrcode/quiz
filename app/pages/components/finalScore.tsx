import type { NextPage } from 'next';
import { finalProps } from '../interfaces';
import PlayerCard from './playerCard';

const FinalScore: NextPage<finalProps> = ({ position, username, score }) => {
  switch (position) {
    case (1): return (
      <PlayerCard self={false} gameState={'final'} isHost={false}
      username={username} score={score} position={'first'} />
    );
    case (2): return (
      <PlayerCard self={false} gameState={'final'} isHost={false}
       username={username} score={score} position={'second'} />
    );
    case (3): return (
      <PlayerCard self={false} gameState={'final'} isHost={false}
       username={username} score={score} position={'third'} />
    );
    default: return (
      <PlayerCard self={false} gameState={'final'} isHost={false}
      username={username} score={score} position={'loser'} />
    );
  }
};

export default FinalScore;
