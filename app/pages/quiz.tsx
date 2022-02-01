/* eslint-disable no-unused-vars */
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
  const [creatingQuiz, setCreatingQuiz] = useState(false);
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

  const [username, setUsername] = useState('');
  const [quizCode, setQuizCode] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [multipleChoice, setMultipleChoice] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');

  function changeDifficulty(active:string) {
    setDifficulty(active);
  }
  function changeMultipleChoice(active:string) {
    setDifficulty(active);
  }
  function changeCategory(active:string) {
    setCategory(active);
  }
  console.log(`username: ${username}`);
  console.log(`Quiz Code: ${quizCode}`);
  console.log(`title: ${title}`);

  return (
    <div className="bg min-h-screen h-full w-screen flex flex-col items-center">
      {inGame
      // INGAME
        ? <div className="py-32 wrapper text-center h-screen">
        <p>INGAME</p>
        <Button text="leave game" btnPress={() => { setInGame(!inGame); }} isActive={false} />
      </div>
      // NOT INGAME
        : <div>
        {!inGame && creatingQuiz
          // CREATE QUIZ OPTIONS PAGE
          ? <div>
          <div className="py-4 wrapper text-center min-h-screen h-full">
            <Button text="Back" btnPress={() => { setCreatingQuiz(!creatingQuiz); }} isActive={true} />
            <input type="text" placeholder="Quiz Title ..." className="questionInput fontSizeSmall mt-4" onChange={(e) => { setTitle(e.target.value); }}/>
            <Option text="Difficulty" buttons={['Easy', 'Medium', 'Hard']} active={changeDifficulty} />
            <Option text="Multiple Choice" buttons={['No', 'Yes']} active={changeMultipleChoice} />
            <p className="fontSizeLarge text-white pt-4">Number of Questions (1 - 40) </p>
            <input type="number" placeholder="0" min="1" max="40" className="questionInput fontSizeSmall mt-4" onChange={(e) => { setNumberOfQuestions(e.target.value); }}/>
            <Option text="Category" buttons={['Easy', 'Medium', 'Hard', '4', '5', '6', '7', '8']} active={changeCategory} />
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
          // JOIN / CREATE QUIZ PAGE
          : <div>
            <Navbar/>
            <div className="py-20 wrapper text-center min-h-screen">
              <div className="flex flex-col h-full">
                <div className="flex flex-col items-center gap-5">
                  <p className="fontSizeLarge py-4">USERNAME</p>
                  <input type="text" placeholder="Username ..." className="questionInput fontSizeSmall" onChange={(e) => { setUsername(e.target.value); }}/>
                  <div className="">
                    <p className="fontSizeLarge py-4">JOIN QUIZ</p>
                    <input type="text" placeholder="Code ..." className="questionInput fontSizeSmall mb-2" onChange={(e) => { setQuizCode(e.target.value); }}/>
                    <Button text="Join Quiz" btnPress={() => { setInGame(!inGame); }} isActive={false} />
                  </div>
                  <div className="">
                    <p className="fontSizeLarge py-4">CREATE QUIZ</p>
                    <Button text="Create Quiz" btnPress={() => { setCreatingQuiz(!creatingQuiz); }} isActive={false} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      }
    </div>
  );
};

export default Quiz;
