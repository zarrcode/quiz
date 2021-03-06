/* eslint-disable no-unused-vars */

import { Dispatch, SetStateAction } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export interface User {
  username: string;
  answer?:string;
  score?: number;
  sessionID?: string;
  result?: string;
}

export interface navbarProps {
  text: string;
  icon:IconDefinition;
  url:string;
}

export interface buttonProps {
  text:string;
  btnPress:(x:string) => void; // makes the button 'isActive' state
  isActive:boolean;
}

export interface optionProps {
  text: string;
  buttons: string[];
  active:(x:string) => void;
}

export interface questionProps {
  text: string;
}

export interface playerAnswerProps {
  name:string;
  answer:string;
}

export interface playerScoreProps {
  name:string;
  score:number;
}

export interface playerCardProps extends User {
  user: User;
  self: boolean;
  gameState: string;
  stateChange?: (obj: User) => void;
  result?: string;
  correct?: boolean;
  isHost: boolean;
  position?: string;
  allAnswered?: boolean;
}

export interface categoriesProps {
  cats: string[];
  setCats: (cats:string[]) => void;
}

export interface finalProps {
  position: number;
  username: string;
  score?: number;
}
