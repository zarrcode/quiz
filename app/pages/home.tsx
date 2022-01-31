import type { NextPage } from 'next'
import Navbar from './navbar'
import Button from './components/button'
import { getFact } from './api/apiService'
import { useEffect, useState } from 'react'

const Home: NextPage= () => {
  const [ randomFact, setRandomFact ] = useState("");

  useEffect(() => {
    getRandomFact()
  }, [])

  // async function getRandomFact() {
  //   let fact = await getFact()
  //   if(fact) {
  //     setRandomFact(fact.data[0].fact)
  //   }
  // }
  function getRandomFact() {
    setRandomFact('some fact :)')
  }

  return (
    <div className="bg min-h-screen h-full w-screen flex flex-col items-center">
      <Navbar />
      <div className="py-32 wrapper text-center h-screen flex flex-col justify-around">
        <p className="fontSizeMedium px-4">{randomFact}</p>
        <p className="fontSizeMedium px-4">{}</p>
        <Button text="Get New Fact!" btnPress={() => {getRandomFact()}} isActive={false} />
      </div>
    </div>
  )
}

export default Home


