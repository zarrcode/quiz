import type { NextPage } from 'next';
import React from 'react';
import { questionProps } from '../interfaces';

const Question: NextPage<questionProps> = ({ text }) => {
  function submitHandler(event:React.ChangeEvent<any>) {
    event.preventDefault();
    console.log(event.target[0].value); // do something with this form input!
  }

  return (
    <div className="flex flex-col items-center">
    <p className="text-xl font-light text-white p-4">{text}</p>
    <form onSubmit={(e) => { submitHandler(e); }} className="flex flex-col gap-5" >
      <input type="text" placeholder="Answer..." className="questionInput" />
      <input type="submit" className="questionSubmit" />
    </form>
  </div>
  );
};

export default Question;
