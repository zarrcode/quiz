import type { NextPage } from 'next'
import { buttonProps } from '../interfaces'

const Button: NextPage<buttonProps> = ({text, btnPress, isActive}) => {

  return (
    <div>
      <button className={`mainBtn fontSizeSmall ${isActive && 'activeBtn'}`}
      onClick={() => {btnPress(text)}}
      >{text}</button>
    </div>
  )
}

export default Button
