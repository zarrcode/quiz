/* eslint-disable no-param-reassign */
import type { NextPage } from 'next';
import { playerCardProps } from '../interfaces';

// CHANGE PROP TO INCLUDE 'PAGE' AND RENDER DIFFERENTLY
const PlayerCard: NextPage<playerCardProps> = ({
  username, answer, score, self,
}) => (
    <div className={`playerCard ${self && 'self'}`}>
      <div className={`${self ? 'pc-self' : 'pc-left'} fontSizeSmall`}>
        <h1 className="font-bold">{username}</h1>
      </div>
      <div className="pc-right fontSizeSmall">
        <h2>{answer}</h2>
        <h2>{score}</h2>
      </div>
    </div>
);
export default PlayerCard;
