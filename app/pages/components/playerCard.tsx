/* eslint-disable no-constant-condition */
/* eslint-disable no-param-reassign */
import type { NextPage } from 'next';
import { playerCardProps } from '../interfaces';

const PlayerCard: NextPage<playerCardProps> = ({
  username, answer, score, self, gameState, stateChange, result, isHost,
  position, allAnswered, user,
}) => {
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
      <div className='w-full h-full flex justify-center'>
        { isHost
          ? <div className='playerCard w-[90%] h-[5rem] m-[0.25rem] rounded flex flex-col'>
            <div className={` ${self && 'self'} pc-answers-name h-2/5 w-1/3 ml-4 flex justify-center items-center rounded-t-full font-bold`}>
              <p>{username}</p>
            </div>
            <div className={` ${self && 'self'} pc-answers rounded-2xl h-3/5 flex items-center ${allAnswered ? 'justify-between' : 'justify-end'} px-2`}>
              {allAnswered
                && <div>
                  {result === 'true'
                    ? <label className="container">
                      <input type="checkbox" checked={result === 'true'} onClick={() => { if (stateChange) { stateChange(user); } }}/>
                      <span className="checkmark"></span>
                      </label>
                    : <label className="container">
                        <input type="checkbox" onClick={() => { if (stateChange) { stateChange(user); } }}/>
                        <span className="checkmark"></span>
                      </label>
                  }
                  </div>
                }
              <p>{answer}</p>
            </div>
          </div>
          : <div className='playerCard w-[90%] h-[5rem] m-[0.25rem] rounded flex flex-col'>
            <div className={` ${self && 'self'} pc-answers-name h-2/5 w-1/3 ml-4 flex justify-center items-center rounded-t-full font-bold`}>
              <p>{username}</p>
            </div>
            <div className={` ${self && 'self'} pc-answers rounded-2xl h-3/5 flex items-center ${allAnswered ? 'justify-between' : 'justify-end'} px-2`}>
              {allAnswered
                && <div>
                  {result === 'true'
                    ? <button onClick={() => { if (stateChange) { stateChange(user); } }}>
                    Correct!</button>
                    : <button onClick={() => { if (stateChange) { stateChange(user); } }}>
                    Wrong!</button>
                 }
                  </div>
                }
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
      <div className='playerCard w-[90%] h-[3rem] my-[0.25rem] rounded flex flex-col items-center'>
        <div className={` pc-lobby h-full flex items-center justify-center px-2 winner ${position}`}>
          <div className={`flex items-center justify-between h-full w-[90%] winner ${position}`}>
            <p className="font-bold px-4">{username}</p>
            <p className="font-bold px-4">{score}</p>
          </div>
        </div>
      </div>
    );
    default: return (<div></div>);
  }
};
export default PlayerCard;
