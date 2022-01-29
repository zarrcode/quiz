import type { NextPage } from 'next'
import Navbar from './navbar'
import Option from './components/option'
import Question from './components/question'
import PlayerAnswer from './components/playerAnswer'
import PlayerScore from './components/playerScore'
import Home from './home'
import Link from 'next/link'

const Index: NextPage = () => {

  function getQuestion() {
    return 'Lorem ipsum dolor sit amet?'
  }
  return (
    <div className="h-full min-h-screen w-screen bg">
      <Navbar />
      <div className="py-20">

        <Option text="Difficulty" buttons={['easy', 'medium','hard']}  />

        <Question text={getQuestion()} />

        <PlayerAnswer name="name"  answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, odit dolore. Maiores?" />

        <PlayerScore name="name" score={5} />


        <Link href={{ pathname: "/home", query: { name: "some name" } }} as="/">
        <h1> hi</h1>
        </Link>
      </div>
      {/* <Home /> */}
    </div>
  )
}

export default Index
