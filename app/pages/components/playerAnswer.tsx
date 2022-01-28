import type { NextPage } from 'next'
import { playerAnswerProps } from '../interfaces'

const PlayerAnswer: NextPage<playerAnswerProps> = ({ name, answer }) => {

  return (
    <div className="flex justify-center py-4">
      <div className="playerAnswer">
        <p className="name">{name}</p>
        <p>{answer}</p>
      </div>
    </div>
  )
}

export default PlayerAnswer
