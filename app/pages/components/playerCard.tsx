/* eslint-disable no-constant-condition */
/* eslint-disable no-param-reassign */
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { playerCardProps } from '../interfaces';

// CHANGE PROP TO INCLUDE 'PAGE' AND RENDER DIFFERENTLY
const PlayerCard: NextPage<playerCardProps> = ({
  username, answer, score, self, gameState, stateChange, result, correct, isHost,
}) => {
  useEffect(() => {
    if (result && stateChange) { stateChange(username); }
  }, []);
  switch (gameState) {
    case ('lobby'): return (
      <div className='playerCard w-[90%] h-[3rem] m-[0.25rem] rounded flex flex-col'>
        <div className={` ${self && 'self'} pc-lobby h-full flex items-center justify-center px-2`}>
          <div className={` ${self && 'self'} pc-lobby-name flex items-center justify-center h-[101%]`}>
            <p className="font-bold">{username}</p>
          </div>
        </div>
      </div>
    );
    case ('answers'): return (
      <div className='w-full h-full'>
        { isHost
          ? <div className='playerCard w-[90%] h-[5rem] m-[0.25rem] rounded flex flex-col'>
            <div className={` ${self && 'self'} pc-answers-name h-2/5 w-1/3 ml-4 flex justify-center items-center rounded-t-full font-bold`}>
              <p>{username}</p>
            </div>
            <div className={` ${self && 'self'} pc-answers rounded-2xl h-3/5 flex items-center justify-between px-2`}>
              {correct
                ? <button onClick={() => { if (stateChange) { stateChange(username); } }}>
                Correct!</button>
                : <button onClick={() => { if (stateChange) { stateChange(username); } }}>
                Wrong!</button>
              }
              <p>{answer}</p>
            </div>
          </div>
          : <div className='playerCard w-[90%] h-[5rem] m-[0.25rem] rounded flex flex-col'>
            <div className={` ${self && 'self'} pc-answers-name h-2/5 w-1/3 ml-4 flex justify-center items-center rounded-t-full font-bold`}>
              <p>{username}</p>
            </div>
            <div className={` ${self && 'self'} pc-answers rounded-2xl h-3/5 flex items-center justify-end px-2`}>
              <p>{answer}</p>
            </div>
          </div>
        }
      </div>
    );
    case ('scoreboard'): return (
      <div className='playerCard w-[90%] h-[5rem] m-[0.25rem] rounded flex flex-col'>
      <div className={` ${self && 'self'} pc-answers-name h-2/5 w-1/3 ml-4 flex justify-center items-center rounded-t-full font-bold`}>
        <p>{username}</p>
      </div>
      <div className={` ${self && 'self'} pc-answers rounded-2xl h-3/5 flex items-center justify-end px-8 font-bold`}>
        <p>{score}</p>
      </div>
    </div>
    );
    case ('final'): return (
      <div className='playerCard w-[90%] h-[5rem] m-[0.25rem] rounded flex flex-col'>
        <div className={` ${self && 'self'} pc-answers-name h-2/5 w-1/3 ml-4 flex justify-center items-center rounded-t-full font-bold`}>
          <p>{username}</p>
        </div>
        <div className={` ${self && 'self'} pc-answers rounded-2xl h-3/5 flex items-center justify-end px-8 font-bold`}>
          <p>{score}</p>
        </div>
      </div>
    );
    default: return (<div></div>);
  }
};
export default PlayerCard;
