import type { NextPage } from 'next';

const CreateQuiz: NextPage = () => (
    <div className="bg min-h-screen h-full w-screen flex flex-col items-center">

      <div className="p-4">
        <label htmlFor="test" className="mainBtn" >This is not a button</label>
        <input type="radio" name="test" id="test" className="hidden" />
      </div>

      <div className="p-4">
        <label htmlFor="test2" className="mainBtn" >Test length</label>
        <input type="radio" name="test" id="test2" className="" />
      </div>

      <div className="p-4">
        <label htmlFor="test3" className="mainBtn" >Test</label>
        <input type="radio" name="test" id="test3" className="" />
      </div>

    </div>
);

export default CreateQuiz;
