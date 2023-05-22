import React, { useState, useEffect } from 'react'

const SemiCircle = ({ value }) => {
  const [valueNumber, setValueNumber] = useState(0)
  const [color, setColor] = useState('')

  useEffect(() => {
    setValueNumber(value)
    if (value >= 0 && value <= 35) {
      setColor('bg-red-500')
    } else if (value >= 35 && value <= 55) {
      setColor('bg-yellow-500')
    } else if (value >= 55 && value <= 75) {
      setColor('bg-green-300')
    } else if (value >= 75 && value <= 10) {
      setColor('bg-green-500')
    }
  }, [value])

  return (
    <div>
      <div className='w-[200px]'>
        <div className='duration-150 relative h-[100px] bg-lightBorder dark:bg-white overflow-hidden text-center mb-2.5 rounded-[150px_150px_0_0]'>
          <div className={`absolute left-[-200%] w-[400%] h-[400%] ml-[100px] ${color} top-[100px] rotate-[25deg] transition-transform duration-[1s] origin-[top_center]`} style={{ transform: `rotate(${(valueNumber / 100) * 180}deg)` }}></div>
          <div className='duration-150 absolute h-20 bg-lightCard dark:bg-darkCard rounded-[150px_150px_0_0] top-5 inset-x-5'></div>
          <span className='duration-150 absolute w-full text-5xl font-bold left-0 top-2/4 text-lightText dark:text-darkText'>{valueNumber}</span>
        </div>
      </div>
    </div>
  )
}

export default SemiCircle
