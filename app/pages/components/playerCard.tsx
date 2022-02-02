import type { NextPage } from 'next';
import { User } from '../interfaces';

// CHANGE PROP TO INCLUDE 'PAGE' AND RENDER DIFFERENTLY
const PlayerCard: NextPage<User> = ({ username, answer, score}) => (
    <div className="playerCard">
      <div className="pc-left">
      <h1>{username}</h1>
      </div>
      <div className="pc-right">
      <h2>{answer}</h2>
      </div>
    </div>
);

export default PlayerCard;
