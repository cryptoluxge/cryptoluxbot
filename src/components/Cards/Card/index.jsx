import { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import Typography from 'components/Typography'

const Index = ({ title, titleBorder, variant, children, ...rest }) => {
  const [cardOpen, setCardOpen] = useState(true)

  return (
    <div className='duration-150 bg-lightCard dark:bg-darkCard rounded-lg shadow-[#101011] border border-lightBorder dark:border-darkBorder drop-shadow-sm dark:drop-shadow-none'>
      <div {...rest}>
        <div>
          {title && (
            <div>
              <div className='duration-150 w-full rounded-t-lg flex items-center justify-between'>
                <div>
                  <Typography className={`text-sm ${title === undefined ? '' : 'px-3 py-2'}`}>{title}</Typography>
                </div>
                <div className={`${variant === undefined ? '' : 'px-3 py-2'}`}>
                  {variant === 'collapsible' ? (
                    <div>{cardOpen ? <IoIosArrowUp onClick={() => setCardOpen(!cardOpen)} className='cursor-pointer text-primary' /> : <IoIosArrowDown onClick={() => setCardOpen(!cardOpen)} className='cursor-pointer text-primary' />}</div>
                  ) : null}
                </div>
              </div>
              {titleBorder && <div className='duration-150 border-[1px] border-b border-lightBorder dark:border-darkBorder'></div>}
            </div>
          )}
        </div>
        {variant === 'collapsible' ? <div>{cardOpen ? <div className='border duration-150 border-lightText dark:border-darkText opacity-10 mb-1'></div> : null}</div> : null}
        {variant === 'collapsible' ? <div>{cardOpen ? <div>{children}</div> : null}</div> : <div>{children}</div>}
      </div>
    </div>
  )
}

export default Index
