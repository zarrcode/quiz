import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Button from './components/button';
import Option from './components/option';
import {
  socket,
  SESSION_ID,
} from '../services/socket';

const Quiz: NextPage = () => {
  const [inGame, setInGame] = useState(false);
  const [creatingQuiz, setCreateingQuiz] = useState(false);
  const [zouInput, setZouInput] = useState(''); // TODO: remove
  // const [gameState, setGameState] = useState('');

  useEffect(() => {
    // if session exists, reconnect to server
    const sessionID = localStorage.getItem(SESSION_ID);
    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }

    // on unmount, disconnect socket
    return () => {
      if (socket.connected) socket.disconnect();
    };
  });

  // handler for Create Lobby button
  const createLobby = (event: any) => {
    // connect socket (first time connection)
    socket.auth = { username: event.target.value };
    socket.connect();

    // TODO: emit create game event
  };

  const handleZouInputChange = (event: any) => {
    setZouInput(event.target.value);
  };

  return (
    <div className="bg min-h-screen h-full w-screen flex flex-col items-center">
      {inGame
        ? (
          // INGAME
          <div className="py-32 wrapper text-center h-screen">
            <p>INGAME</p>
            <Button text="leave game" btnPress={() => { setInGame(!inGame); }} isActive={false} />
            {/* {renderGameState()} */}
          </div>
        )
        : (
            // NOT INGAME
            <div>
              {!inGame && creatingQuiz
                ? (
                    // CREATE QUIZ OPTIONS PAGE
                    <div>
                      <div className="py-8 wrapper text-center h-screen">
                    <Button text="Cancel" btnPress={() => { setCreateingQuiz(!creatingQuiz); }} isActive={false} />
                        <Option text="Difficulty" buttons={['Easy', 'Medium', 'Hard']} />
                        <Option text="Multiple Choice" buttons={['No', 'Yes']} />
                        {/* TODO: switch with real button */}
                        <input value={zouInput} onChange={handleZouInputChange}/>
                        <button onClick={createLobby}>CREATE LOBBY TEMP</button>
                      </div>
                    </div>
                )
                : (
                  // JOIN / CREATE QUIZ PAGE
                  <div>
                    <Navbar />
                    <div className="py-20 wrapper text-center min-h-screen">
                      <div className="flex flex-col h-full">
                        <form onSubmit={() => { }} className="flex flex-col items-center gap-5" >
                          <p className="fontSizeLarge py-4">USERNAME</p>
                          <input type="text" placeholder="Username..." className="questionInput fontSizeSmall" />
                          <div className="py-4">
                            <p className="fontSizeLarge py-4">JOIN QUIZ</p>
                          <Button text="Join Quiz" btnPress={() => { setInGame(!inGame); }} isActive={false} />
                          </div>
                          <div className="py-4">
                            <p className="fontSizeLarge py-4">CREATE QUIZ</p>
                          <Button text="Create Quiz" btnPress={() => { setCreateingQuiz(!creatingQuiz); }} isActive={false} />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
        )
      }
    </div>
  );
};

export default Quiz;
