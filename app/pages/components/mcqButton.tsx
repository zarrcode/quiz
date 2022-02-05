import type { NextPage } from 'next';
import { buttonProps } from '../interfaces';

const McqButton: NextPage<buttonProps> = ({ text, btnPress, isActive }) => (
    <div>
      <button className={`mcqBtn fontSizeSmall ${isActive && 'activeBtn'}`}
      onClick={() => { btnPress(text); }}
      >{text}</button>
    </div>
);

export default McqButton;
