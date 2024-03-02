import React, { useEffect, useState, useRef} from 'react'
import styles from '../../styles'
import { useDispatch } from 'react-redux'
import { setToEnd } from '../../features/countdownSales/countdownSlice'

const Countdown = () => {
    const [timerDays, setTimerDays] = useState("00")
    const [timerHours, setTimerHours] = useState("00")
    const [timerMinutes, setTimerMinutes] = useState("00")
    const [timerSeconds, setTimerSeconds] = useState("00")
    const dispatch = useDispatch()

    const [timerEnd, setTimerEnd] = useState(false);
    
    let interval = useRef();

    const startTimer = () => {
        const countdownDate = new Date("Jun 31, 2024 00:00:00").getTime();
   
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
                dispatch(setToEnd(true))
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
    <div>
        <div className='flex items-center justify-center gap-4'>
                    <div className='text-center'>
                        <p className={styles.dayParagraph}>Days</p>
                        <h3 className={styles.dayDetailsParagraph}>{timerDays}</h3>
                    </div>
                    <div className={`${styles.flexCenter} flex-col gap-1`}>
                        <div className='w-[4px] h-[4px] bg-primary rounded-full' />
                        <div className='w-[4px] h-[4px] bg-primary rounded-full' />
                        
                    </div>
                    <div className='text-center'>
                        <p className={styles.dayParagraph}>Hours</p>
                        <h3 className={styles.dayDetailsParagraph}>{timerHours}</h3>
                    </div>
                    <div className={`${styles.flexCenter} flex-col gap-1`}>
                        <div className='w-[4px] h-[4px] bg-primary rounded-full' />
                        <div className='w-[4px] h-[4px] bg-primary rounded-full' />
                        
                    </div>
                    <div className='text-center'>
                        <p className={styles.dayParagraph}>Minutes</p>
                        <h3 className={styles.dayDetailsParagraph}>{timerMinutes}</h3>
                    </div>
                    <div className={`${styles.flexCenter} flex-col gap-1`}>
                        <div className='w-[4px] h-[4px] bg-primary rounded-full' />
                        <div className='w-[4px] h-[4px] bg-primary rounded-full' />
                        
                    </div>
                    <div className='text-center'>
                        <p className={styles.dayParagraph}>Seconds</p>
                        <h3 className={styles.dayDetailsParagraph}>{timerSeconds}</h3>
                    </div>
                </div>

                {timerEnd && <div className='w-full'><h3 className={styles.timerErrorText}>Flash Sales has expired!</h3></div>}
    </div>
  )
}

export default Countdown