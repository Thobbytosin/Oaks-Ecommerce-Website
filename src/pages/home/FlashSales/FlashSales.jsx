import React, { useEffect, useRef, useState } from 'react'
import styles from '../../../styles'
import SubHeading from '../../../components/SubHeading/SubHeading'
import SalesCarousel from '../SalesCarousel/SalesCarousel';
import Countdown from '../../../components/Countdown/Countdown';
import { useSelector } from 'react-redux';


const FlashSales = () => {

  const timerEnd = useSelector((state) => state.countdown.timerEnd)
    
  return (
    <div className={`${styles.section} ${styles.padding}`}>
        <SubHeading heading="Today's" />
        <div className={styles.flexBetween}>
            <div className={`flex flex-col md:flex-row w-full items-center md:gap-[8.2rem] gap-[1.4rem]`}>
                <h2 className={`${styles.heading} min-w-fit`}>Flash Sales</h2>
                <Countdown />
            </div> 
            
        </div>

        {/* CAROUSEL */}
        {!timerEnd &&
          <div className={`mt-10`}>
              <SalesCarousel/>
          </div>
        }

        
    </div>
  )
}

export default FlashSales