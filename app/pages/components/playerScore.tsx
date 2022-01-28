import type { NextPage } from 'next'
import { playerScoreProps } from '../interfaces'

const PlayerScore: NextPage<playerScoreProps> = ({ name, score }) => {

  return (
    <div className="flex justify-center">
      <div className="playerScore">
        <p className="name">{name}</p>
        <p>{score}</p>
      </div>
    </div>
  )
}

export default PlayerScore
