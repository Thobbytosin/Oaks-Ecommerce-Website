import React, { useState, useEffect, useRef } from 'react'
import styles from '../../../styles'
import { gradient, jbl, music } from '../../../constants/images'
import { useNavigate } from 'react-router-dom'

const MusicExperience = () => {
    const navigation = useNavigate()
    const [timerDays, setTimerDays] = useState("00")
    const [timerHours, setTimerHours] = useState("00")
    const [timerMinutes, setTimerMinutes] = useState("00")
    const [timerSeconds, setTimerSeconds] = useState("00")

    const [timerEnd, setTimerEnd] = useState(false);
    
    let interval = useRef();

    const startTimer = () => {
        const countdownDate = new Date("Apr 2, 2024 00:00:00").getTime();
   
        interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2,0);
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2,0);
            const minutes = Math.floor((distance % (1000 * 60 * 60 )) / (1000 * 60)).toString().padStart(2,0);
            const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2,0);

            if (distance < 0) {
                // stop timer
                clearInterval(interval.current)
                setTimerEnd(true)
            } else {
                // update timer
                setTimerDays(days)
                setTimerHours(hours)
                setTimerMinutes(minutes)
                setTimerSeconds(seconds)
            }
             
        }, 1000);
    }
    
    useEffect(() => {
        startTimer()
        return () => {
            clearInterval(interval.current)
        };
    })

  return (
    <div className={`${styles.section} ${styles.margin} ${styles.flexBetween} sm:flex-row flex-col  p-[2rem] relative overflow-hidden bg-gradient`}>
        <div className=' w-full'>
            <div className='  w-full'>
                <p className='text-lightGreen text-[14px] font-poppins font-semibold md:mb-8 sm:mb-4'>Categories</p>
                <h2 className=' max-w-[443px] text-[22px] sm:text-[30px] md:text-[38px] font-inter font-semibold text-primaryWhite leading-[60px] z-20'>Enhance Your Music Experience</h2>

            </div>


            <div>
                { timerEnd 
                    ? <p className=' font-poppins text-semibold text-[30px] my-8 text-primary'>Countdown has expired</p>
                    : (  <div className='flex gap-4 my-8'>
                            <div className=' w-[54px] h-[54px] md:w-[62px] md:h-[62px] rounded-full bg-primaryWhite text-center sm:p-2 p-4 flex flex-col justify-center items-center'>
                                <p className=' font-poppins text-[14px] md:text-[16px] font-semibold text-primaryBlack mb-1'>{timerDays}</p>
                                <p className=' font-poppins text-[9px] md:text-[11px] text-primaryBlack'>Days</p>
                            </div>
                            <div className=' w-[54px] h-[54px] md:w-[62px] md:h-[62px] rounded-full bg-primaryWhite text-center sm:p-2 p-4 flex flex-col justify-center items-center '>
                                <p className=' font-poppins text-[14px] md:text-[16px] font-semibold text-primaryBlack mb-1'>{timerHours}</p>
                                <p className=' font-poppins text-[9px] md:text-[11px] text-primaryBlack'>Hours</p>
                            </div>
                            <div className=' w-[54px] h-[54px] md:w-[62px] md:h-[62px] rounded-full bg-primaryWhite text-center sm:p-2 p-4 flex flex-col justify-center items-center'>
                                <p className=' font-poppins text-[14px] md:text-[16px] font-semibold text-primaryBlack mb-1'>{timerMinutes}</p>
                                <p className=' font-poppins text-[9px] md:text-[11px] text-primaryBlack'>Minutes</p>
                            </div>
                            <div className=' w-[54px] h-[54px] md:w-[62px] md:h-[62px] rounded-full bg-primaryWhite text-center sm:p-2 p-4 flex flex-col justify-center items-center'>
                                <p className=' font-poppins text-[14px] md:text-[16px] font-semibold text-primaryBlack mb-1'>{timerSeconds}</p>
                                <p className=' font-poppins text-[9px] md:text-[11px] text-primaryBlack'>Seconds</p>
                            </div>

                        </div>
                        
                    )
                }
            </div>

            <button onClick={() => navigation(`${timerEnd ? '/products' : '/product/flsh-00-37'}`)} className=' text-primaryWhite bg-lightGreen font-poppins text-[12px] md:text-[16px] text-center px-6 py-2'>
                {timerEnd ? 'Continue Shopping' : 'Buy Now!'}
            </button>
        </div>

        <div className='w-full sm:block mt-[4rem]'>
            <img src={jbl} alt="" className='sm:w-[300px] md:w-[400px] object-cover ' />
        </div> 
    </div>
  )
}

export default MusicExperience