/* eslint-disable no-unused-vars */
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Navbar from './navbar';
import Button from './components/button';
import Option from './components/option';
import PlayerCard from './components/playerCard';
import Categories from './components/categories';
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
  const [categories, setCategories] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [gameState, setGameState] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isHost, setIsHost] = useState(false);
  const [question, setQuestion] = useState('Is this the question?');
  const [answer, setAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [allAnswered, setAllAnswered] = useState(false);

  useEffect(() => {
    // if session exists, reconnect to server
    const sessionID = localStorage.getItem('sessionID');
    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }

    // for developement purposes
    socket.onAny((event, ...args) => console.log(event, ...args));

    socket.on('connect_error', (err) => {
      if (err.message === 'username invalid') {
        alert(err.message); // TODO: replace with user-friendly modal
      } else if (err.message === 'session deleted' && inGame) {
        alert(err.message); // TODO: replace with user-friendly modal
      }
      refreshStates();
    });

    // custom disconnect handler
    socket.on('disconnect_custom', (reason) => {
      alert(reason);
      socket.disconnect();

      refreshStates();
    });

    socket.on('session', (newSessionID) => {
      localStorage.setItem('sessionID', newSessionID);
    });

    socket.on('game_created', (gameID) => {
      setQuizCode(gameID);
    });

    socket.on('game_joined', (newTitle) => {
      setTitle(newTitle);
    });

    socket.on('game_rejoined', (game) => {
      setInGame(true);
      // TODO: add other required state
    });

    socket.on('users', (newUsers) => {
      setUsers((prevUsers) => [
        ...prevUsers,
        ...newUsers,
      ]);
    });

    socket.on('users_join', (newUser) => {
      setUsers((prevUsers) => [
        ...prevUsers,
        newUser,
      ]);
    });

    socket.on('users_leave', (sessionID) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.sessionID !== sessionID));
    });

    socket.on('new_question', (questionsAndAnswers) => {
      setQuestion(questionsAndAnswers.question);
      setCorrectAnswer(questionsAndAnswers.correctAnswer);
      setGameState('question');
    });

    socket.on('answer_list', (answerList, isAllAnswered) => {
      setUsers(answerList);
      setAllAnswered(isAllAnswered);
    });

    // on unmount, remove socket event listeners and disconnect socket
    return () => {
      if (socket.connected) socket.disconnect();
    };
  }, []);

  function sioCreateGame() {
    socket.auth = { username };
    socket.connect();

    const options = {
      username,
      title,
      difficulty,
      categories,
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

  function sioRetrieveQuestion() {
    socket.emit('retrieve_question', quizCode);
  }

  function sioSubmitAnswer() {
    socket.emit('submit_answer', quizCode, answer, username);
  }

  function changeCorrectAnswers(ans:string) {
    if (correctAnswers.includes(ans)) {
      const index = correctAnswers.indexOf(ans);
      setCorrectAnswers([...correctAnswers.slice(0, index), ...correctAnswers.slice(index + 1)]);
    } else {
      setCorrectAnswers([...correctAnswers, ans]);
    }
    console.log(correctAnswers);
  }

  function setCats(cats:string[]) {
    setCategories(cats);
  }

  function refreshStates() {
    setInGame(false); setCreatingQuiz(false); setUsername(''); setQuizCode(''); setDifficulty('');
    setMultipleChoice(''); setNumberOfQuestions(''); setCategories([]); setTitle('');
    setGameState(''); setUsers([]); setIsHost(false); setQuestion(''); setAnswer('');
  }

  function renderGameState() {
    switch (gameState) {
      case ('lobby'): return (
        <div className="wrapper flex flex-col items-center">
          <h1 className="fontSizeLarge py-4">{title}</h1>
          <h2 className="fontSizeLarge py-4">{quizCode}</h2>
          {users.map((user) => <PlayerCard key={user.username} username={user.username}
          gameState={gameState} self={user.username === username} />)}
          <Button text="go to question" btnPress={() => { setGameState('question'); }} isActive={false} />
          {isHost && <Button text="start game" btnPress={() => { sioStartGame(); }} isActive={false} />}
        </div>
      );

      case ('question'): return (
        <div className="wrapper flex flex-col items-center">
          <h1 className="fontSizeLarge py-4">{title}</h1>
          <h2 className="fontSizeLarge py-4">{quizCode}</h2>
          <p className="fontSizeMedium">{question}</p>
          <input type="text" placeholder="Answer ..." className="questionInput fontSizeSmall mt-6" onChange={(e) => { setAnswer(e.target.value); }}/>
          <button className="" onClick={() => { sioSubmitAnswer(); }} >Submit Answer</button>
          <Button text="go to answers" btnPress={() => { setGameState('answers'); }} isActive={false} />
          <p>your answer: {answer}</p>
        </div>
      );

      case ('answers'): return (
        <div>
          { isHost //  FIXME: ishost
            ? <div className="wrapper flex flex-col items-center">
            <h2 className="fontSizeLarge py-4">{quizCode}</h2>
            {users.map((user) => <PlayerCard key={user.username} username={user.username}
              gameState={gameState} answer={user.answer} self={user.username === username}
              stateChange={changeCorrectAnswers} correct={correctAnswers.includes(user.username)}
               />)} {/* FIXME: change this to correct/not */}
            <Button text="go to scoreboard" btnPress={() => { setGameState('scoreboard'); }} isActive={false} />
          </div>
            : <div className="wrapper flex flex-col items-center">
            <h2 className="fontSizeLarge py-4">{quizCode}</h2>
            {users.map((user) => <PlayerCard key={user.username} username={user.username}
              gameState={gameState} answer={user.answer} self={user.username === username}
              correct={correctAnswers.includes(user.username)} />)}
            <Button text="go to scoreboard" btnPress={() => { setGameState('scoreboard'); }} isActive={false} />
          </div>
          }
        </div>
      );

      case ('scoreboard'): return (
        <div className="wrapper flex flex-col items-center">
          <h2 className="fontSizeLarge py-4">{quizCode}</h2>
          {users.map((user) => <PlayerCard key={user.username} username={user.username}
          gameState={gameState} score={user.score} self={user.username === username} />)}
          <div className="flex">
            <Button text="new question" btnPress={() => { sioRetrieveQuestion(); }} isActive={false} />
            <Button text="leave Game" btnPress={() => { refreshStates(); }} isActive={false} />
          </div>
        </div>
      );

      default: return (<div></div>);
    }
  }

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
            <input type="number" placeholder="0" min={1} max={40} className="questionInput fontSizeSmall mt-6" onChange={(e) => { if ((parseInt(e.target.value, 10)) > 40) e.target.value = '40'; if ((parseInt(e.target.value, 10)) < 1) e.target.value = '1'; setNumberOfQuestions((Math.floor(parseInt(e.target.value, 10))).toString()); }}/>
            <Categories cats={['General Knowledge', 'Books', 'Films', 'Music', 'Musicals', 'Television', 'Video Games', 'Science', 'Computers', 'Mathematics', 'Mythology', 'Sports', 'Geogoraphy', 'History', 'Politics', 'Art', 'Celebrities', 'Animals', 'Comics', 'Anime'].sort()} setCats={setCats} />
            <button className="mainBtn activeBtn fontSizeLarge m-8" onClick={() => { sioCreateGame(); setInGame(!inGame); setCreatingQuiz(!creatingQuiz); setGameState('lobby'); }}>Create the Quiz!</button>
          </div>
        </div>
          // JOIN / CREATE QUIZ PAGE
          : <div>
            <Navbar/>
            <div className="py-20 wrapper text-center min-h-screen">
              <div className="flex flex-col items-center gap-5">
                <div className='mb-12'><p className="fontSizeMedium pb-[0.25rem] pt-8">Username</p>
                  <input type="text" placeholder="Username ..." className="questionInput fontSizeSmall" onChange={(e) => { setUsername(e.target.value); }}/></div>
                <div><p className="fontSizeMedium pb-[0.25rem]">Create Quiz</p>
                  <Button text="Create Quiz" btnPress={() => { if (username) { setCreatingQuiz(!creatingQuiz); setIsHost(true); } }} isActive={false} /></div>
                <div><p className="fontSizeMedium pb-[0.25rem]">Join Quiz</p>
                  <div className="flex gapSize"><input type="text" placeholder="Code ..." className="questionInput fontSizeSmall mb-2" onChange={(e) => { setQuizCode(e.target.value); }}/>
                    <Button text="Join Quiz" btnPress={() => { if (username) { sioJoinGame(); setInGame(!inGame); setGameState('lobby'); } }} isActive={false} /></div></div>
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
