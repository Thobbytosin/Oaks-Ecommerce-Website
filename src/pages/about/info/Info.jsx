import React, { useState } from 'react'
import styles from '../../../styles'
import { info } from '../../../constants'
import CountUp from 'react-countup'

const Info = () => {
    const [bgHover, setBgHover] = useState(false)

  return (
    <div className={`${styles.section} ${styles.padding} ${styles.flexBetween} ss:flex-row ss:flex-wrap md:flex-row md:flex-nowrap flex-col md:gap-5 ss:gap-8 gap-3`}>
        {info.map((item) => (
            <div 
                key={item.id} 
                className=' border border-primaryGray transition-all hover:bg-primary hover:text-primaryWhite rounded-[4px] p-[2rem] flex flex-col items-center md:w-[400px] w-[300px]'
                onMouseOver={(e) => {
                    const image = e.currentTarget.firstChild.firstChild.firstChild
                    const background = e.currentTarget.firstChild.firstChild.className='bg-primaryWhite rounded-full p-3 flex items-center justify-center transition-all'
            
                        return (
                            image.src = item.icon2
                        )
                    
                }}
                onMouseOut={(e) => {
                    const image = e.currentTarget.firstChild.firstChild.firstChild
                    const background = e.currentTarget.firstChild.firstChild.className='bg-primaryBlack rounded-full p-3 flex items-center justify-center transition-all'

                        return (
                            image.src = item.icon

                        )
                        // setBgHover(false)
                    
                }}
            >
                <div className=' w-[80px] bg-primaryGray bg-opacity-80 rounded-full p-2 flex justify-center items-center mb-4 '>
                    <div className={` bg-primaryBlack rounded-full p-3 flex items-center justify-center`}>
                        <img src={item.icon} alt="" />
                    </div>
                </div>
                <h2 className=' font-inter font-bold text-center text-[18px] sm:text-[22px] md:text-[28px] mb-2'><CountUp end={item.count}  decimals={1} duration={5} /> k</h2>
                <p className=' font-poppins text-[10px] md:text-[12px] text-center'>{item.desc}</p>
            </div>
        ))}
    </div>
  )
}

export default Info