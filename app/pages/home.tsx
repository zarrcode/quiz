import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Navbar from './navbar';
import Button from './components/button';
import { getFact } from './api/apiService';
import logo from '../logo/Quiz.jpeg';

const Home: NextPage = () => {
  const [randomFact, setRandomFact] = useState('');
  const [isActive, setIsActive] = useState(false);

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
      <div className="py-12 wrapper text-center h-screen flex flex-col items-center justify-around">
        <div className="relative w-full h-1/2">
          <Image src={logo} alt="quiz logo" layout="fill" objectFit='contain' />
        </div>
        <p className="fontSizeMedium px-4">{randomFact}</p>
        <button className={`mainBtn ${isActive && 'buttonDrop'} `} onClick={() => { getRandomFact(); setIsActive(true); setTimeout(() => { setIsActive(false); }, 1000); }}>Get New Fact!</button>
      </div>
    </div>
  );
};

export default Home;
