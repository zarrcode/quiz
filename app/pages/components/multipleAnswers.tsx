import type { NextPage } from 'next';
import { useState } from 'react';
import McqButton from './mcqButton';
import { optionProps } from '../interfaces';

const MultipleAnswers: NextPage<optionProps> = ({ text, buttons, active }) => {
  const [isActive, setIsActive] = useState('');
  console.log(buttons);

  function buttonPress(btnName:string) {
    active(btnName);
    setIsActive(btnName);
  }

  return (
    <div className="flex flex-col items-center w-full h-1/2 py-2">
      <p className="fontSizeLarge text-white pt-6">{text}</p>
      <div className="grid grid-cols-2 gapSize pt-2 w-full h-full">
        {buttons.map((string) => <McqButton text={string} btnPress={buttonPress}
         isActive={isActive === string} key={string}/>)}
      </div>
    </div>
  );
};

export default MultipleAnswers;
