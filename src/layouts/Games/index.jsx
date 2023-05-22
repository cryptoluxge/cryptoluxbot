import CoinFlip from './CoinFlip'
import RockPaperScissors from './RockPaperScissors'
import CLXTokenFacuet from './CLXToken/Faucet'

const Index = () => {
  return (
    <div>
      <div className='mb-2'>
        <CLXTokenFacuet />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        <CoinFlip />
        <RockPaperScissors />
      </div>
    </div>
  )
}

export default Index
