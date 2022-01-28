import type { NextPage } from 'next'
import Button from './button'
import { useEffect, useState } from 'react'
import { optionProps } from '../interfaces';

const Question: NextPage<optionProps> = ({ text, buttons }) => {

  const [ isActive, setIsActive ] = useState("");

  function buttonPress(btnName:string) {
    console.log(btnName)
    setIsActive(btnName)
  }
  return (
    <div className="flex flex-col items-center">
      <p className="text-xl text-white pb-2 pt-4">{text}</p>
      <div className="flex justify-around w-[90vw]">
        {buttons.map((string) => {
            return <Button text={string} btnPress={buttonPress} isActive={isActive===string} key={string}/>
          })}
      </div>
    </div>
  )
}

export default Question
