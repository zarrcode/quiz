import type { NextPage } from 'next';
import Navbar from './navbar';

const Rules: NextPage = () => (
    <div className="bg min-h-screen h-full w-screen flex flex-col items-center">
      <Navbar />
      <div className="py-20 wrapper text-center h-screen">
        <br/>
        <p className="fontSizeLarge pb-4">Rules: <br/></p>
        <p className="fontSizeMedium">The host creates a lobby following the 'Create the Quiz!' button,
        choosing the Quiz options. <br/>
        This lobby will display the unique Quiz code for that lobby so that others can join. <br/>
        The host can then begin the Quiz.<br/><br/>
        After each question the Host may edit answers being correct or incorrect. <br/>
        After the select number of questions, the winners are shown on the final leaderboard!<br/>
        </p>
        <p className="fontSizeLarge py-4"> Good Luck! </p>
      </div>
    </div>
);

export default Rules;
