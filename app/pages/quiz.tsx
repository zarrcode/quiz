import type { NextPage } from 'next'
import Navbar from './navbar'
import { useEffect, useState } from 'react'
import Button from './components/button'
import Option from './components/option'
import CreateQuiz from './components/createQuiz'

const Quiz: NextPage= () => {

  const [ inGame, setInGame ] = useState(false);
  const [ creatingQuiz, setCreateingQuiz ] = useState(false);
  const [ gameState, setGameState ] = useState("");

  const [ username, setUsername ] = useState("");
  const [ quizCode, setQuizCode ] = useState("");
  const [ difficulty, setDifficulty ] = useState("");
  const [ multipleChoice, setMultipleChoice ] = useState("");
  const [ numberOfQuestions, setNumberOfQuestions ] = useState(1);
  const [ title, setTitle ] = useState("");

  function changeDifficulty(active:string) {
    setDifficulty(active)
  }
  function changeMultipleChoice(active:string) {
    setDifficulty(active)
  }
  console.log('username: ' + username)
  console.log('Quiz Code: ' + quizCode)
  console.log('title: ' + title)

  return (
    <div className="bg min-h-screen h-full w-screen flex flex-col items-center">
    {inGame
    ? // INGAME
    <div className="py-32 wrapper text-center h-screen">
      <p>INGAME</p>
      <Button text="leave game" btnPress={() => {setInGame(!inGame)}} isActive={false} />
      {/* {renderGameState()} */}
    </div>
    : // NOT INGAME
    <div>
      {!inGame && creatingQuiz
       ? // CREATE QUIZ OPTIONS PAGE
       <div>
        <div className="py-4 wrapper text-center h-screen">
        <Button text="Back" btnPress={() => {setCreateingQuiz(!creatingQuiz)}} isActive={true} />
        <input type="text" placeholder="Quiz Title ..."  className="questionInput fontSizeSmall mt-4" onChange={(e) =>{setTitle(e.target.value);}}/>
        <Option text="Difficulty" buttons={['Easy','Medium','Hard']} active={changeDifficulty} />
        <Option text="Multiple Choice" buttons={['No','Yes']} active={changeMultipleChoice} />
        <input type="slider" min="1" max="40" className="questionInput fontSizeSmall mt-4" onChange={(e) =>{setNumberOfQuestions(e.target.value);}}/>
        </div>
       </div>
       : // JOIN / CREATE QUIZ PAGE
        <div>
          <Navbar/>
          <div className="py-20 wrapper text-center min-h-screen">
            <div className="flex flex-col h-full">
              <div className="flex flex-col items-center gap-5">
                <p className="fontSizeLarge py-4">USERNAME</p>
                <input type="text" placeholder="Username ..."  className="questionInput fontSizeSmall" onChange={(e) =>{setUsername(e.target.value);}}/>
                <div className="">
                  <p className="fontSizeLarge py-4">JOIN QUIZ</p>
                  <input type="text" placeholder="Code ..."  className="questionInput fontSizeSmall mb-2" onChange={(e) =>{setQuizCode(e.target.value);}}/>
                  <Button text="Join Quiz" btnPress={() => {setInGame(!inGame)}} isActive={false} />
                </div>
                <div className="">
                  <p className="fontSizeLarge py-4">CREATE QUIZ</p>
                  <Button text="Create Quiz" btnPress={() => {setCreateingQuiz(!creatingQuiz)}} isActive={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
    }
    </div>
  )
}

export default Quiz