import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Navbar from './navbar';
import Button from './components/button';
import { getFact } from './api/apiService';
import React from 'react';
import logo from '../logo/Quiz.png';

const Home: NextPage = () => {
  const [randomFact, setRandomFact] = useState('');

  async function getRandomFact() {
    const fact = await getFact();
    if (fact) {
      setRandomFact(fact.data[0].fact);
    }
  }

  useEffect(() => {
    getRandomFact();
  }, []);

  return (
    <div className="bg min-h-screen h-full w-screen flex flex-col items-center">
      <Navbar />
      <div className="py-32 wrapper text-center h-screen flex flex-col items-center justify-around">
        <div className="quizLogo">
        <Image src={logo} alt="logo"/>
        </div>
        <p className="fontSizeMedium px-4">{randomFact}</p>
        <p className="fontSizeMedium px-4">{}</p>
        <Button text="Get New Fact!" btnPress={() => { getRandomFact(); }} isActive={false} />
      </div>
    </div>
  );
};

export default Home;
