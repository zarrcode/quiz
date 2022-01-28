export interface textProp {
  text:string
}

export interface buttonProps {
  text:string;
  btnPress:(x:string) => void; // makes the button 'isActive' state
  isActive:boolean;
}

export interface optionProps {
  text: string;
  buttons: string[];
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