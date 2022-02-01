import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Button from './button';
import { optionProps } from '../interfaces';

const Question: NextPage<optionProps> = ({ text, buttons, active }) => {
  const [isActive, setIsActive] = useState('');

  function buttonPress(btnName:string) {
    active(btnName);
    setIsActive(btnName);
  }

  return (
    <div className="flex flex-col items-center w-full">
      <p className="fontSizeLarge text-white pt-4">{text}</p>
      <div className="grid grid-cols-custom-3 gapSize py-2 w-full">
        {buttons.map((string) => <Button text={string} btnPress={buttonPress}
         isActive={isActive === string} key={string}/>)}
      </div>
    </div>
  );
};

export default Question;
