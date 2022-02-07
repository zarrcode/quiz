/* eslint-disable no-fallthrough */
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
import MultipleAnswers from './components/multipleAnswers';
import FinalScore from './components/finalScore';

const Quiz: NextPage = () => {
  const mockUsers = [{ username: 'steve', answer: 'wrong answer', score: 0 },
    { username: 'R', answer: 'correct answer', score: 5 },
    { username: 'bob', answer: 'steve sucks', score: 2 }];

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
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isHost, setIsHost] = useState(false);
  const [question, setQuestion] = useState('Is this the question?');
  const [answer, setAnswer] = useState('');
  const [allAnswers, setAllAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [allAnswered, setAllAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isMCQ, setIsMCQ] = useState(false);

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
      // refreshStates();
    });

    // custom disconnect handler
    socket.on('disconnect_custom', (reason) => {
      alert(reason);
      socket.disconnect();

      // refreshStates();
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

    socket.on('game_data', (gameData) => {
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
      const qna = questionsAndAnswers;
      setCorrectAnswers([]);
      setQuestion(qna.currentQuestion);
      setCorrectAnswer(qna.correctAnswer);
      if (qna.incorrectAnswer1) {
        setIsMCQ(true);
        setAllAnswers(
          [qna.incorrectAnswer1, qna.incorrectAnswer2,
            qna.incorrectAnswer3, qna.correctAnswer].sort(),
        );
      }
      setGameState('question');
    });

    socket.on('answer_list', (answerList, isAllAnswered) => {
      setUsers(answerList);
      // setAllAnswered(isAllAnswered);
      if (isAllAnswered) setGameState('answers');
    });

    socket.on('scoreboard', (scoreboard, isGameOver) => {
      setUsers(scoreboard);
      setGameState('scoreboard');
      setGameOver(isGameOver);
    });

    // on unmount, remove socket event listeners and disconnect socket
    return () => {
      if (socket.connected) socket.disconnect();
    };
  }, []);

  function sioCreateGame() {
    socket.auth = { username };
    socket.connect();
    let type = 'not multiple';
    if (multipleChoice === 'Yes') { type = 'multiple'; }
    const diff = difficulty.toLowerCase();
    const options = {
      title,
      username,
      difficulty: diff,
      categories,
      type,
      questions: numberOfQuestions,
    };
    socket.emit('game_create', options);
  }

  function sioJoinGame() {
    socket.auth = { username };
    socket.connect();
    socket.emit('game_join', quizCode);
  }

  function sioRetrieveQuestion() {
    socket.emit('retrieve_question', quizCode);
  }

  function sioSubmitAnswer() {
    socket.emit('submit_answer', quizCode, answer, username);
  }

  function sioCorrectAnswers() {
    socket.emit('correct_answers', quizCode, correctAnswers);
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
          gameState={gameState} self={user.username === username} isHost={isHost} />)}
          {isHost && <div className="py-4"><Button text="start game" btnPress={() => { sioRetrieveQuestion(); }} isActive={false} /></div>}
          <button onClick={() => { setGameState('final'); }} > send to final</button>
        </div>
      );

      case ('question'): return (
        <div>
          {isMCQ
            ? <div className="wrapper flex flex-col items-center h-screen">
            <h1 className="fontSizeLarge py-4">{title}</h1>
            <h2 className="fontSizeLarge py-4">{quizCode}</h2>
            <MultipleAnswers text={question} buttons={allAnswers} active={setAnswer} />
            <button className="mainBtn my-4" onClick={() => { sioSubmitAnswer(); }} >Submit Answer</button>
          </div>
            : <div className="wrapper flex flex-col items-center">
              <h1 className="fontSizeLarge py-4">{title}</h1>
              <h2 className="fontSizeLarge py-4">{quizCode}</h2>
              <p className="fontSizeMedium">{question}</p>
              <input type="text" placeholder="Answer ..." className="questionInput fontSizeSmall mt-6" onChange={(e) => { setAnswer(e.target.value); }}/>
              <button className="mainBtn my-4" onClick={() => { sioSubmitAnswer(); }} >Submit Answer</button>
            </div>
          }
        </div>
      );

      // case ('answers'): return ( // FIXME: do another state for having answered early
      //   <div>
      //     { isHost
      //       ? <div className="wrapper flex flex-col items-center">
      //       <h2 className="fontSizeLarge py-4">{quizCode}</h2>
      //       <h3>Answer: {correctAnswer}</h3>
      //       {users.map((user) => <PlayerCard key={user.username} username={user.username}
      //         gameState={gameState} answer={user.answer} self={user.username === username}
      //         stateChange={changeCorrectAnswers} result={user.result}
      //         correct={correctAnswers.includes(user.username)} isHost={isHost}
      //          />)}
      //       <div className="py-6"><Button text="go to scoreboard" btnPress={() => { sioCorrectAnswers(); }} isActive={false} /></div>
      //     </div>
      //       : <div className="wrapper flex flex-col items-center">
      //       <h2 className="fontSizeLarge py-4">{quizCode}</h2>
      //       <h3>Answer: {correctAnswer}</h3>
      //       {users.map((user) => <PlayerCard key={user.username} username={user.username}
      //         gameState={gameState} answer={user.answer} self={user.username === username}
      //         result={user.result} isHost={isHost} correct={correctAnswers.includes(user.username)}
      //          />)}
      //     </div>
      //     }
      //   </div>
      // );

      case ('answers'): return ( // FIXME: do another state for having answered early
        <div>
          { !allAnswered }
          { isHost
            ? <div className="wrapper flex flex-col items-center">
            <h2 className="fontSizeLarge py-4">{quizCode}</h2>
            <h3>Answer: {correctAnswer}</h3>
            {users.map((user) => <PlayerCard key={user.username} username={user.username}
              gameState={gameState} answer={user.answer} self={user.username === username}
              stateChange={changeCorrectAnswers} result={user.result}
              correct={correctAnswers.includes(user.username)} isHost={isHost}
               />)}
            <div className="py-6"><Button text="go to scoreboard" btnPress={() => { sioCorrectAnswers(); }} isActive={false} /></div>
          </div>
            : <div className="wrapper flex flex-col items-center">
            <h2 className="fontSizeLarge py-4">{quizCode}</h2>
            <h3>Answer: {correctAnswer}</h3>
            {users.map((user) => <PlayerCard key={user.username} username={user.username}
              gameState={gameState} answer={user.answer} self={user.username === username}
              result={user.result} isHost={isHost} correct={correctAnswers.includes(user.username)}
               />)}
          </div>
          }
        </div>
      );

      case ('scoreboard'): return (
        <div className="wrapper flex flex-col items-center">
          <h2 className="fontSizeLarge py-4">{quizCode}</h2>
          {users.map((user) => <PlayerCard key={user.username} username={user.username}
          gameState={gameState} score={user.score} self={user.username === username}
          isHost={isHost} />)}
          <div className="flex">
            <div className="px-4"><Button text="new question" btnPress={() => { sioRetrieveQuestion(); }} isActive={false} /></div>
            <div className="px-4"><Button text="TO FINAL" btnPress={() => { setGameState('final'); }} isActive={false} /></div>
          </div>
        </div>
      );

      case ('final'): return (
        <div className="wrapper flex flex-col items-center">
          <h2 className="fontSizeLarge py-4">{quizCode}</h2>
         {users.map((user) => <FinalScore key={user.username} username={user.username}
         position={users.indexOf(user) + 1} score={user.score} />)}
          <div className="flex mt-20">
            <div className="px-4"><Button text="new question" btnPress={() => { sioRetrieveQuestion(); }} isActive={false} /></div>
            <div className="px-4"><Button text="TO FINAL" btnPress={() => { setGameState('final'); }} isActive={false} /></div>
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
        ? <div className="wrapper h-screen">
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
            <Categories cats={['General Knowledge', 'Books', 'Films', 'Music', 'Musicals', 'Television', 'Video Games', 'Science', 'Computers', 'Mathematics', 'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Art', 'Celebrities', 'Animals', 'Comics', 'Anime'].sort()} setCats={setCats} />
            <button className="mainBtn activeBtn fontSizeLarge m-8" onClick={() => { sioCreateGame(); setInGame(!inGame); setCreatingQuiz(!creatingQuiz); setGameState('lobby'); }}>Create the Quiz!</button>
          </div>
        </div>
          // JOIN / CREATE QUIZ PAGE
          : <div>
            <Navbar/>
            <div className="py-20 wrapper text-center min-h-screen">
              <div className="flex flex-col items-center gap-5">
                <div className='mb-12'><p className="fontSizeMedium pb-[0.5rem] pt-8">What shall we call you?</p>
                  <input type="text" placeholder="Username ..." className="questionInput fontSizeSmall" onChange={(e) => { setUsername(e.target.value); }}/></div>
                <div><p className="fontSizeMedium pb-[0.25rem]">Create a Quiz</p>
                  <Button text="Create" btnPress={() => { if (username) { setCreatingQuiz(!creatingQuiz); setIsHost(true); } }} isActive={false} /></div>
                <div><p className="fontSizeMedium pb-[0.25rem]"> Or join a Quiz?</p>
                  <div className="flex gapSize"><input type="text" placeholder="Code ..." className="questionInput fontSizeSmall mb-2" onChange={(e) => { e.target.value = e.target.value.toUpperCase(); setQuizCode(e.target.value); }}/>
                    <Button text="Join" btnPress={() => { if (username) { sioJoinGame(); setInGame(!inGame); setGameState('lobby'); } }} isActive={false} /></div></div>
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
