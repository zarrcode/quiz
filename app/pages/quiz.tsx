/* eslint-disable no-unused-vars */
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Navbar from './navbar';
import Button from './components/button';
import Option from './components/option';
import PlayerCard from './components/playerCard';
import { User } from './interfaces';
import { socket } from '../services/socket';

const Quiz: NextPage = () => {
  const [inGame, setInGame] = useState(false);
  const [creatingQuiz, setCreatingQuiz] = useState(false);
  const [username, setUsername] = useState('');
  const [quizCode, setQuizCode] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [multipleChoice, setMultipleChoice] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [gameState, setGameState] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isHost, setIshost] = useState(false);

  useEffect(() => {
    // if session exists, reconnect to server
    const sessionID = localStorage.getItem('sessionID');
    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }

    // for developement purposes
    socket.onAny((event, ...args) => console.log(event, ...args));

    socket.on('connect_error', () => {
      let errorMessage;
      if (inGame) errorMessage = 'lobby has been closed';
      if (username) errorMessage = 'username invalid'; // FIXME: alert shows when disconnecting on the lobby page

      if (errorMessage) alert(errorMessage); // TODO: replace with user-friendly modal
    });

    // custom disconnect handler
    socket.on('disconnect_custom', (reason) => {
      socket.disconnect();

      // reset state
      setInGame(false);
      setCreatingQuiz(false);
      setGameState('');

      alert(reason);
    });

    socket.on('session', (newSessionID) => {
      localStorage.setItem('sessionID', newSessionID);
    });

    socket.on('game_created', (gameID) => {
      setQuizCode(gameID);
    });

    socket.on('users', (newUsers) => {
      console.log(newUsers);
      setUsers((prevUsers) => [
        ...prevUsers,
        ...newUsers,
      ]);
    });

    socket.on('users_join', (newUser) => {
      console.log(newUser);
      setUsers((prevUsers) => [
        ...prevUsers,
        newUser,
      ]);
    });

    // on unmount, remove socket event listeners and disconnect socket
    return () => {
      if (socket.connected) socket.disconnect();
    };
  }, []);

  // console.log('---------------------');
  // console.log(`username: ${username}`);
  // console.log(`quizCode: ${quizCode}`);
  // console.log(`difficulty: ${difficulty}`);
  // console.log(`multipleChoice: ${multipleChoice}`);
  // console.log(`numberOfQuestions: ${numberOfQuestions}`);
  // console.log(`category: ${category}`);
  // console.log(`title: ${title}`);
  // console.log(users);

  function renderGameState() {
    switch (gameState) {
      case ('lobby'): return (
        <div className="wrapper flex flex-col items-center">
          <h1 className="fontSizeLarge py-4">TITLE</h1>
          <h2 className="fontSizeLarge py-4">ABCDE</h2>
          {users.map((user) => <PlayerCard key={user.username} username={user.username}
           answer={user.answer}/>)}
          <Button text="go to question" btnPress={() => { setGameState('question'); }} isActive={false} />
        </div>
      );

      case ('question'): return (
        <div>
          <p>This page is the question page, username: {username} and title: {title}</p>
          <Button text="go to answers" btnPress={() => { setGameState('answers'); }} isActive={false} />
        </div>
      );

      case ('answers'): return (
        <div>
          <p>This page is the answers page! ( i need some answers )</p>
          <Button text="go to scoreboard" btnPress={() => { setGameState('scoreboard'); }} isActive={false} />
        </div>
      );

      case ('scoreboard'): return (
        <div>
          <p>This page is the scoreboard! ( i need some scores )</p>
          <Button text="leave Game" btnPress={() => { setInGame(!inGame); }} isActive={false} />
        </div>
      );

      default: return (<div></div>);
    }
  }

  function sioCreateGame() {
    socket.auth = { username };
    socket.connect();

    const options = {
      username,
      title,
      difficulty,
      category,
      type: multipleChoice,
      questions: numberOfQuestions,
    };
    socket.emit('game_create', options);
  }

  function sioJoinGame() {
    socket.auth = { username };
    socket.connect();
    socket.emit('game_join', quizCode);
  }

  // TODO: hook up to button
  function sioStartGame() {
    // TODO: add check for host flag
    socket.emit('game_start');
  }

  function changeDifficulty(active:string) {
    setDifficulty(active);
  }
  function changeMultipleChoice(active:string) {
    setDifficulty(active);
  }
  function changeCategory(active:string) {
    setCategory(active);
  }
  // console.log(`username: ${username}`);
  // console.log(`Quiz Code: ${quizCode}`);
  // console.log(`title: ${title}`);

  return (
    <div className="bg min-h-screen h-full w-screen flex flex-col items-center">
      {inGame
        // INGAME
        ? <div className="wrapper h-full">
          { renderGameState() }
      </div>
      // NOT INGAME
        : <div>
        {!inGame && creatingQuiz
          // CREATE QUIZ OPTIONS PAGE
          ? <div>
          <div className="py-4 wrapper text-center min-h-screen h-full">
            <Button text="Back" btnPress={() => { setCreatingQuiz(!creatingQuiz); }} isActive={true} />
            <input type="text" placeholder="Quiz Title ..." className="questionInput fontSizeSmall mt-6" onChange={(e) => { setTitle(e.target.value); }}/>
            <Option text="Difficulty" buttons={['Easy', 'Medium', 'Hard']} active={setDifficulty} />
            <Option text="Multiple Choice" buttons={['No', 'Yes']} active={setMultipleChoice} />
            <p className="fontSizeLarge text-white pt-6">Number of Questions (1 - 40) </p>
            <input type="number" placeholder="0" min={1} max={40} className="questionInput fontSizeSmall mt-6" onChange={(e) => { if ((parseInt(e.target.value, 10)) > 40) e.target.value = '40'; setNumberOfQuestions(e.target.value); }}/>
            <Option text="Category" buttons={['Easy', 'Medium', 'Hard', '4', '5', '6', '7', '8']} active={setCategory} />
                <button className="mainBtn activeBtn fontSizeLarge m-8" onClick={() => { sioCreateGame(); setInGame(!inGame); setCreatingQuiz(!creatingQuiz); setGameState('lobby'); }}>Create the Quiz!</button>
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
                      <Button text="Join Quiz" btnPress={() => { sioJoinGame(); setInGame(!inGame); setGameState('lobby'); }} isActive={false} />
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
