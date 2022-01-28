import type { NextPage } from 'next'
import Navbar from './navbar'
import Option from './components/option'
import Question from './components/question'
import PlayerAnswer from './components/playerAnswer'
import PlayerScore from './components/playerScore'

const Home: NextPage = () => {

  function getQuestion() {
    return 'Lorem ipsum dolor sit amet?'
  }
  return (
    <div className="h-full min-h-screen w-screen bg">
      <Navbar />
      <div className="py-20">

        <Option text="Difficulty" buttons={['easy', 'medium','hard']}  />

        <Question text={getQuestion()} />

        <PlayerAnswer name="player 1"  answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero." />

        <PlayerScore />

      </div>
    </div>
  )
}

export default Home
